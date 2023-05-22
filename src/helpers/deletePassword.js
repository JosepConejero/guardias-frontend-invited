export const deletePassword = (usuarios = []) => {
  const newUsuarios = usuarios;
  if (newUsuarios) {
    newUsuarios.map((usuario) => {
      delete usuario.password;
      console.log(usuario);
      return usuario;
    });
  }

  return newUsuarios;
};
