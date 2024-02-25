import {deleteFile} from "./shared/files.js";
import * as Path from "path";
import {removeSSL, restartNginx} from "./nginx.js";
import fs from "fs";


export async function deleteSiteInNginx({nginxFolder, site}) {




    await deleteDomainInNginx({nginxFolder, domain: site})


}


export async function deleteDomainInNginx({nginxFolder, domain}) {



    const nginxSitesAvailableFolder = nginxFolder + Path.sep + 'sites-available'
    const nginxSitesEnabledFolder = nginxFolder + Path.sep + 'sites-enabled'
    let siteAvailableFile = Path.join(nginxSitesAvailableFolder, domain + '.conf');
    let siteEnabledLink = Path.join(nginxSitesEnabledFolder, domain + '.conf');

    if(fs.existsSync(siteAvailableFile) === false){
        throw new Error("domain "+domain+" not found or its available in a different conf file")
    }

    await deleteFile(siteEnabledLink)
    await deleteFile(siteAvailableFile)
    await removeSSL(domain)
    await restartNginx()
    console.log("Deleted site & SSL for : " + domain );
}

