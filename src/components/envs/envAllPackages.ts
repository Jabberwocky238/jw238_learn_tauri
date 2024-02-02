import { Ref } from 'vue';
// import type { Env } from '../../store';
import { Command } from '@tauri-apps/api/shell';

export interface envPackage {
    name: string
    version: string
    build: string
    channel: string
}

export const getEnvAllPackages = async (envName: string, tableData: envPackage[], tableDataNum: Ref<number>) => {
    const command = new Command('conda3', ['list', '-n', envName]);
    console.log(command)

    let cnt = 0
    command.stdout.on('data', (line: string) => {
        cnt += 1 
        if(cnt <= 3) return //跳过前三行没有用的输出
        // console.log(`command stdout: "${line}"`)
        let line_splited: string[] = line.trimEnd().split(" ")
        tableDataNum.value += 1
        line_splited = line_splited.filter((value: string, _: number) => {
            if(value.length === 0) return false
            else return true
        })
        // console.log(line_splited)
        tableData.push({
            name: line_splited[0],
            version: line_splited[1],
            build: line_splited[2],
            channel: line_splited[3],
        })
    });
    command.stderr.on('data', line => {
        console.log(`command stderr: "${line}"`)
    });
    command.on('error', error => console.error(`command error: "${error}"`));
    command.on('close', data => {
        console.log(`command finished with code ${data.code} and signal ${data.signal}`)      
    });
    
    const child = await command.spawn();
    console.log('pid:', child.pid);
}