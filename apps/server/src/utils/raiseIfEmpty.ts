// Raise error if env variable is empty
// Is used to make sure that all required env variables are set
export const getEnvVarWithThrow = (envVarName: string) => {
  const envVar = process.env[envVarName];
  if (!envVar) {
    throw new Error(`${envVarName} is not set`);
  }
  return envVar;
};
