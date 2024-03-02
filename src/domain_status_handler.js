import {parsePortRedirectConfig} from "./template_parser.js";

import {createSymbolicLink, readFile, writeFile} from "./shared/files.js";
import * as Path from "path";
import {enableSSL, restartNginx} from "./nginx.js";
import fs from "fs";
import {getPortNumberFromFile, updatePortNumber} from "./shared/nginxparser.js";

export async function handleDomainStatus({ nginxFolder,domain}) {

    const domainName = domain;

    // console.log("Received Inputs", input);
    // let {nginxFolder: nginxFolder1, domainName, redirectPort, useSSL: useSSL1} = input;
    const nginxSitesAvailableFolder = nginxFolder + Path.sep + 'sites-available'
    const nginxSitesEnabledFolder = nginxFolder + Path.sep + 'sites-enabled'
    let siteAvailableConfigFile = Path.join(nginxSitesAvailableFolder, domainName + '.conf');
    let siteEnabledLink = Path.join(nginxSitesEnabledFolder, domainName + '.conf');

    const result ={
        isAvailable: false,
        isEnabled: false,
        port: null,
    }

    if(fs.existsSync(siteAvailableConfigFile)) {
        result.isAvailable = true;
        const existingPort = getPortNumberFromFile(siteAvailableConfigFile);

        if(fs.existsSync(siteEnabledLink)){
            result.isEnabled = true;
        }

        result.port = existingPort;
    }


        return result;

}

