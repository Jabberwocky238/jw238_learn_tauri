import { Ref, reactive } from "vue";
import { useMainStore } from "../store.ts";
import { CmdShell } from "./CmdShell.ts";
import type { conda_env, env_package } from "./CondaOp.d";
import { ElMessage, ElMessageBox, ElNotification } from "element-plus";

interface SysOpInterface {
    setGlobal: (envName: string) => void;
    checkConda: () => void;
    installConda: (path: string) => void;
}