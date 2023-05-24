export const deletePassword = (usuarios = []) => {
  const newUsuarios = usuarios;
  if (newUsuarios) {
    newUsuarios.map((usuario) => {
      delete usuario.password;
      return usuario;
    });
  }

  return newUsuarios;
};
