import * as pdfjsLib from "pdfjs-dist";
import pdfWorker from "pdfjs-dist/build/pdf.worker?url";
import { Input } from "@heroui/input";
import {
  addToast,
  Button,
  Card,
  CardBody,
  CardHeader,
  closeToast,
  Form,
  Spinner,
} from "@heroui/react";
import { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";

import { api } from "@/services/api.service";
import Image from "@/components/image";

type CertificateDataType = {
  title: string;
  link: string | null;
  pdf: File | null;
  preview: string | null;
};

pdfjsLib.GlobalWorkerOptions.workerSrc = pdfWorker;

export default function CreateCertificatesPage() {
  const location = useLocation();
  const navigate = useNavigate();

  const [certificateData, setCertificateData] = useState<CertificateDataType>({
    link: "",
    title: "",
    pdf: null,
    preview: null,
  });

  const handlePdfChange = async (file: File) => {
    const arrayBuffer = await file.arrayBuffer();
    const pdf = await pdfjsLib.getDocument({ data: arrayBuffer }).promise;
    const page = await pdf.getPage(1);

    const viewport = page.getViewport({ scale: 1.5 });
    const canvas = document.createElement("canvas");
    const context = canvas.getContext("2d")!;

    canvas.width = viewport.width;
    canvas.height = viewport.height;

    await page.render({
      canvas,
      canvasContext: context,
      viewport,
    }).promise;

    setCertificateData({
      ...certificateData,
      pdf: file,
      preview: canvas.toDataURL(),
    });
  };

  const onReset = () => {
    const path = location.pathname;
    const pathParent = path.substring(0, path.lastIndexOf("/"));

    navigate(pathParent);
  };

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!certificateData) return;
    if (!certificateData.pdf) {
      addToast({
        color: "danger",
        title: "O PDF do certificado é obrigatório",
      });

      return;
    }

    const toastId = addToast({
      title: "Registrando certificado",
      timeout: Infinity,
      shouldShowTimeoutProgress: true,
      endContent: <Spinner size="sm" />,
    });

    const path = location.pathname;
    const pathParent = path.substring(0, path.lastIndexOf("/"));

    const formData = new FormData();

    formData.append("title", certificateData.title);
    formData.append("link", certificateData.link || "");
    formData.append("file", certificateData.pdf);

    const { status } = await api.post(`/certificates`, formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });

    if (!toastId) return;
    closeToast(toastId);

    if (status === 201) {
      addToast({
        color: "success",
        title: "Certificado atualizado com sucesso",
      });
    } else {
      addToast({
        color: "warning",
        title: "Não foi possível registrar o certificado",
      });
    }

    navigate(pathParent);
  };

  return (
    <Form className="full" onReset={onReset} onSubmit={(e) => onSubmit(e)}>
      <Input
        isRequired
        label="Título"
        size="sm"
        type="text"
        value={certificateData.title}
        onChange={(e) => {
          setCertificateData({ ...certificateData, title: e.target.value });
        }}
      />

      <Input
        label="Link do certificado"
        size="sm"
        type="url"
        value={certificateData.link || ""}
        onChange={(e) => {
          setCertificateData({ ...certificateData, link: e.target.value });
        }}
      />

      <Input
        isRequired
        accept="application/pdf"
        label="Arquivo pdf do certificado"
        size="sm"
        type="file"
        onChange={(e) => {
          const file = e.target.files?.[0];

          if (file) handlePdfChange(file);
        }}
      />

      {certificateData.preview && (
        <Card>
          <CardHeader>
            <h2 className="font-semibold text-lg">Pré-visualização</h2>
          </CardHeader>
          <CardBody>
            <Image
              className="w-[20%] border rounded"
              src={certificateData.preview}
            />
          </CardBody>
        </Card>
      )}

      <div className="flex gap-2 mt-4">
        <Button color="primary" type="submit">
          Enviar
        </Button>
        <Button color="danger" type="reset" variant="light">
          Cancelar
        </Button>
      </div>
    </Form>
  );
}
