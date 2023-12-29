#! /usr/bin/env node


import {isSudo} from "../src/shared/system_processor.js";
import {getParametersBasedOnOptions} from "../src/shared/input_arg_processor.js";
import {createRedirectedDomain} from "../src/redirect_domain_handler.js";

const options = {

    domain: {
        // inquirer
        message: 'Name of domain?',
        name: 'domain',
        // yargs
        demandOption: true,
        describe: 'Name of the domain',
        // shared
        type: 'string',
        default: 'example.com',
    },
    port: {
        // inquirer
        message: 'Name of port?',
        name: 'port',
        demandOption: true,
        describe: 'Name of the port',
        type: 'number'
    },
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
    useSSL: {

        message: 'Should Lets Encrypt SSL to be applied to domain?',
        name: 'useSSL',
        demandOption: false,
        describe: 'should use useSSL',
        type: 'boolean',
        default: false,
    },
};




(async () => {


    if(!isSudo()){
        console.log('Please run as sudo')
        return false;
    }

    const inputs = await getParametersBasedOnOptions(process.argv,options);


    try {
       const {message} =  await createRedirectedDomain(inputs);
        console.log(message);

        process.exit(0);
    }catch (err) {
        console.error(err);
        process.exit(1);
    }

})();
