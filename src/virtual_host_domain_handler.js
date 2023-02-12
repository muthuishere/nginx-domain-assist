import {parseStaticConfig} from "./template_parser.js";

import {createFolder, createSymbolicLink, writeFile} from "./shared/files.js";
import * as Path from "path";
import {enableSSL, restartNginx} from "./nginx.js";


export async function createStaticDomain({nginxFolder,domain,path,useSSL}){

    const input = {
        "nginxFolder":nginxFolder,
        "domainName":domain,
        "staticDomainPath":path,
        "useSSL":useSSL
    }

    console.log("handleStatic",input);


    await createStaticSite(input)
    console.log("Created Static Site on Nginx for domain: " + domain + " to be served from path " + path);
}
async function createStaticSite({nginxFolder, domainName, staticDomainPath, useSSL}) {

    const nginxSitesAvailableFolder = nginxFolder + Path.sep+ 'sites-available'
    const nginxSitesEnabledFolder = nginxFolder + Path.sep+ 'sites-enabled'
    let siteAvailableFolder = Path.join(nginxSitesAvailableFolder, domainName + '.conf');
    let siteEnabledLink = Path.join(nginxSitesEnabledFolder, domainName + '.conf');


    //Create Domain Folder
    await createFolder(staticDomainPath)


    // create ConfigFile
    const configFileContents = await parseStaticConfig({domainName, staticDomainPath})
    await writeFile(siteAvailableFolder, configFileContents)


    await createSymbolicLink(siteEnabledLink,siteAvailableFolder)


    await restartNginx();

    if(useSSL){
        await enableSSL(domainName);
    }

}


