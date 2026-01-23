import {
  Dropdown,
  DropdownItem,
  DropdownMenu,
  DropdownTrigger,
} from "@heroui/dropdown";
import { Input, Textarea } from "@heroui/input";
import {
  Table,
  TableBody,
  TableCell,
  TableColumn,
  TableHeader,
  TableRow,
} from "@heroui/table";
import {
  Avatar,
  Button,
  Card,
  Form,
  Link,
  ScrollShadow,
  Spinner,
  Tooltip,
} from "@heroui/react";
import { useEffect, useMemo, useState } from "react";
import {
  AddRounded as AddRoundedIcon,
  CloseRounded as CloseRoundedIcon,
  DeleteRounded as DeleteRoundedIcon,
  EditRounded as EditRoundedIcon,
  SaveRounded as SaveRoundedIcon,
} from "@mui/icons-material";

import { api } from "@/services/api.service";

type profileDataType = {
  imageUrl: string | null;
  name: string;
  lastName: string;
  subtitle: string;
  aboutMe: string;
};

type InfoLinkType = {
  id: string;
  title: string;
  link: string;
};

export default function ProfilePage() {
  const [profileData, setProfileData] = useState<profileDataType | null>(null);
  const [linkList, setLinkList] = useState<InfoLinkType[]>([]);

  const [editingRowId, setEditingRowId] = useState<string | null>(null);
  const [draftRow, setDraftRow] = useState<InfoLinkType>({
    id: "",
    title: "",
    link: "",
  });

  const isEditing = (key: string) => key === editingRowId;

  const startEdit = (row: InfoLinkType) => {
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
    if (linkList.length >= 5) return;

    const newRow = {
      id: `new-${Date.now().toString()}`,
      title: "",
      link: "",
    };

    setLinkList((prev) => [...prev, newRow]);
    startEdit(newRow);
  };

  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!profileData) return;

    const body = {
      name: profileData.name,
      lastName: profileData.name,
      subtitle: profileData.subtitle,
      aboutMe: profileData.aboutMe,
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

    api.put("/me", body);
  };

  const fetchData = async () => {
    setProfileData(null);
    setLinkList([]);

    const { status, data } = await api.get("/me");

    if (status === 200) {
      const { links, ...profileData } = data.data;

      setProfileData(profileData);
      setLinkList(links);
    } else {
      window.alert("Não foi possível buscar os dados.");
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const tableTopContent = useMemo(() => {
    return (
      <div className="flex justify-between items-end pl-4 pr-8">
        <h2 className="font-semibold text-2xl">Links</h2>
        <Button
          color="primary"
          isDisabled={linkList.length >= 5}
          size="sm"
          startContent={<AddRoundedIcon fontSize="small" />}
          onPress={addRow}
        >
          <p className="text-small">Adicionar link</p>
        </Button>
      </div>
    );
  }, [linkList]);

  return profileData ? (
    <ScrollShadow hideScrollBar className="full">
      <Form
        className="max-w-[880px] m-auto p-1"
        onReset={fetchData}
        onSubmit={onSubmit}
      >
        <Card className="w-full flex-row gap-2 shrink-0 p-4 items-center">
          <Avatar
            name={`${profileData.name} ${profileData.lastName}` || ""}
            size="lg"
            src={profileData.imageUrl || ""}
          />
          <Dropdown>
            <DropdownTrigger>
              <Button color="primary" size="sm">
                Trocar imagem
              </Button>
            </DropdownTrigger>
            <DropdownMenu aria-label="Static Actions">
              <DropdownItem key="upload">Enviar novo arquivo</DropdownItem>
              <DropdownItem key="url">Usar link</DropdownItem>
            </DropdownMenu>
          </Dropdown>
          <Button isDisabled={!profileData.imageUrl} size="sm">
            Remover imagem
          </Button>
        </Card>

        <div className="full flex gap-2">
          <Input
            isRequired
            label="Nome"
            size="sm"
            type="text"
            value={profileData.name}
            onChange={(e) => {
              setProfileData({ ...profileData, name: e.target.value });
            }}
          />
          <Input
            isRequired
            label="Sobrenome"
            size="sm"
            type="text"
            value={profileData.lastName}
            onChange={(e) => {
              setProfileData({ ...profileData, lastName: e.target.value });
            }}
          />
        </div>

        <Input
          isRequired
          label="Subtitulo"
          size="sm"
          type="text"
          value={profileData.subtitle}
          onChange={(e) => {
            setProfileData({ ...profileData, subtitle: e.target.value });
          }}
        />
        <Textarea
          isRequired
          label="Sobre mim"
          size="sm"
          type="text"
          value={profileData.aboutMe}
          onChange={(e) => {
            setProfileData({ ...profileData, aboutMe: e.target.value });
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
            Atualizar perfil
          </Button>
          <Button type="reset" variant="flat">
            Descartar alterações
          </Button>
        </div>
      </Form>
    </ScrollShadow>
  ) : (
    <div className="full max-w-[880px] m-auto">
      <Spinner className="full m-auto" size="lg" />
    </div>
  );
}
