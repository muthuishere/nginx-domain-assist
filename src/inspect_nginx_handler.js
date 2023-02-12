import Path from "path";
import fs from "fs";

export async function listAllSites({nginxFolder}) {
    const nginxSitesAvailableFolder = nginxFolder + Path.sep + 'sites-available'

    let files = fs.readdirSync(nginxSitesAvailableFolder)
    let domains = files.filter(file=>file.indexOf(".conf") >0).map(file => file.replace(".conf",""))
    console.log("Available Sites: ", domains);
    return domains
}