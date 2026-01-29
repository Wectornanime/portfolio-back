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

interface props {
  onClose: () => void;
}

export default function InfoProjectsChangeImageByUpload({ onClose }: props) {
  const { id } = useParams();
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string>("");

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];

    if (file) {
      setImageFile(file);

      const url = URL.createObjectURL(file);

      setPreviewUrl(url);
    }
  };

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!imageFile) return;

    onClose();

    const toastId = addToast({
      title: "Atualizando imagem do projeto",
      timeout: Infinity,
      shouldShowTimeoutProgress: true,
      endContent: <Spinner size="sm" />,
    });

    const formData = new FormData();

    formData.append("file", imageFile);

    const { status } = await api.patch(
      `/projects/${id}/patch/imageUrl`,
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
        title: "Imagem do projeto atualizada com sucesso",
      });
    } else {
      addToast({
        color: "danger",
        title: "Erro ao atualizar a imagem do projeto",
      });
    }
  };

  return (
    <Form onReset={onClose} onSubmit={onSubmit}>
      <Image className="max-w-[50%]" src={previewUrl} />
      <Input
        isRequired
        accept="image/*"
        label="Selecionar imagem"
        size="sm"
        type="file"
        onChange={handleFileChange}
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
