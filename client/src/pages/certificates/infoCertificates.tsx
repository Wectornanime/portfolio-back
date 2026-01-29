import { Input } from "@heroui/input";
import { Modal, ModalContent, ModalHeader, ModalBody } from "@heroui/modal";
import {
  addToast,
  Button,
  Card,
  CardBody,
  closeToast,
  Form,
  Link,
  Spinner,
  Tooltip,
} from "@heroui/react";
import {
  ContentCopyRounded as ContentCopyRoundedIcon,
  OpenInNewRounded as OpenInNewRoundedIcon,
} from "@mui/icons-material";
import { useEffect, useState } from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";

import InfoCertificatesUploadPdfModal from "./modal/infoCertificate/uploadPdf";

import { api } from "@/services/api.service";
import Image from "@/components/image";
import { generatePdfImagePreview } from "@/utils/generatePdfImagePreview";

type CertificateDataType = {
  title: string;
  imageUrl: string | null;
  link: string | null;
  pdfFileUrl: string;
};

type ModalType = "uploadDocument" | "removeCertificate" | null;

export default function InfoCertificatesPage() {
  const { id } = useParams();

  const location = useLocation();
  const navigate = useNavigate();
  const [activeModal, setActiveModal] = useState<ModalType>(null);

  const [certificateData, setCertificateData] =
    useState<CertificateDataType | null>(null);
  const [certificateImagePreview, setCertificateImagePreview] = useState<
    string | undefined
  >(undefined);

  const copyDocumentLink = async () => {
    if (!certificateData || !certificateData.pdfFileUrl) return;

    try {
      await navigator.clipboard.writeText(certificateData.pdfFileUrl);
      addToast({
        color: "success",
        title: "Link copiado!",
      });
    } catch {
      addToast({
        color: "warning",
        title: "Não foi possível copiar o link!",
      });
    }
  };

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

  useEffect(() => {
    const generateImage = async () => {
      if (!certificateData) return;

      const generatedImagePreview = await generatePdfImagePreview(
        certificateData.pdfFileUrl,
      );

      setCertificateImagePreview(generatedImagePreview);
    };

    generateImage();
  }, [certificateData]);

  return certificateData ? (
    <>
      <Form className="full" onReset={onReset} onSubmit={(e) => onSubmit(e)}>
        {certificateImagePreview && (
          <Card>
            <CardBody className="flex flex-row gap-2">
              <Image
                className="w-[20%] border rounded"
                src={certificateImagePreview}
              />

              <div className="flex flex-col gap-2">
                <p className="font-light">
                  <span className="text-lg font-semibold">
                    Link do documento:{" "}
                  </span>
                  {certificateData.pdfFileUrl}
                  <span>
                    <Tooltip content="Copiar link">
                      <span
                        className="text-lg text-default-400 cursor-pointer active:opacity-50"
                        onClickCapture={copyDocumentLink}
                      >
                        {" "}
                        <ContentCopyRoundedIcon fontSize="small" />
                      </span>
                    </Tooltip>
                  </span>
                </p>
                <Button
                  className="w-fit"
                  onClickCapture={() => setActiveModal("uploadDocument")}
                >
                  Trocar pdf
                </Button>
              </div>
            </CardBody>

            {/* <CardHeader>
              <h2 className="font-semibold text-lg">Pré-visualização</h2>
            </CardHeader>
            <CardBody>
              <Image
                className="w-[20%] border rounded"
                src={certificateImagePreview}
              />
              <p>asd</p>
            </CardBody> */}
          </Card>
        )}
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
          endContent={
            <Link
              isExternal
              className="text-small"
              href={certificateData!.link || ""}
              isDisabled={!certificateData.link}
            >
              <OpenInNewRoundedIcon />
            </Link>
          }
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

          <Button
            color="danger"
            variant="light"
            onPress={() => setActiveModal("removeCertificate")}
          >
            Excluir certificado
          </Button>
        </div>
      </Form>

      <Modal
        isOpen={activeModal === "removeCertificate"}
        onClose={() => setActiveModal(null)}
      >
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

      <Modal
        isOpen={activeModal === "uploadDocument"}
        onClose={() => setActiveModal(null)}
      >
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className="flex flex-col gap-1">
                Trocar arquivo pdf do certificado
              </ModalHeader>
              <ModalBody>
                <InfoCertificatesUploadPdfModal onClose={onClose} />
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
