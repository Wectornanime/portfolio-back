import {
  addToast,
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

interface props extends Omit<ModalProps, "children"> {
  onChangeCurriculum: () => void;
}

export default function ChangeCurriculumModal({
  isOpen,
  onOpenChange,
  onChangeCurriculum,
}: props) {
  const [curriculumFile, setCurriculumFile] = useState<File | null>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];

    if (file) {
      setCurriculumFile(file);
    }
  };

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!curriculumFile) return;

    onOpenChange?.(false);

    const toastId = addToast({
      title: "Atualizando currículo",
      timeout: Infinity,
      shouldShowTimeoutProgress: true,
      endContent: <Spinner size="sm" />,
    });

    const formData = new FormData();

    formData.append("file", curriculumFile);

    const { status } = await api.patch("/me/patch/curriculum", formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });

    if (!toastId) return;
    closeToast(toastId);

    if (status === 200) {
      addToast({
        color: "success",
        title: "Currículo atualizado com sucesso",
      });

      onChangeCurriculum();
    } else {
      addToast({
        color: "danger",
        title: "Erro ao atualizar o currículo",
      });
    }
  };

  return (
    <Modal isOpen={isOpen} onOpenChange={onOpenChange}>
      <ModalContent>
        {(onClose) => (
          <>
            <ModalHeader>
              <p>Atualizar Currículo</p>
            </ModalHeader>
            <ModalBody>
              <Form onReset={onClose} onSubmit={onSubmit}>
                <Input
                  isRequired
                  accept=".pdf"
                  label="Selecionar arquivo"
                  size="sm"
                  type="file"
                  onChange={handleFileChange}
                />

                <div className="flex justify-end gap-2">
                  <Button color="primary" type="submit">
                    Atualizar
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
