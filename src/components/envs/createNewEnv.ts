import { useMainStore } from '../../store'
import { Command } from '@tauri-apps/api/shell';
import { checkCondaEnvs } from '../config/checkConda';

export interface RuleForm {
    name: string,
    pythonVersion: string,
    DLFramework: string,
    defaultInstall: boolean,
}

export const createNewEnv = async (form: RuleForm) => {
    console.log(form)
    const command = new Command('conda5', ['create', '-n', form.name, form.pythonVersion, '-y']);

    command.stdout.on('data', (line: string) => {
        console.log(`command stdout: "${line}"`)
    });
    command.stderr.on('data', line => {
        console.log(`command stderr: "${line}"`)
    });
    command.on('error', error => console.error(`command error: "${error}"`));
    command.on('close', data => {
        console.log(`command finished with code ${data.code} and signal ${data.signal}`)   
        checkCondaEnvs()   
    });
    
    const child = await command.spawn();
    console.log('pid:', child.pid);
}