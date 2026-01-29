import { Input } from "@heroui/input";
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
  LinkIcon,
  Spinner,
} from "@heroui/react";
import { useEffect, useState } from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";

import { api } from "@/services/api.service";

type SkillDataType = {
  title: string;
  iconUrl: string;
};

export default function InfoHabiliteisPage() {
  const { id } = useParams();

  const location = useLocation();
  const navigate = useNavigate();
  const { isOpen, onOpen, onOpenChange } = useDisclosure();

  const [skillData, setSkillData] = useState<SkillDataType | null>(null);

  const onReset = () => {
    const path = location.pathname;
    const pathParent = path.substring(0, path.lastIndexOf("/"));

    navigate(pathParent);
  };

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!skillData) return;

    const toastId = addToast({
      title: "Atualizando habilidade",
      timeout: Infinity,
      shouldShowTimeoutProgress: true,
      endContent: <Spinner size="sm" />,
    });

    const body = {
      title: skillData.title,
      iconUrl: skillData.iconUrl,
    };

    const { status } = await api.put(`/skills/${id}`, body);

    if (!toastId) return;
    closeToast(toastId);

    if (status === 200) {
      addToast({
        color: "success",
        title: "Habilidade atualizada com sucesso",
      });
    }
  };

  const handleDelete = async () => {
    const path = location.pathname;
    const pathParent = path.substring(0, path.lastIndexOf("/"));

    const { status } = await api.delete(`/skills/${id}`);

    if (status === 204) {
      addToast({
        color: "success",
        title: "Habilidade deletada com sucesso",
      });
    }

    navigate(pathParent);
  };

  const fetchData = async () => {
    setSkillData(null);

    const { status, data } = await api.get(`/skills/${id}`);

    if (status === 200) {
      setSkillData(data.data);
    } else {
      addToast({
        color: "warning",
        title: "Não foi possível carregar esta habilidade",
      });
    }
  };

  useEffect(() => {
    fetchData();
  }, [id]);

  return skillData ? (
    <>
      <Form className="full" onReset={onReset} onSubmit={(e) => onSubmit(e)}>
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
            Atualizar
          </Button>
          <Button type="reset" variant="flat">
            Descartar alterações
          </Button>

          <Button color="danger" variant="light" onPress={onOpen}>
            Excluir habilidade
          </Button>
        </div>
      </Form>

      <Modal isOpen={isOpen} onOpenChange={onOpenChange}>
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className="flex flex-col gap-1">
                Confirmar a exclusão dessa habilidade?
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
