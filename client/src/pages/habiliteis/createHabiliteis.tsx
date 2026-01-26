import { Input } from "@heroui/input";
import { addToast, Button, Form, Link, LinkIcon } from "@heroui/react";
import { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";

import { api } from "@/services/api.service";

type SkillDataType = {
  title: string;
  iconUrl: string;
};

export default function CreateHabiliteisPage() {
  const location = useLocation();
  const navigate = useNavigate();

  const [skillData, setSkillData] = useState<SkillDataType>({
    iconUrl: "",
    title: "",
  });

  const onReset = () => {
    const path = location.pathname;
    const pathParent = path.substring(0, path.lastIndexOf("/"));

    navigate(pathParent);
  };

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!skillData) return;

    const path = location.pathname;
    const pathParent = path.substring(0, path.lastIndexOf("/"));

    const body = {
      title: skillData.title,
      iconUrl: skillData.iconUrl,
    };

    const { status } = await api.post(`/skills`, body);

    if (status === 200) {
      addToast({
        color: "success",
        title: "Habilidade criada com sucesso",
      });
    } else {
      addToast({
        color: "warning",
        title: "Não foi possível criar a habilidade",
      });
    }

    navigate(pathParent);
  };

  return (
    <Form
      className="full pt-1 px-2"
      onReset={onReset}
      onSubmit={(e) => onSubmit(e)}
    >
      <Input
        isRequired
        label="Título"
        size="sm"
        type="text"
        value={skillData.title}
        onChange={(e) => {
          setSkillData({ ...skillData, title: e.target.value });
        }}
      />

      <Input
        isRequired
        description="Use a classe css da versão de fonte do devicon.dev. O ícone aparecerá ao lado quando a classe estiver correta."
        endContent={<i className={`text-3xl ${skillData.iconUrl}`} />}
        label="Classe devicon"
        size="sm"
        type="text"
        value={skillData.iconUrl || ""}
        onChange={(e) => {
          setSkillData({ ...skillData, iconUrl: e.target.value });
        }}
      />

      <Link isExternal className="text-small" href="https://devicon.dev">
        devicon.dev
        <LinkIcon />
      </Link>

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
