import {
  addToast,
  Avatar,
  Button,
  closeToast,
  Form,
  Input,
  Spinner,
} from "@heroui/react";
import { useState } from "react";

import { api } from "@/services/api.service";

interface props {
  onClose: () => void;
}

export default function ChangeUserImageByUpload({ onClose }: props) {
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
      title: "Atualizando perfil",
      timeout: Infinity,
      shouldShowTimeoutProgress: true,
      endContent: <Spinner size="sm" />,
    });

    const formData = new FormData();

    formData.append("file", imageFile);

    const { status } = await api.patch("/me/patch/imageUrl", formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });

    if (!toastId) return;
    closeToast(toastId);

    if (status === 200) {
      addToast({
        color: "success",
        title: "Perfil atualizado com sucesso",
      });
    } else {
      addToast({
        color: "danger",
        title: "Erro ao atualizar perfil",
      });
    }
  };

  return (
    <Form onReset={onClose} onSubmit={onSubmit}>
      <Avatar size="lg" src={previewUrl} />
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
