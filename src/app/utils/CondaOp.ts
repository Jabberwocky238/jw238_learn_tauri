import { Ref, reactive } from "vue";
import { useMainStore } from "../store.ts";
import { CmdShell } from "./CmdShell.ts";
import type { conda_env, env_package } from "./CondaOp.d";
import { ElMessage, ElMessageBox, ElNotification } from "element-plus";
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

// main
const conda_env_list = () => {
  console.log("[function conda_env_list] entry");
  const store = useMainStore();
  store.envs = reactive([]);
  let cnt = 0;
  store.increment();

  function get_env_list(line: string) {
    cnt++;
    if (cnt <= 2) return;
    const _res = f_split(line);
    if (_res.length == 1) return;
    console.log(_res);
    const _cur = {
      path: _res[1],
      name: _res[0],
    };
    store.envs.push(_cur);
  }

  const command = new CmdShell(
    ["env", "list"],
    get_env_list,
    undefined,
    undefined,
    (_) => {
      store.decrement();
    }
  );
  command.spawn();
};

const get_env_package = (
  envName: string,
  tableData: env_package[],
  tableDataNum: Ref<number>,
  tableLoading: Ref<boolean>
) => {
  console.log("[function get_env_package] entry");
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

  const command = new CmdShell(
    ["list", "-n", envName],
    stdout,
    undefined,
    undefined,
    close
  );
  command.spawn();
};

const install_package = (envName: string, packageName: string) => {
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
    console.log(line)
  }

  const command = new CmdShell(
    ["install", "-n", envName, '-y', packageName],
    stdout,
    undefined,
    undefined,
    close
  );
  command.spawn();
};

export { conda_env_list, get_env_package, install_package, type env_package };
