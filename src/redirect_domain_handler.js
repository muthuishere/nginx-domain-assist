import {parsePortRedirectConfig} from "./template_parser.js";

import {createSymbolicLink, readFile, writeFile} from "./shared/files.js";
import * as Path from "path";
import {enableSSL, restartNginx} from "./nginx.js";
import fs from "fs";
import {getPortNumberFromFile, updatePortNumber} from "./shared/nginxparser.js";

export async function createRedirectedDomain({nginxFolder, domain, port, useSSL}) {

    // const input = {
    //     "nginxFolder": nginxFolder,
    //     "domainName": domain,
    //     "redirectPort": parseInt(port),
    //     "useSSL": useSSL
    // }
   const redirectPort = parseInt(port);
    const domainName = domain;

    // console.log("Received Inputs", input);
    // let {nginxFolder: nginxFolder1, domainName, redirectPort, useSSL: useSSL1} = input;
    const nginxSitesAvailableFolder = nginxFolder + Path.sep + 'sites-available'
    const nginxSitesEnabledFolder = nginxFolder + Path.sep + 'sites-enabled'
    let siteAvailableConfigFile = Path.join(nginxSitesAvailableFolder, domainName + '.conf');
    let siteEnabledLink = Path.join(nginxSitesEnabledFolder, domainName + '.conf');
    console.log("siteAvailableConfigFile",siteAvailableConfigFile);
    if(fs.existsSync(siteAvailableConfigFile)){

        const existingPort = getPortNumberFromFile(siteAvailableConfigFile);
        if(redirectPort === existingPort){
            // console.log("Site already exists, returning it")
            const message = `Site already exists ${domainName} with ${redirectPort}`
            return {message};
        }
        const existingContents = await readFile(siteAvailableConfigFile);

        const newContents = updatePortNumber(existingContents,redirectPort);
        await writeFile(siteAvailableConfigFile,newContents);

        // console.log("Site port changed to ",redirectPort)

        const message =`Site already exists ${domainName} with ${existingPort} changed port to ${redirectPort}`
        return {message};
    }

    // create ConfigFile
    const configFileContents = await parsePortRedirectConfig({domainName, redirectPort})
    await writeFile(siteAvailableConfigFile, configFileContents)


    await createSymbolicLink(siteEnabledLink, siteAvailableConfigFile)




    let sslMessage =""
    if (useSSL) {
        await enableSSL(domainName);
        sslMessage = " and enabled SSL"
    }
    await restartNginx();

   const message = `Created  site  ${domainName}  ${sslMessage} in Nginx  and  redirected to port  ${redirectPort}`;
    return {message};
}

