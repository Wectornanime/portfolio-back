import { Input } from "@heroui/input";
import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  useDisclosure,
} from "@heroui/modal";
import { Button, Form, Spinner } from "@heroui/react";
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

  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!certificateData) return;

    const body = {
      imageUrl: null,
      title: certificateData.title,
      link: certificateData.link,
    };

    api.put(`/certificates/${id}`, body);
  };

  const handleDelete = () => {
    const path = location.pathname;
    const pathParent = path.substring(0, path.lastIndexOf("/"));

    api.delete(`/certificates/${id}`);
    navigate(pathParent);
  };

  const fetchData = async () => {
    setCertificateData(null);

    const { status, data } = await api.get(`/certificates/${id}`);

    if (status === 200) {
      setCertificateData(data.data);
    } else {
      window.alert("Não foi possível buscar os dados.");
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
