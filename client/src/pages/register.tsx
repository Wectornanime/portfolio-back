import { Input } from "@heroui/input";
import { Button, Card, Form, Link, Tooltip } from "@heroui/react";
import {
  VisibilityOffRounded as VisibilityOffRounded,
  VisibilityRounded as VisibilityRounded,
} from "@mui/icons-material";
import { useState } from "react";

import { api } from "@/services/api.service";

type RegisterType = {
  name: string;
  lastName: string;
  email: string;
  password: string;
  confirmPassword: string;
};

export default function RegisterPage() {
  const [registerData, setRegisterData] = useState<RegisterType>({
    name: "",
    lastName: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const [isVisiblePassword, setIsVisiblePassword] = useState(false);
  const [isVisibleConfirmPassword, setIsVisibleConfirmPassword] =
    useState(false);
  const passwordErrors: string[] = [];
  const confirmPasswordErrors: string[] = [];

  const toggleVisibilityPassword = () =>
    setIsVisiblePassword(!isVisiblePassword);

  const toggleVisibilityConfirmPassword = () =>
    setIsVisibleConfirmPassword(!isVisibleConfirmPassword);

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

  const visibleConfirmPassWordButton = (
    <button
      className="focus:outline-solid outline-transparent cursor-pointer"
      type="button"
      onClickCapture={toggleVisibilityConfirmPassword}
    >
      {isVisibleConfirmPassword ? (
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

  if (registerData.password.length < 8) {
    passwordErrors.push("A senha deve ter pelo menos 8 caracteres");
  }
  if ((registerData.password.match(/[A-Z]/g) || []).length < 1) {
    passwordErrors.push("A senha deve ter pelo menos 1 letra maiúscula");
  }
  if ((registerData.password.match(/\d/g) || []).length < 1) {
    passwordErrors.push("A senha deve ter pelo menos 1 número");
  }

  if (registerData.confirmPassword != registerData.password) {
    confirmPasswordErrors.push("As senhas precisam ser iguais");
  }

  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const body = {
      name: registerData.name,
      lastName: registerData.lastName,
      email: registerData.email,
      password: registerData.password,
    };

    api.post(`/users`, body);
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
            label="Nome"
            size="sm"
            type="text"
            value={registerData.name}
            onChange={(e) => {
              setRegisterData({ ...registerData, name: e.target.value });
            }}
          />

          <Input
            isRequired
            label="Sobrenome"
            size="sm"
            type="text"
            value={registerData.lastName}
            onChange={(e) => {
              setRegisterData({ ...registerData, lastName: e.target.value });
            }}
          />

          <Input
            isRequired
            label="Email"
            size="sm"
            type="email"
            value={registerData.email}
            onChange={(e) => {
              setRegisterData({ ...registerData, email: e.target.value });
            }}
          />

          <Input
            isRequired
            endContent={visiblePassWordButton}
            errorMessage={() => (
              <ul>
                {passwordErrors.map((error, i) => (
                  <li key={i}>{error}</li>
                ))}
              </ul>
            )}
            isInvalid={passwordErrors.length > 0}
            label="Senha"
            size="sm"
            type={isVisiblePassword ? "text" : "password"}
            value={registerData.password}
            onChange={(e) => {
              setRegisterData({ ...registerData, password: e.target.value });
            }}
          />

          <Input
            isRequired
            endContent={visibleConfirmPassWordButton}
            errorMessage={() => (
              <ul>
                {confirmPasswordErrors.map((error, i) => (
                  <li key={i}>{error}</li>
                ))}
              </ul>
            )}
            isInvalid={confirmPasswordErrors.length > 0}
            label="Confirma senha"
            size="sm"
            type={isVisibleConfirmPassword ? "text" : "password"}
            value={registerData.confirmPassword}
            onChange={(e) => {
              setRegisterData({
                ...registerData,
                confirmPassword: e.target.value,
              });
            }}
          />

          <Button className="w-[50%]" color="primary" type="submit">
            Criar conta
          </Button>
          <Link className="text-sm" href="login">
            <span>Entrar com minha conta</span>
          </Link>
        </Form>
      </Card>
    </div>
  );
}
