import {
  addToast,
  Avatar,
  Button,
  closeToast,
  Form,
  Input,
  Spinner,
} from "@heroui/react";
import {
  Modal,
  ModalBody,
  ModalContent,
  ModalHeader,
  ModalProps,
} from "@heroui/modal";
import { useState } from "react";

import { api } from "@/services/api.service";

export default function ChangeUserImageByUrlModal({
  isOpen,
  onOpenChange,
}: Omit<ModalProps, "children">) {
  const [imageUrl, setImageUrl] = useState<string>("");

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!imageUrl) return;

    onOpenChange?.(false);

    const toastId = addToast({
      title: "Atualizando perfil",
      timeout: Infinity,
      shouldShowTimeoutProgress: true,
      endContent: <Spinner size="sm" />,
    });

    const body = { imageUrl: imageUrl };

    const { status } = await api.patch("/me/patch/imageUrl", body);

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
    <Modal isOpen={isOpen} onOpenChange={onOpenChange}>
      <ModalContent>
        {(onClose) => (
          <>
            <ModalHeader>
              <p>Trocar imagem de usuário</p>
            </ModalHeader>
            <ModalBody>
              <Form onReset={onClose} onSubmit={onSubmit}>
                <Avatar size="lg" src={imageUrl} />
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
            </ModalBody>
          </>
        )}
      </ModalContent>
    </Modal>
  );
}
