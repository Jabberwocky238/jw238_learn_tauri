export interface Env {
    name: string,
    path: string
}

export interface AppConf {
    DefaultInstall: string[]
}

export interface CondaInfo {
    conda_version: string,
    env_vars: {
        CONDA_ROOT: string
        CUDA_PATH: string
    }
}