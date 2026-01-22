import { Input } from "@heroui/input";
import { addToast, Button, Card, Form, Link, Spinner, Tooltip } from "@heroui/react";
import {
  VisibilityOffRounded as VisibilityOffRoundedIcon,
  VisibilityRounded as VisibilityRoundedIcon,
} from "@mui/icons-material";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

import { api } from "@/services/api.service";
import LoadingOverlay from "@/components/loadingOverlay";
import { setAuthToken } from "@/utils/authToken";

type LoginType = {
  login: string;
  password: string;
};

export default function LoginPage() {
  const navigate = useNavigate();

  const [loginData, setLoginData] = useState<LoginType>({
    login: "",
    password: "",
  });

  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isVisiblePassword, setIsVisiblePassword] = useState(false);

  const toggleVisibilityPassword = () =>
    setIsVisiblePassword(!isVisiblePassword);

  const visiblePassWordButton = (
    <button
      className="focus:outline-solid outline-transparent cursor-pointer"
      type="button"
      onClickCapture={toggleVisibilityPassword}
    >
      {isVisiblePassword ? (
        <Tooltip content="Esconder senha" showArrow={true}>
          <VisibilityOffRoundedIcon />
        </Tooltip>
      ) : (
        <Tooltip content="Exibir senha" showArrow={true}>
          <VisibilityRoundedIcon />
        </Tooltip>
      )}
    </button>
  );

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoading(true);

    const body = {
      login: loginData.login,
      password: loginData.password,
    };

    const { data, status } = await api.post(`/auth/login`, body);

    setIsLoading(false);

    if (status === 200) {
      setAuthToken(data.data.token);
      navigate("/");
      addToast({
        title: "Toast Title",
        color: "success",
      });
    }
  };

  return (
    <div className="full flex justify-center">
      <Card className="full max-w-[400px] p-1 justify-center items-center">
        <Form
          className="full p-1 justify-center items-center"
          onSubmit={(e) => onSubmit(e)}
        >
          <Input
            isRequired
            label="Email"
            size="sm"
            type="email"
            value={loginData.login}
            onChange={(e) => {
              setLoginData({ ...loginData, login: e.target.value });
            }}
          />
          <Input
            isRequired
            endContent={visiblePassWordButton}
            label="Senha"
            size="sm"
            type={isVisiblePassword ? "text" : "password"}
            value={loginData.password}
            onChange={(e) => {
              setLoginData({ ...loginData, password: e.target.value });
            }}
          />
          <Button
            className="w-[50%]"
            color="primary"
            isDisabled={isLoading}
            type="submit"
          >
            {isLoading ? <Spinner color="white" size="sm" /> : "Entrar"}
          </Button>
          <Link className="text-sm" href="register">
            <span>Criar conta</span>
          </Link>
        </Form>
      </Card>

      {isLoading && <LoadingOverlay />}
    </div>
  );
}
