import {parseStaticConfig} from "./template_parser.js";

import {createFolder, createSymbolicLink, writeFile} from "./shared/files.js";
import * as Path from "path";
import {enableSSL, restartNginx} from "./nginx.js";
import fs from "fs";


export async function createStaticDomain({nginxFolder,domain,path,useSSL}){

    const input = {
        "nginxFolder":nginxFolder,
        "domainName":domain,
        "staticDomainPath":path,
        "useSSL":useSSL
    }

    console.log("handleStatic",input);


    let {nginxFolder: nginxFolder1, domainName, staticDomainPath, useSSL: useSSL1} = input;
    const nginxSitesAvailableFolder = nginxFolder1 + Path.sep + 'sites-available'
    const nginxSitesEnabledFolder = nginxFolder1 + Path.sep + 'sites-enabled'
    let siteAvailableFolder = Path.join(nginxSitesAvailableFolder, domainName + '.conf');
    let siteEnabledLink = Path.join(nginxSitesEnabledFolder, domainName + '.conf');

    if(fs.existsSync(siteAvailableFolder)){
        console.log("Site already exists, please delete it first")
        return false;
    }
    //Create Domain Folder
    await createFolder(staticDomainPath)


    // create ConfigFile
    const configFileContents = await parseStaticConfig({domainName, staticDomainPath})
    await writeFile(siteAvailableFolder, configFileContents)


    await createSymbolicLink(siteEnabledLink, siteAvailableFolder)


    await restartNginx();

    if (useSSL1) {
        await enableSSL(domainName);
    }
    console.log("Created Static Site on Nginx for domain: " + domain + " to be served from path " + path);
}


