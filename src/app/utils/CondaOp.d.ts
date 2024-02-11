interface conda_env {
  path: string;
  name: string;
}

interface env_package {
  version: string;
  name: string;
  build: string;
  channel: string;
}

export { conda_env, env_package };
