import type { Env, CondaInfo } from '../../store';
import { useMainStore } from '../../store'
import { Command } from '@tauri-apps/api/shell';

export const checkCondaInfo = async () => {
    const store = useMainStore()
    store.increment()
    // console.log(store.name)
    const command = new Command('conda3', ['info', '-s', '--json']);
    // console.log(command)
    let output: string[] = []
    
    command.stdout.on('data', line => {
        // console.log(`command stdout: "${line}"`)
        output.push(line)
    });
    command.stderr.on('data', line => {
        console.log(`command stderr: "${line}"`)
    });
    command.on('error', error => {
        console.error(`command error: "${error}"`)
    });
    command.on('close', data => {
        console.log(`command finished with code ${data.code} and signal ${data.signal}`)      
        // let _temp = store.checkEnvs(output)
        const alloutput = JSON.parse(output.join("")) as CondaInfo
        // store.$patch((state) => {
        //     state.items.push({ name: 'shoes', quantity: 1 })
        //     state.hasChanged = true
        // })
        // console.log("conda_version", alloutput.conda_version)
        // console.log("CONDA_ROOT", alloutput.env_vars.CONDA_ROOT)
        // console.log("CUDA_PATH", alloutput.env_vars.CUDA_PATH)
        store.condaInfo = alloutput
        console.log("store.condaInfo", store.condaInfo)
        store.decrement()
    });
    
    const child = await command.spawn();
    console.log('pid:', child.pid);
}

export const checkCondaEnvs = async () => {
    const store = useMainStore()
    store.increment()
    // console.log(store.name)
    const command = new Command('conda2', ['env', 'list']);
    // console.log(command)
    let output: string[] = []
    
    command.stdout.on('data', line => {
        // console.log(`command stdout: "${line}"`)
        output.push(line)
    });
    command.stderr.on('data', line => {
        console.log(`command stderr: "${line}"`)
    });

    command.on('error', error => console.error(`command error: "${error}"`));
    command.on('close', data => {
        console.log(`command finished with code ${data.code} and signal ${data.signal}`)      
        // let _temp = store.checkEnvs(output)
        store.envs = [];
        const envs = output.slice(2, output.length - 1);
        envs.forEach((value: string, _: number) => {
            const _temp = value.trimEnd().split(" ");
            const newEnv: Env = {
                name: _temp[0],
                path: _temp[_temp.length-1],
            };
            store.envs.push(newEnv);
        });
        // store.$patch((state) => {
        //     state.items.push({ name: 'shoes', quantity: 1 })
        //     state.hasChanged = true
        // })
        console.log("store.envs", store.envs)
        store.decrement()
    });
    
    const child = await command.spawn();
    console.log('pid:', child.pid);
}