import { Input, Textarea } from "@heroui/input";
import {
  addToast,
  Button,
  Form,
  Link,
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
import { useMemo, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";

import { api } from "@/services/api.service";

type itemListLinkType = {
  key: string;
  title: string;
  link: string;
};

type ProjectDataType = {
  title: string;
  text: string;
  link: string;
};

export default function CreateProjectsPage() {
  const location = useLocation();
  const navigate = useNavigate();

  const [projectData, setProjectData] = useState<ProjectDataType>({
    text: "",
    title: "",
    link: "",
  });
  const [linkList, setLinkList] = useState<itemListLinkType[]>([
    // {
    //   key: "1",
    //   label: "github",
    //   link: "https://github.com/wectornanime/teste",
    // },
    // {
    //   key: "2",
    //   label: "site",
    //   link: "https://teste.com/",
    // },
  ]);

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

  const onReset = () => {
    const path = location.pathname;
    const pathParent = path.substring(0, path.lastIndexOf("/"));

    navigate(pathParent);
  };

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const path = location.pathname;
    const pathParent = path.substring(0, path.lastIndexOf("/"));

    const body = {
      imageUrl: null,
      title: projectData.title,
      text: projectData.text,
      links: linkList.map((link) => {
        return {
          title: link.title,
          link: link.link,
        };
      }),
    };

    const { status } = await api.post(`/projects`, body);

    if (status === 200) {
      addToast({
        color: "success",
        title: "Projeto criado com sucesso",
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
  );
}
