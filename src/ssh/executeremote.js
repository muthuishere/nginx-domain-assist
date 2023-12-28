// a method to connect to an ssh and execute scripts

// Path: src/ssh/ssh.js

 import {exec} from "child_process";


function executeremoteCommand({host,username,command}) {
    return new Promise((resolve, reject) => {
        exec(`ssh ${username}@${host} '${command}'`, (error, stdout, stderr) => {
            if (error) {
                reject(error);
                return;
            }
            if (stderr) {
                reject(stderr);
                return;
            }
            resolve(stdout);
        });
    });
}


