import { Input } from "@heroui/input";
import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  useDisclosure,
} from "@heroui/modal";
import { addToast, Button, closeToast, Form, Spinner } from "@heroui/react";
import { useEffect, useState } from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";

import { api } from "@/services/api.service";

type CertificateDataType = {
  title: string;
  imageUrl: string | null;
  link: string | null;
};

export default function InfoCertificatesPage() {
  const { id } = useParams();

  const location = useLocation();
  const navigate = useNavigate();
  const { isOpen, onOpen, onOpenChange } = useDisclosure();

  const [certificateData, setCertificateData] =
    useState<CertificateDataType | null>(null);

  const onReset = () => {
    const path = location.pathname;
    const pathParent = path.substring(0, path.lastIndexOf("/"));

    navigate(pathParent);
  };

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!certificateData) return;

    const toastId = addToast({
      title: "Atualizando certificado",
      timeout: Infinity,
      shouldShowTimeoutProgress: true,
      endContent: <Spinner size="sm" />,
    });

    const body = {
      imageUrl: null,
      title: certificateData.title,
      link: certificateData.link,
    };

    const { status } = await api.put(`/certificates/${id}`, body);

    if (!toastId) return;
    closeToast(toastId);

    if (status === 200) {
      addToast({
        color: "success",
        title: "Certificado atualizado com sucesso",
      });
    }
  };

  const handleDelete = async () => {
    const path = location.pathname;
    const pathParent = path.substring(0, path.lastIndexOf("/"));

    const { status } = await api.delete(`/certificates/${id}`);

    if (status === 204) {
      addToast({
        color: "success",
        title: "Certificado removido com sucesso",
      });
    }
    navigate(pathParent);
  };

  const fetchData = async () => {
    setCertificateData(null);

    const { status, data } = await api.get(`/certificates/${id}`);

    if (status === 200) {
      setCertificateData(data.data);
    } else {
      addToast({
        color: "warning",
        title: "Não foi possível localizar o certificado",
      });
    }
  };

  useEffect(() => {
    fetchData();
  }, [id]);

  return certificateData ? (
    <>
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

        <div className="flex gap-2 mt-4">
          <Button color="primary" type="submit">
            Atualizar
          </Button>
          <Button type="reset" variant="flat">
            Descartar alterações
          </Button>

          <Button color="danger" variant="light" onPress={onOpen}>
            Excluir certificado
          </Button>
        </div>
      </Form>

      <Modal isOpen={isOpen} onOpenChange={onOpenChange}>
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className="flex flex-col gap-1">
                Confirmar a exclusão desse certificado?
              </ModalHeader>
              <ModalBody>
                <p>
                  A exclusão será permanente, sem possibilidade de reverter.
                </p>

                <div className="flex gap-2 m-auto">
                  <Button
                    color="danger"
                    variant="light"
                    onClickCapture={() => {
                      onClose();
                      handleDelete();
                    }}
                  >
                    Confirmar a exclusão
                  </Button>

                  <Button variant="light" onClickCapture={onClose}>
                    Cancelar
                  </Button>
                </div>
              </ModalBody>
            </>
          )}
        </ModalContent>
      </Modal>
    </>
  ) : (
    <div className="flex full justify-center">
      <Spinner size="lg" />
    </div>
  );
}
