import { useMainStore } from '../../store'
import { Command } from '@tauri-apps/api/shell';

export const initEnviroment = async () => {
    // todo!
}


export const globalPython = async () => {
    const store = useMainStore()
    const command = new Command('where', ['python']);
    // console.log(command)
    let output: string[] = []
    command.stdout.on('data', line => {
        console.log(`command stdout: "${line}"`)
        output.push(line)
    });
    command.stderr.on('data', line => {
        console.log(`command stderr: "${line}"`)
    });

    command.on('error', error => console.error(`command error: "${error}"`));
    command.on('close', data => {
        console.log(`command finished with code ${data.code} and signal ${data.signal}`)    
        // try {
        //     if(output[0].startsWith("信息")) {
        //         store.globalPython = "无".toString()
        //     }else {
        //         store.globalPython = output[0].toString()
        //     }
        // }catch(err){
        //     store.globalPython = "无".toString()
        // }
        store.globalPython = "无".toString()
    });
    
    const child = await command.spawn();
    console.log('pid:', child.pid);
}