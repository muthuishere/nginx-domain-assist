import {spawn} from 'child_process'
import commandExists from "command-exists";
import {fileURLToPath} from "url";
import Path from "path";


const isWin = process.platform === "win32";



export function runProcess(command, args) {
    return new Promise((resolve, reject) => {
        const process = spawn(command, args);
        process.stdout.on('data', (data) => {
            console.log(data.toString());
        });
        process.stderr.on('data', (data) => {
            console.error(data.toString());
        });
        process.on('close', (code) => {
            resolve(code);
        });
    });
}


export function isSudo() {

    return isWin ? true : (process.getuid && process.getuid() === 0);
}


export async function  doesOsHasCommand(cmd){
    try {
        await commandExists(cmd)
        return true
    }catch (e) {
        return  false
    }


}

export function getHomeFolder(){
    const __filename = fileURLToPath(import.meta.url);
    const dirname = Path.dirname(__filename);
    const folder =     Path.resolve(dirname, '../../')
    return folder;
}