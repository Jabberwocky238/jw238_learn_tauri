import { Ref, reactive } from "vue";
import { useMainStore } from "../store.ts";
import { CmdShell } from "./CmdShell.ts";
import type { conda_env, env_package } from "./CondaOp.d";
import { ElMessage, ElMessageBox, ElNotification } from "element-plus";

interface CondaOpInterface {
  conda_info__json: () => void;
  conda_remove: (envName: string) => void;
  conda_create: (envName: string, pyVersion: string) => void;
  conda_install: (envName: string, packageName: string) => void;
  conda_list_n: (
    envName: string,
    tableData: env_package[],
    tableDataNum: Ref<number>,
    tableLoading: Ref<boolean>
  ) => void;
  conda_env_list: () => void;
  conda_env_export: (envName: string, exportFilePath: string) => void;
  conda_env_create: (envName: string, requirement?: string) => void;
}
// tool function
function f_split(line: string) {
  const _res = line.split(" ").filter((value) => {
    return value.length != 0;
  });
  for (let i = 0; i < _res.length; i++) {
    _res[i] = _res[i].replace(/(\r\n|\n|\r)/gm, "");
  }
  return _res;
}

const functionbase = () => {
  console.log("[function functionbase] entry");
  // const store = useMainStore();

  function stdout(line: string) {
    console.log(line);
  }
  function close(data: any) {
    console.log(data);
  }

  const command = new CmdShell(["env", "list"], stdout, undefined, undefined, close);
  command.spawn();
};

// main
class CondaOp implements CondaOpInterface {
  /**
     * conda_remove
     */
  public static conda_info__json() { };
  /**
     * conda_create
     */
  public static conda_create(envName: string, pyVersion: string) { };
  /**
   * conda_remove
   */
  public static conda_remove(envName: string) {
    console.log("[function remove_env] entry");
    const store = useMainStore();
    const close = (data: any) => {
      // console.log(data);
      if (data.code != 0) {
      } else {
        store.envs = store.envs.filter((env) => env.name != envName);
      }
    }

    const command = new CmdShell(["remove", "-n", envName, "--all", "-y"], undefined, undefined, undefined, close);
    command.spawn();
  }
  /**
   * conda_info__json
   */
  public static conda_install(envName: string, packageName: string) {
    console.log("[function install_package] entry");

    const handler = ElNotification({
      type: "info",
      message: `环境${envName}安装${packageName}中`,
      duration: 0,
    });
    function close(data: any) {
      handler.close();
      if (data.code != 0) {
        ElNotification({
          type: "error",
          message: `安装失败，不存在包${packageName}`,
        });
      } else {
        ElNotification({
          type: "success",
          message: `安装成功`,
        });
      }
    }
    function stdout(line: string) {
      console.log(line);
    }

    const command = new CmdShell(["install", "-n", envName, "-y", packageName], stdout, undefined, undefined, close);
    command.spawn();
  }
  /**
   * conda list -n <env>
   */
  public static conda_list_n(envName: string, tableData: env_package[], tableDataNum: Ref<number>, tableLoading: Ref<boolean>) {
    console.log("[function conda_list_n] entry");
    let cnt = 0;
    tableLoading.value = true;

    function stdout(line: string) {
      cnt++;
      if (cnt <= 3) return;
      const _res = f_split(line);
      // console.log(_res);
      const _cur: env_package = {
        name: _res[0],
        version: _res[1],
        build: _res[2],
        channel: _res[3],
      };
      tableData.push(_cur);
      tableDataNum.value++;
    }

    function close(_: any) {
      tableLoading.value = false;
    }

    const command = new CmdShell(["list", "-n", envName], stdout, undefined, undefined, close);
    command.spawn();
  }
  /**
   * conda env list
   */
  public static conda_env_list() {
    console.log("[function conda_env_list] entry");
    // init
    const store = useMainStore();
    store.envs = reactive([]);
    let cnt = 0;
    store.increment();

    // function
    const stdout = (line: string) => {
      cnt++;
      if (cnt <= 2) return;
      const _res = f_split(line);
      if (_res.length == 1) return;
      const _cur: conda_env = {
        path: _res[1],
        name: _res[0],
      };
      store.envs.push(_cur);
    };
    const close = (_: any) => {
      store.decrement();
    };

    // shell
    const command = new CmdShell(["env", "list"], stdout, undefined, undefined, close);
    command.spawn();
  }
  /**
   * conda_env_export
   */
  public static conda_env_export(envName: string, exportFilePath: string) { }
  /**
   * conda_env_create
   */
  public static conda_env_create(envName: string, requirement?: string) { }
}


export {
  CondaOp,
  type env_package,
};
