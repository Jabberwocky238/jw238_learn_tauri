import { Command } from "@tauri-apps/api/shell";

export class CmdShell {
  command?: Command;

  constructor(
    cmd: string[],
    onStdOut?: (line: string) => void,
    onClose?: (data: any) => void
  ) {
    if (cmd.length == 2) this.command = new Command("conda2", cmd);
    else if (cmd.length == 3) this.command = new Command("conda3", cmd);
    else if (cmd.length == 4) this.command = new Command("conda4", cmd);
    else if (cmd.length == 5) this.command = new Command("conda5", cmd);
    else throw Error("[class CmdShell] [constructor] cmd length error");

    const _onStdOut = typeof onStdOut == "function" ? onStdOut : (_: string) => {};
    const _onClose = typeof onClose == "function" ? onClose : (_: any) => {};

    this.command.stdout.on("data", _onStdOut);
    this.command.stderr.on("data", (line) =>
      console.log(`command stderr: "${line}"`)
    );
    this.command.on("error", (error) =>
      console.error(`command error: "${error}"`)
    );
    this.command.on("close", _onClose);
  }

  async spawn() {
    if (typeof this.command === "undefined")
      throw Error("[class CmdShell] [spawn] command undefined");
    const child = await this.command.spawn();
    return child.pid;
  }
}
