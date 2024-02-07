import { User } from "../interfaces/user";

export const deletePassword = (usuarios: User[] = []): User[] => {
  const newUsuarios: User[] = usuarios;
  if (newUsuarios) {
    newUsuarios.map((usuario: User): User => {
      delete usuario.password;
      return usuario;
    });
  }

  return newUsuarios;
};
