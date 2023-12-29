import {doesOsHasCommand, runProcess} from "./shared/system_processor.js";


export async function restartNginx() {
const commandExists = await doesOsHasCommand('systemctl');

    if (!commandExists) {
        console.log('Sorry, this script requires systemctl to be installed to restart Nginx');
        return
    }

    return runProcess('systemctl', ['restart', 'nginx'])
}

 export async function enableSSL(domainName) {
    const commandExists = await doesOsHasCommand('certbot');

    if (!commandExists) {
        console.log('Sorry, this script requires certbot to be installed, to enable SSL');
        return
    }
    await runProcess('certbot', ['--nginx', '-d' , domainName,  '--non-interactive' ])
    await runProcess('certbot', ['--nginx',  '-d' , "www." +domainName, '--non-interactive'])
}

 export async function removeSSL(domainName) {
    const commandExists = await doesOsHasCommand('certbot');

    if (!commandExists) {
        console.log('Sorry, this script requires certbot to be installed, to remove SSL');
        return
    }
     await runProcess('certbot', ['delete', '--cert-name' , domainName ,"--non-interactive"])
     await runProcess('certbot', ['delete', '--cert-name' , "www." +domainName , "--non-interactive"])
}


