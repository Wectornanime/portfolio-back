import { Input, Textarea } from "@heroui/input";
import {
  Button,
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
      id: Date.now().toString(),
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

  const fetchData = async () => {
    setProjectData(null);
    setLinkList([]);

    const { status, data } = await api.get(`/projects/${id}`);

    if (status === 200) {
      const { links, ...projectData } = data.data;

      setProjectData(projectData);
      setLinkList(links);
    } else {
      window.alert("Não foi possível buscar os dados.");
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
    <Form className="full" onReset={onReset}>
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
          Enviar
        </Button>
        <Button color="danger" type="reset" variant="light">
          Cancelar
        </Button>
      </div>
    </Form>
  ) : (
    <div className="flex full justify-center">
      <Spinner size="lg" />
    </div>
  );
}
