import {deleteFile} from "./shared/files.js";
import * as Path from "path";
import {removeSSL, restartNginx} from "./nginx.js";
import fs from "fs";


export async function deleteSiteInNginx({nginxFolder, site,domain}) {


    if(!!domain){
         site=domain;
    }

    const nginxSitesAvailableFolder = nginxFolder + Path.sep + 'sites-available'
    const nginxSitesEnabledFolder = nginxFolder + Path.sep + 'sites-enabled'
    let siteAvailableFile = Path.join(nginxSitesAvailableFolder, site + '.conf');
    let siteEnabledLink = Path.join(nginxSitesEnabledFolder, site + '.conf');

    if(fs.existsSync(siteAvailableFile) === false){
        throw new Error("Site "+site+" not found or its available in a different conf file")
    }

    await deleteFile(siteEnabledLink)
    await deleteFile(siteAvailableFile)
    await removeSSL(site)
    await restartNginx()
    console.log("Deleted site & SSL for : " + site );
}

