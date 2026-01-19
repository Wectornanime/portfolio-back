import { Input } from "@heroui/input";
import { Button, Form } from "@heroui/react";
import { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";

import { api } from "@/services/api.service";

type CertificateDataType = {
  title: string;
  imageUrl: string | null;
  link: string | null;
};

export default function CreateCertificatesPage() {
  const location = useLocation();
  const navigate = useNavigate();

  const [certificateData, setCertificateData] = useState<CertificateDataType>({
    link: "",
    imageUrl: "",
    title: "",
  });

  const onReset = () => {
    const path = location.pathname;
    const pathParent = path.substring(0, path.lastIndexOf("/"));

    navigate(pathParent);
  };

  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!certificateData) return;

    const path = location.pathname;
    const pathParent = path.substring(0, path.lastIndexOf("/"));

    const body = {
      imageUrl: null,
      title: certificateData.title,
      link: certificateData.link,
    };

    api.post(`/certificates`, body);

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
        isRequired
        label="Link do certificado"
        size="sm"
        type="url"
        value={certificateData.link || ""}
        onChange={(e) => {
          setCertificateData({ ...certificateData, link: e.target.value });
        }}
      />

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
