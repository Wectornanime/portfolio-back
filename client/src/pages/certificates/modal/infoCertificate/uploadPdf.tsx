import {
  addToast,
  Button,
  closeToast,
  Form,
  Input,
  Spinner,
} from "@heroui/react";
import { useState } from "react";
import { useParams } from "react-router-dom";

import { api } from "@/services/api.service";
import Image from "@/components/image";
import { generatePdfImagePreview } from "@/utils/generatePdfImagePreview";

interface props {
  onClose: () => void;
}

export default function InfoCertificatesUploadPdfModal({ onClose }: props) {
  const { id } = useParams();
  const [documentFile, setDocumentFile] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string>("");

  const handlePdfChange = async (file: File) => {
    const arrayBuffer = await file.arrayBuffer();

    const generatedImagePreview = await generatePdfImagePreview(arrayBuffer);

    setPreviewUrl(generatedImagePreview || "");
    setDocumentFile(file);
  };

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!documentFile) return;

    onClose();

    const toastId = addToast({
      title: "Atualizando imagem do projeto",
      timeout: Infinity,
      shouldShowTimeoutProgress: true,
      endContent: <Spinner size="sm" />,
    });

    const formData = new FormData();

    formData.append("file", documentFile);

    const { status } = await api.patch(
      `/certificates/${id}/patch/documentPdf`,
      formData,
      {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      },
    );

    if (!toastId) return;
    closeToast(toastId);

    if (status === 200) {
      addToast({
        color: "success",
        title: "Certificado atualizada com sucesso",
      });
    } else {
      addToast({
        color: "danger",
        title: "Erro ao atualizar o certificado",
      });
    }
  };

  return (
    <Form onReset={onClose} onSubmit={onSubmit}>
      <Image className="max-w-[50%]" src={previewUrl} />
      <Input
        isRequired
        accept="application/pdf"
        label="Selecionar pdf"
        size="sm"
        type="file"
        onChange={(e) => {
          const file = e.target.files?.[0];

          if (file) handlePdfChange(file);
        }}
      />
      <div className="flex gap-2">
        <Button color="primary" type="submit">
          Trocar
        </Button>
        <Button color="danger" type="reset" variant="bordered">
          Cancelar
        </Button>
      </div>
    </Form>
  );
}
