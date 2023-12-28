import {parsePortRedirectConfig} from "./template_parser.js";

import {createSymbolicLink, writeFile} from "./shared/files.js";
import * as Path from "path";
import {enableSSL, restartNginx} from "./nginx.js";
import fs from "fs";

export async function createRedirectedDomain({nginxFolder, domain, port, useSSL}) {

    const input = {
        "nginxFolder": nginxFolder,
        "domainName": domain,
        "redirectPort": parseInt(port),
        "useSSL": useSSL
    }
    console.log("Received Inputs", input);
    let {nginxFolder: nginxFolder1, domainName, redirectPort, useSSL: useSSL1} = input;
    const nginxSitesAvailableFolder = nginxFolder1 + Path.sep + 'sites-available'
    const nginxSitesEnabledFolder = nginxFolder1 + Path.sep + 'sites-enabled'
    let siteAvailableFolder = Path.join(nginxSitesAvailableFolder, domainName + '.conf');
    let siteEnabledLink = Path.join(nginxSitesEnabledFolder, domainName + '.conf');

    if(fs.existsSync(siteAvailableFolder)){
        console.log("Site already exists, please delete it first")
        return false;
    }

    // create ConfigFile
    const configFileContents = await parsePortRedirectConfig({domainName, redirectPort})
    await writeFile(siteAvailableFolder, configFileContents)


    await createSymbolicLink(siteEnabledLink, siteAvailableFolder)


    await restartNginx();

    if (useSSL1) {
        await enableSSL(domainName);
    }
    console.log("Created Redirect Site on Nginx for domain: " + domain + " to be redirected to port running on " + port);


}

