import { Input, Textarea } from "@heroui/input";
import {
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

type itemListLinkType = {
  key: string;
  label: string;
  link: string;
};

export default function CreateProjectsPage() {
  const location = useLocation();
  const navigate = useNavigate();

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
    label: "",
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
      label: "",
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
      label: "",
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
    <Form className="full" onReset={onReset}>
      <Input isRequired label="Título" size="sm" type="text" />
      <Textarea isRequired label="Descrição" size="sm" type="text" />

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
                    placeholder="label"
                    size="sm"
                    type="text"
                    value={draftRow.label}
                    variant="underlined"
                    onChange={(e) =>
                      setDraftRow({ ...draftRow, label: e.target.value })
                    }
                  />
                ) : (
                  <p className="text-medium">{row.label}</p>
                )}
              </TableCell>

              <TableCell>
                {isEditing(row.key) ? (
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
