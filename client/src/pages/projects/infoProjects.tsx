import { Input, Textarea } from "@heroui/input";
import { Modal, ModalContent, ModalHeader, ModalBody } from "@heroui/modal";
import {
  addToast,
  Button,
  Card,
  closeToast,
  Form,
  Link,
  Spinner,
  Table,
  TableBody,
  TableCell,
  TableColumn,
  TableHeader,
  TableRow,
  Tooltip,
} from "@heroui/react";
import {
  AddRounded as AddRoundedIcon,
  CloseRounded as CloseRoundedIcon,
  ContentCopyRounded as ContentCopyRoundedIcon,
  DeleteRounded as DeleteRoundedIcon,
  EditRounded as EditRoundedIcon,
  SaveRounded as SaveRoundedIcon,
} from "@mui/icons-material";
import { useEffect, useMemo, useState } from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";

import InfoProjectsChangeImageByUrl from "./infoProjectsChangeImageByUrl";
import InfoProjectsChangeImageByUpload from "./infoProjectsChangeImageByUpload";

import { api } from "@/services/api.service";
import Image from "@/components/image";

type itemListLinkType = {
  id: string;
  title: string;
  link: string;
};

type ProjectDataType = {
  title: string;
  text: string;
  link: string;
  imageUrl?: string;
};

type ModalType = "changeImageUrl" | "uploadImage" | "removeProject" | null;

