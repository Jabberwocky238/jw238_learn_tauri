import { useMainStore, type AppConf } from '../../../store'
import { writeTextFile, BaseDirectory, readTextFile } from '@tauri-apps/api/fs';

const newAppConf = () => {
    const obj = {
        DefaultInstall: [
            "scikit-learn", 
            "numpy",
            "pandas",
            "matplotlib",
        ]
    } as AppConf
    return JSON.stringify(obj)
}

export const readAppConf = async () => {
    const store = useMainStore()
    store.increment()
    let raw_contents = ""
    try {
        raw_contents = await readTextFile('app.conf', { dir: BaseDirectory.AppConfig });
    } catch(err) {
        console.log(err)
        raw_contents = newAppConf()
        await writeTextFile('app.conf', raw_contents, { dir: BaseDirectory.AppConfig });
    } finally {
        // console.log(raw_contents)
        store.appConf = JSON.parse(raw_contents)
        store.decrement()
    }
    console.log("store.appConf", store.appConf)
}

export const writeAppConf = async () => {
    const store = useMainStore()
    const raw_contents = JSON.stringify(store)
    await writeTextFile('app.conf', raw_contents, { dir: BaseDirectory.AppConfig });
}