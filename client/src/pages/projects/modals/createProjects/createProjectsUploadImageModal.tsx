import { Button, Form, Input } from "@heroui/react";
import { useState } from "react";

import Image from "@/components/image";

interface props {
  onClose: () => void;
  setProjectImagePreview: React.Dispatch<React.SetStateAction<string | null>>;
  setProjectImageFile: React.Dispatch<React.SetStateAction<File | null>>;
  setProjectImageUrl: React.Dispatch<React.SetStateAction<string | null>>;
}

export default function CreateProjectsUploadImageModal({
  onClose,
  setProjectImagePreview,
  setProjectImageFile,
  setProjectImageUrl,
}: props) {
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);

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

    setProjectImageFile(imageFile);
    setProjectImageUrl(null);
    setProjectImagePreview(previewUrl || "");
  };

  return (
    <Form onReset={onClose} onSubmit={onSubmit}>
      <Image className="max-w-[50%]" src={previewUrl || ""} />
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
