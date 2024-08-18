export interface User {
  id: string;
  name: string;
  email: string;
  password: string;
  role: string;
}

export interface NewUser {
  name: string;
  email: string;
  password: string;
}
