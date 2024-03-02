#! /usr/bin/env node

import {isSudo} from "../src/shared/system_processor.js";
import {getParametersBasedOnOptions} from "../src/shared/input_arg_processor.js";
import {listAllSites} from "../src/inspect_nginx_handler.js";


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
    }

};



(async () => {


    if(!isSudo()){
        console.log('Please run as sudo')
        return false;
    }
    try {
    const inputs = await getParametersBasedOnOptions(process.argv,options);
    await listAllSites(inputs);
}catch (err) {
        console.log("Unable to list Sites")
    console.error(err);
    process.exit(1);
}

})();
