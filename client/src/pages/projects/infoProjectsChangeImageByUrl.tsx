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
import Image from "@/components/Image";

interface props {
  onClose: () => void;
}

export default function InfoProjectsChangeImageByUrl({ onClose }: props) {
  const { id } = useParams();
  const [imageUrl, setImageUrl] = useState<string>("");

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!imageUrl) return;

    onClose();

    const toastId = addToast({
      title: "Atualizando imagem do projeto",
      timeout: Infinity,
      shouldShowTimeoutProgress: true,
      endContent: <Spinner size="sm" />,
    });

    const body = { imageUrl: imageUrl };

    const { status } = await api.patch(`/projects/${id}/patch/imageUrl`, body);

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
      <Image className="max-w-[50%]" src={imageUrl} />
      <Input
        isRequired
        label="Link da imagem"
        size="sm"
        type="url"
        value={imageUrl}
        onChange={(e) => {
          setImageUrl(e.target.value);
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
