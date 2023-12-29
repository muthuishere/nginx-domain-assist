#! /usr/bin/env node

import {isSudo} from "../src/shared/system_processor.js";
import {getParametersBasedOnOptions} from "../src/shared/input_arg_processor.js";
import {deleteSiteInNginx} from "../src/delete_domain_handler.js";

const options = {
    nginxFolder: {
        // inquirer
        message: 'location of Nginx Folder?',
        name: 'nginxFolder',
        // yargs
        demandOption: false,
        describe: 'location of Nginx Folder',
        // shared
        type: 'string',
        default: "/etc/nginx",
    },
    site: {
        // inquirer
        message: 'Name of site to be deleted from Nginx?',
        name: 'site',
        // yargs
        demandOption: true,
        describe: 'Name of the Site to be deleted from Nginx',
        // shared
        type: 'string',
        default: 'example.com',
    },
    domain: {
        // inquirer
        message: 'Name of domain to be deleted from Nginx?',
        name: 'domain',
        // yargs
        demandOption: true,
        describe: 'Name of domain to be deleted from Nginx?',
        // shared
        type: 'string',
        default: 'example.com',
    }

};



(async () => {


    if(!isSudo()){
        console.log('Please run as sudo')
        return false;
    }
    try {
    const inputs = await getParametersBasedOnOptions(process.argv,options);
    await deleteSiteInNginx(inputs);
}catch (err) {
        console.log("Unable to Delete Site")
    console.error(err);
    process.exit(1);
}

})();
