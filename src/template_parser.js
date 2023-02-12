import {readFile} from "./shared/files.js";
import * as Path from "path";
import {getHomeFolder} from "./shared/system_processor.js";


export async function  parseStaticConfig({domainName,staticDomainPath}){

    const filename =     Path.resolve(getHomeFolder(), 'templates/static.conf')
    let contents = await readFile(filename);
    contents = contents.replaceAll('#DOMAIN_NAME#', domainName)
    contents = contents.replaceAll('#DOMAIN_FOLDER#', staticDomainPath)
    return contents;
}

export async function  parsePortRedirectConfig({domainName,redirectPort}){

    const filename =     Path.resolve(getHomeFolder(), 'templates/portredirect.conf')
    let contents = await readFile(filename);
    contents = contents.replaceAll('#DOMAIN_NAME#', domainName)
    contents = contents.replaceAll('#APP_PORT#', redirectPort)
    return contents;
}

