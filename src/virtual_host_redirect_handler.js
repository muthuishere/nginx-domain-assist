import {parsePortRedirectConfig} from "./template_parser.js";

import {createSymbolicLink, writeFile} from "./shared/files.js";
import * as Path from "path";
import {enableSSL, restartNginx} from "./nginx.js";


export async function createDomainWithPortRedirection({nginxFolder, domain, port, useSSL}) {

    const input = {
        "nginxFolder": nginxFolder,
        "domainName": domain,
        "redirectPort": parseInt(port),
        "useSSL": useSSL
    }
    console.log("Received Inputs", input);
    await createRedirectSite(input)
    console.log("Created Redirect Site on Nginx for domain: " + domain + " to be redirected to port running on " + port);


}

async function createRedirectSite({nginxFolder, domainName, redirectPort, useSSL}) {

    const nginxSitesAvailableFolder = nginxFolder + Path.sep + 'sites-available'
    const nginxSitesEnabledFolder = nginxFolder + Path.sep + 'sites-enabled'
    let siteAvailableFolder = Path.join(nginxSitesAvailableFolder, domainName + '.conf');
    let siteEnabledLink = Path.join(nginxSitesEnabledFolder, domainName + '.conf');


    // create ConfigFile
    const configFileContents = await parsePortRedirectConfig({domainName, redirectPort})
    await writeFile(siteAvailableFolder, configFileContents)


    await createSymbolicLink(siteEnabledLink, siteAvailableFolder)


    await restartNginx();

    if (useSSL) {
        await enableSSL(domainName);
    }

}

