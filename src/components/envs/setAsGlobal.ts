import { useMainStore } from '../../store'
import { Command } from '@tauri-apps/api/shell';
import { invoke } from '@tauri-apps/api/tauri';

// mklink /J "C:\Program Files\PythonRoot" "D:\Anaconda3\envs\py310"
// rd pyroot

export const setAsGlobal = async (envName: string) => {
    const store = useMainStore()
    
    const envPath = store.envs.find((value) => {
        return value.name == envName
    })?.path

    console.log(envPath, "C:\\PythonRoot")
    if(!envPath) {
        console.error(`command error: envPath为空`)
        return
    }
    const command = await invoke('set_global', { path: envPath});
    console.log(command)
}