export default function InfoProjectsPage() {
  const { id } = useParams();

  const location = useLocation();
  const navigate = useNavigate();
  const [activeModal, setActiveModal] = useState<ModalType>(null);

  const [projectData, setProjectData] = useState<ProjectDataType | null>(null);
  const [linkList, setLinkList] = useState<itemListLinkType[]>([]);

  const [editingRowId, setEditingRowId] = useState<string | null>(null);
  const [draftRow, setDraftRow] = useState<itemListLinkType>({
    id: "",
    title: "",
    link: "",
  });

  const isEditing = (key: string) => key === editingRowId;

  const startEdit = (row: itemListLinkType) => {
    setEditingRowId(row.id);
    setDraftRow({ ...row });
  };

  const cancelEdit = () => {
    setEditingRowId(null);
    setDraftRow({
      id: "",
      title: "",
      link: "",
    });
  };

  const saveEdit = () => {
    setLinkList((prev) =>
      prev.map((item) => (item.id === editingRowId ? draftRow : item)),
    );
    cancelEdit();
  };

  const deleteRow = (key: string) => {
    setLinkList((prev) => prev.filter((row) => row.id !== key));
  };

  const addRow = () => {
    if (linkList.length >= 2) return;

    const newRow = {
      id: `new-${Date.now().toString()}`,
      title: "",
      link: "",
    };

    setLinkList((prev) => [...prev, newRow]);
    startEdit(newRow);
  };

  const copyImageLink = async () => {
    if (!projectData || !projectData.imageUrl) return;

    try {
      await navigator.clipboard.writeText(projectData.imageUrl);
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

  const removeImage = async () => {
    const toastId = addToast({
      title: "Removendo imagem do projeto",
      timeout: Infinity,
      shouldShowTimeoutProgress: true,
      endContent: <Spinner size="sm" />,
    });

    const { status } = await api.patch(`/projects/${id}/patch/removeImageUrl`);

    if (!toastId) return;
    closeToast(toastId);

    if (status === 200) {
      addToast({
        color: "success",
        title: "A imagem do projeto foi removida com sucesso",
      });
    } else {
      addToast({
        color: "danger",
        title: "Erro ao remover a imagem do projeto",
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

    if (!projectData) return;

    const toastId = addToast({
      title: "Atualizando projeto",
      timeout: Infinity,
      shouldShowTimeoutProgress: true,
      endContent: <Spinner size="sm" />,
    });

    const body = {
      title: projectData.title,
      text: projectData.text,
      links: linkList.map((link) => {
        if (typeof link.id === "string" && link.id.includes("new")) {
          return {
            title: link.title,
            link: link.link,
          };
        }

        return link;
      }),
    };

    const { status } = await api.put(`/projects/${id}`, body);

    if (!toastId) return;
    closeToast(toastId);

    if (status === 200) {
      addToast({
        color: "success",
        title: "Projeto atualizado com sucesso",
      });
    }
  };

  const handleDelete = async () => {
    const path = location.pathname;
    const pathParent = path.substring(0, path.lastIndexOf("/"));

    const { status } = await api.delete(`/projects/${id}`);

    if (status === 204) {
      addToast({
        color: "success",
        title: "Projeto deletado com sucesso",
      });
    }

    navigate(pathParent);
  };

  const fetchData = async () => {
    setProjectData(null);
    setLinkList([]);

    const { status, data } = await api.get(`/projects/${id}`);

    if (status === 200) {
      const { links, ...projectData } = data.data;

      setProjectData(projectData);
      setLinkList(links);
    }
  };

  useEffect(() => {
    fetchData();
  }, [id]);

  const tableTopContent = useMemo(() => {
    return (
      <div className="flex justify-between items-end pl-4 pr-8">
        <h2 className="font-semibold text-2xl">Links</h2>
        <Button
          color="primary"
          isDisabled={linkList.length >= 2}
          size="sm"
          startContent={<AddRoundedIcon fontSize="small" />}
          onPress={addRow}
        >
          <p className="text-small">Adicionar link</p>
        </Button>
      </div>
    );
  }, [linkList]);

  return projectData ? (
    <>
      <Form className="full" onReset={onReset} onSubmit={(e) => onSubmit(e)}>
        <Card className="w-full flex-row gap-2 shrink-0 p-4 items-center">
          <Image className="w-[20%]" src={projectData.imageUrl} />
          <div className="flex flex-col gap-2">
            <p className="font-light">
              <span className="text-lg font-semibold">Link da imagem: </span>
              {projectData.imageUrl}
              <span>
                <Tooltip content="Copiar link">
                  <span
                    className="text-lg text-default-400 cursor-pointer active:opacity-50"
                    onClickCapture={copyImageLink}
                  >
                    <ContentCopyRoundedIcon fontSize="small" />
                  </span>
                </Tooltip>
              </span>
            </p>
            <div className="flex gap-2">
              <Button onClickCapture={() => setActiveModal("changeImageUrl")}>
                Trocar link da imagem
              </Button>
              <Button onClickCapture={() => setActiveModal("uploadImage")}>
                Enviar nova imagem
              </Button>
              <Button onClickCapture={removeImage}>Remover imagem</Button>
            </div>
          </div>
        </Card>
        <Input
          isRequired
          label="Título"
          size="sm"
          type="text"
          value={projectData.title}
          onChange={(e) => {
            setProjectData({ ...projectData, title: e.target.value });
          }}
        />
        <Textarea
          isRequired
          label="Descrição"
          size="sm"
          type="text"
          value={projectData.text}
          onChange={(e) => {
            setProjectData({ ...projectData, text: e.target.value });
          }}
        />

        <Table hideHeader topContent={tableTopContent}>
          <TableHeader>
            <TableColumn>Label</TableColumn>
            <TableColumn>Link</TableColumn>
            <TableColumn className="text-center">Ações</TableColumn>
          </TableHeader>

          <TableBody>
            {linkList.map((row) => (
              <TableRow key={row.id}>
                <TableCell>
                  {isEditing(row.id) ? (
                    <Input
                      placeholder="title"
                      size="sm"
                      type="text"
                      value={draftRow.title}
                      variant="underlined"
                      onChange={(e) =>
                        setDraftRow({ ...draftRow, title: e.target.value })
                      }
                    />
                  ) : (
                    <p className="text-medium">{row.title}</p>
                  )}
                </TableCell>

                <TableCell>
                  {isEditing(row.id) ? (
                    <Input
                      placeholder="link"
                      size="sm"
                      startContent={
                        <div className="pointer-events-none flex items-center">
                          <span className="text-default-400 text-small">
                            https://
                          </span>
                        </div>
                      }
                      type="url"
                      value={draftRow.link}
                      variant="underlined"
                      onChange={(e) =>
                        setDraftRow({ ...draftRow, link: e.target.value })
                      }
                    />
                  ) : (
                    <Link isExternal className="text-medium" href={row.link}>
                      {row.link}
                    </Link>
                  )}
                </TableCell>

                <TableCell>
                  <div className="flex gap-2 justify-center">
                    {isEditing(row.id) ? (
                      <>
                        <Tooltip content="Salvar mudanças">
                          <span
                            className="text-lg text-success-400 cursor-pointer active:opacity-50"
                            onClickCapture={saveEdit}
                          >
                            <SaveRoundedIcon />
                          </span>
                        </Tooltip>
                        <Tooltip content="Cancelar mudanças">
                          <span
                            className="text-lg text-danger-400 cursor-pointer active:opacity-50"
                            onClickCapture={cancelEdit}
                          >
                            <CloseRoundedIcon />
                          </span>
                        </Tooltip>
                      </>
                    ) : (
                      <>
                        <Tooltip content="Editar link">
                          <span
                            className="text-lg text-default-400 cursor-pointer active:opacity-50"
                            onClickCapture={() => startEdit(row)}
                          >
                            <EditRoundedIcon />
                          </span>
                        </Tooltip>
                        <Tooltip content="Excluir link">
                          <span
                            className="text-lg text-danger-400 cursor-pointer active:opacity-50"
                            onClickCapture={() => deleteRow(row.id)}
                          >
                            <DeleteRoundedIcon />
                          </span>
                        </Tooltip>
                      </>
                    )}
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>

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
            onPress={() => setActiveModal("removeProject")}
          >
            Excluir projeto
          </Button>
        </div>
      </Form>

      <Modal
        isOpen={activeModal === "removeProject"}
        onClose={() => setActiveModal(null)}
      >
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className="flex flex-col gap-1">
                Confirmar a exclusão desse projeto?
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
        isOpen={activeModal === "changeImageUrl"}
        onClose={() => setActiveModal(null)}
      >
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className="flex flex-col gap-1">
                Trocar imagem do projeto por link
              </ModalHeader>
              <ModalBody>
                <InfoProjectsChangeImageByUrl onClose={onClose} />
              </ModalBody>
            </>
          )}
        </ModalContent>
      </Modal>

      <Modal
        isOpen={activeModal === "uploadImage"}
        onClose={() => setActiveModal(null)}
      >
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className="flex flex-col gap-1">
                Enviar nova imagem do projeto
              </ModalHeader>
              <ModalBody>
                <InfoProjectsChangeImageByUpload onClose={onClose} />
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
