import { useMainStore } from '../../store'
import { Command } from '@tauri-apps/api/shell';
// setx PYTHON_HOME "C:\Program Files\PythonRoot;"
import { invoke } from '@tauri-apps/api/tauri';

export const checkEnviroment = async () => {
    const PATH: string = await invoke('get_path');
    const PATHList = PATH.split(";")
    const result = PATHList.find((value) => {
        return "%PYTHON_HOME%" == value
    })  
    if(!result) {
        initPath()
    }
    console.log(result);
    // const child = await command.spawn();
    // console.log('pid:', child.pid);
}
// setx path "%path%;%PYTHON_HOME%"
const initPath = async () => {
    const command = new Command('setx', ['path', "%PYTHON_HOME%;%PATH%"]);

    command.stdout.on('data', line => {
        console.log(`command stdout: "${line}"`)
    });
    command.stderr.on('data', line => {
        console.log(`command stderr: "${line}"`)
    });
    command.on('error', error => {
        console.error(`command error: "${error}"`)
    });
    command.on('close', data => {
        console.log(`command finished with code ${data.code} and signal ${data.signal}`)    
    });
    
    // return command
    const child = await command.spawn();
    console.log('pid:', child.pid);
}

export const initEnviroment = () => {
    const command = new Command('setx', ['PYTHON_HOME', "C:\\PythonRoot"]);

    command.stdout.on('data', line => {
        console.log(`command stdout: "${line}"`)
    });
    command.stderr.on('data', line => {
        console.log(`command stderr: "${line}"`)
    });
    command.on('error', error => {
        console.error(`command error: "${error}"`)
    });
    command.on('close', data => {
        console.log(`command finished with code ${data.code} and signal ${data.signal}`)    
    });
    
    return command
    // const child = await command.spawn();
    // console.log('pid:', child.pid);
}

export const globalPython = async () => {
    const store = useMainStore()
    const command = new Command('where', ['python']);
    // console.log(command)

    let outputStdout: string[] = []
    let outputStderr: string[] = []

    command.stdout.on('data', line => {
        console.log(`command stdout: "${line}"`)
        outputStdout.push(line)
    });
    command.stderr.on('data', line => {
        console.log(`command stderr: "${line}"`)
        outputStderr.push(line)
    });
    command.on('error', error => {
        console.error(`command error: "${error}"`)
    });
    command.on('close', data => {
        console.log(`command finished with code ${data.code} and signal ${data.signal}`)
        if(data.code === 1){
            store.globalPython = "无".toString()
        }else {
            store.globalPython = outputStdout[0].toString()
        }
    });
    
    const child = await command.spawn();
    console.log('pid:', child.pid);
}