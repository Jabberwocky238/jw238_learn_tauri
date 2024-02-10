import { reactive } from "vue";
import { useMainStore } from "../store.ts";
import { CmdShell } from "./CmdShell.ts";
import type { conda_env } from "./CondaOp.d";

const conda_env_list = () => {
  console.log("[function conda_env_list] entry");
  const store = useMainStore();
  store.envs = reactive([])
  let cnt = 0;
  function get_env_list(line: string) {
    cnt++;
    if (cnt <= 2) return;
    const _res = line.split(" ");
    if (_res.length == 1) return;
    const _cur_path = _res[_res.length - 1].replace(/(\r\n|\n|\r)/gm, "");
    const _cur = {
      path: _cur_path,
      name: _res[0],
    };
    // console.log(_cur);
    store.envs.push(_cur);
  }
  const command = new CmdShell(["env", "list"], get_env_list);
  command.spawn();
};

export { conda_env_list };
