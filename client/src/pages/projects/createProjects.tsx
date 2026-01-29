import { Card, CardBody } from "@heroui/card";
import {
  Dropdown,
  DropdownItem,
  DropdownMenu,
  DropdownTrigger,
} from "@heroui/dropdown";
import { Input, Textarea } from "@heroui/input";
import { Modal, ModalBody, ModalContent, ModalHeader } from "@heroui/modal";
import {
  Table,
  TableBody,
  TableCell,
  TableColumn,
  TableHeader,
  TableRow,
} from "@heroui/table";
import {
  addToast,
  Button,
  closeToast,
  Form,
  Link,
  Spinner,
  Tooltip,
} from "@heroui/react";
import {
  AddRounded as AddRoundedIcon,
  BackupRounded as BackupRoundedIcon,
  CloseRounded as CloseRoundedIcon,
  DeleteRounded as DeleteRoundedIcon,
  EditRounded as EditRoundedIcon,
  LinkRounded as LinkRoundedIcon,
  SaveRounded as SaveRoundedIcon,
} from "@mui/icons-material";
import { useMemo, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";

import CreateProjectsUploadImageModal from "./modals/createProjects/createProjectsUploadImageModal";
import CreateProjectsSetLinkImageModal from "./modals/createProjects/createProjectsSetLinkImageModal";

import { api } from "@/services/api.service";
import Image from "@/components/image";

type itemListLinkType = {
  key: string;
  title: string;
  link: string;
};

type ProjectDataType = {
  title: string;
  text: string;
};

type ModalType = "selectImageUrl" | "uploadImage" | null;

export default function CreateProjectsPage() {
  const location = useLocation();
  const navigate = useNavigate();
  const [activeModal, setActiveModal] = useState<ModalType>(null);

  const [projectData, setProjectData] = useState<ProjectDataType>({
    text: "",
    title: "",
  });
  const [linkList, setLinkList] = useState<itemListLinkType[]>([]);
  const [projectImageFile, setProjectImageFile] = useState<File | null>(null);
  const [projectImageUrl, setProjectImageUrl] = useState<string | null>(null);
  const [projectImagePreview, setProjectImagePreview] = useState<string | null>(
    null,
  );

  const [editingRowId, setEditingRowId] = useState<string | null>(null);
  const [draftRow, setDraftRow] = useState<itemListLinkType>({
    key: "",
    title: "",
    link: "",
  });

  const isEditing = (id: string) => id === editingRowId;

  const startEdit = (row: itemListLinkType) => {
    setEditingRowId(row.key);
    setDraftRow({ ...row });
  };

  const cancelEdit = () => {
    setEditingRowId(null);
    setDraftRow({
      key: "",
      title: "",
      link: "",
    });
  };

  const saveEdit = () => {
    setLinkList((prev) =>
      prev.map((item) => (item.key === editingRowId ? draftRow : item)),
    );
    cancelEdit();
  };

  const deleteRow = (key: string) => {
    setLinkList((prev) => prev.filter((row) => row.key !== key));
  };

  const addRow = () => {
    if (linkList.length >= 2) return;

    const newRow = {
      key: Date.now().toString(),
      title: "",
      link: "",
    };

    setLinkList((prev) => [...prev, newRow]);
    startEdit(newRow);
  };

  const removeProjectImage = () => {
    setProjectImageFile(null);
    setProjectImageUrl(null);
    setProjectImagePreview(null);
  };

  const onReset = () => {
    const path = location.pathname;
    const pathParent = path.substring(0, path.lastIndexOf("/"));

    navigate(pathParent);
  };

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const toastId = addToast({
      title: "Registrando certificado",
      timeout: Infinity,
      shouldShowTimeoutProgress: true,
      endContent: <Spinner size="sm" />,
    });

    const path = location.pathname;
    const pathParent = path.substring(0, path.lastIndexOf("/"));

    const formData = new FormData();

    formData.append("title", projectData.title);
    formData.append("text", projectData.text);
    formData.append(
      "links",
      JSON.stringify(
        linkList.map((link) => {
          return {
            title: link.title,
            link: link.link,
          };
        }),
      ),
    );

    if (projectImageUrl) {
      formData.append("imageUrl", projectImageUrl);
    }

    if (projectImageFile) {
      formData.append("file", projectImageFile);
    }

    const { status } = await api.post(`/projects`, formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });

    if (!toastId) return;
    closeToast(toastId);

    if (status === 201) {
      addToast({
        color: "success",
        title: "Projeto criado com sucesso",
      });
    } else {
      addToast({
        color: "warning",
        title: "Não foi possível criar o projeto",
      });
    }

    navigate(pathParent);
  };

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

  return (
    <>
      <Form className="full" onReset={onReset} onSubmit={(e) => onSubmit(e)}>
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
        <Card className="w-full">
          <CardBody>
            <div className="flex flex-row gap-1">
              <h2 className="font-semibold text-xl mb-2">Imagem do projeto</h2>
              <Dropdown>
                <DropdownTrigger>
                  <Button color="primary" size="sm">
                    Trocar imagem
                  </Button>
                </DropdownTrigger>
                <DropdownMenu aria-label="Static Actions">
                  <DropdownItem
                    key="upload"
                    startContent={<BackupRoundedIcon fontSize="small" />}
                    onClickCapture={() => setActiveModal("uploadImage")}
                  >
                    Enviar novo arquivo
                  </DropdownItem>
                  <DropdownItem
                    key="url"
                    startContent={<LinkRoundedIcon fontSize="small" />}
                    onClickCapture={() => setActiveModal("selectImageUrl")}
                  >
                    Usar link
                  </DropdownItem>
                  <DropdownItem
                    key="remove"
                    startContent={<CloseRoundedIcon fontSize="small" />}
                    onClickCapture={removeProjectImage}
                  >
                    Sem imagem
                  </DropdownItem>
                </DropdownMenu>
              </Dropdown>
            </div>
            <Image className="w-[120px]" src={projectImagePreview || ""} />
          </CardBody>
        </Card>
        <Table hideHeader topContent={tableTopContent}>
          <TableHeader>
            <TableColumn>Label</TableColumn>
            <TableColumn>Link</TableColumn>
            <TableColumn className="text-center">Ações</TableColumn>
          </TableHeader>
          <TableBody>
            {linkList.map((row) => (
              <TableRow key={row.key}>
                <TableCell>
                  {isEditing(row.key) ? (
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
                  {isEditing(row.key) ? (
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
                    {isEditing(row.key) ? (
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
                            onClickCapture={() => deleteRow(row.key)}
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
            Enviar
          </Button>
          <Button color="danger" type="reset" variant="light">
            Cancelar
          </Button>
        </div>
      </Form>

      <Modal
        isOpen={activeModal === "uploadImage"}
        onClose={() => setActiveModal(null)}
      >
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className="flex flex-col gap-1">
                Trocar imagem do projeto por upload
              </ModalHeader>
              <ModalBody>
                <CreateProjectsUploadImageModal
                  setProjectImageFile={setProjectImageFile}
                  setProjectImagePreview={setProjectImagePreview}
                  setProjectImageUrl={setProjectImageUrl}
                  onClose={onClose}
                />
              </ModalBody>
            </>
          )}
        </ModalContent>
      </Modal>

      <Modal
        isOpen={activeModal === "selectImageUrl"}
        onClose={() => setActiveModal(null)}
      >
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className="flex flex-col gap-1">
                Trocar imagem do projeto por link
              </ModalHeader>
              <ModalBody>
                <CreateProjectsSetLinkImageModal
                  setProjectImageFile={setProjectImageFile}
                  setProjectImagePreview={setProjectImagePreview}
                  setProjectImageUrl={setProjectImageUrl}
                  onClose={onClose}
                />
              </ModalBody>
            </>
          )}
        </ModalContent>
      </Modal>
    </>
  );
}
