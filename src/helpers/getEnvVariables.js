export const getEnvVariables = () => {
  return {
    //mis variables de entorno
    ...process.env,
  };
};
