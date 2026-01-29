import { Button, Form, Input } from "@heroui/react";
import { useState } from "react";

import Image from "@/components/image";

interface props {
  onClose: () => void;
  setProjectImagePreview: React.Dispatch<React.SetStateAction<string | null>>;
  setProjectImageFile: React.Dispatch<React.SetStateAction<File | null>>;
  setProjectImageUrl: React.Dispatch<React.SetStateAction<string | null>>;
}

export default function CreateProjectsSetLinkImageModal({
  onClose,
  setProjectImagePreview,
  setProjectImageFile,
  setProjectImageUrl,
}: props) {
  const [imageUrl, setImageUrl] = useState<string | null>(null);

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!imageUrl) return;

    onClose();

    setProjectImageFile(null);
    setProjectImageUrl(imageUrl);
    setProjectImagePreview(imageUrl);
  };

  return (
    <Form onReset={onClose} onSubmit={onSubmit}>
      <Image className="max-w-[50%]" src={imageUrl || ""} />
      <Input
        isRequired
        label="Link da imagem"
        size="sm"
        type="url"
        value={imageUrl || ""}
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
