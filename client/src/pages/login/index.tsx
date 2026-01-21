import { Input } from "@heroui/input";
import { Button, Card, Form, Link, Tooltip } from "@heroui/react";
import {
  VisibilityOffRounded as VisibilityOffRounded,
  VisibilityRounded as VisibilityRounded,
} from "@mui/icons-material";
import { useState } from "react";

type LoginType = {
  login: string;
  password: string;
};

export default function LoginPage() {
  const [loginData, setLoginData] = useState<LoginType>({
    login: "",
    password: "",
  });

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
          <VisibilityOffRounded />
        </Tooltip>
      ) : (
        <Tooltip content="Exibir senha" showArrow={true}>
          <VisibilityRounded />
        </Tooltip>
      )}
    </button>
  );

  return (
    <div className="full flex justify-center">
      <Card className="full max-w-[400px] p-1 justify-center items-center">
        <Form className="full p-1 justify-center items-center">
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
          <Button className="w-[50%]" color="primary" type="submit">
            Entrar
          </Button>
          <Link className="text-sm" href="register">
            <span>Criar conta</span>
          </Link>
        </Form>
      </Card>
    </div>
  );
}
