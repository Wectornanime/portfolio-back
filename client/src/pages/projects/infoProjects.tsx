import { Input, Textarea } from "@heroui/input";
import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  useDisclosure,
} from "@heroui/modal";
import {
  addToast,
  Button,
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
  DeleteRounded as DeleteRoundedIcon,
  EditRounded as EditRoundedIcon,
  SaveRounded as SaveRoundedIcon,
} from "@mui/icons-material";
import { useEffect, useMemo, useState } from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";

import { api } from "@/services/api.service";

type itemListLinkType = {
  id: string;
  title: string;
  link: string;
};

type ProjectDataType = {
  title: string;
  text: string;
  link: string;
};

export default function InfoProjectsPage() {
  const { id } = useParams();

  const location = useLocation();
  const navigate = useNavigate();
  const { isOpen, onOpen, onOpenChange } = useDisclosure();

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
      imageUrl: null,
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

    if (status === 200) {
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

          <Button color="danger" variant="light" onPress={onOpen}>
            Excluir projeto
          </Button>
        </div>
      </Form>

      <Modal isOpen={isOpen} onOpenChange={onOpenChange}>
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
    </>
  ) : (
    <div className="flex full justify-center">
      <Spinner size="lg" />
    </div>
  );
}
