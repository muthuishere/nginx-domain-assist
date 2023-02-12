import {assert, expect} from "chai";
import {getDefaultValues, getParametersBasedOnOptions, hasAllOptionsSet} from "./input_arg_processor.js";

//import sinon
import sinon from "sinon";

describe('Input argument processor tests', function () {

    it('hasAllOptionsSet should return true , if all options set', function () {

        const existingargv = {
            port: 80,
            domain: "example.com"
        }

        const options = {
            domain: {
                demandOption: true,
            },
            port: {
                demandOption: true,
            }
        }
        const response = hasAllOptionsSet(existingargv,options);
        expect(response).to.be.equal(true);

    });
    it('hasAllOptionsSet should return false , if one demandOption is not available in existingargv', function () {

        const existingargv = {
            port: 80,
        }

        const options = {
            domain: {
                demandOption: true,
            },
            port: {
                demandOption: true,
            }
        }
        const response = hasAllOptionsSet(existingargv,options);
        expect(response).to.be.equal(false);

    });

    it('getDefaultValues should return all the default values in options', function () {

        const options = {
            domain: {
                demandOption: true,
                default: "example.com"
            },
            port: {
                demandOption: true,
            }
        }
        const responses  = getDefaultValues(options);
        console.log(responses);
        expect(responses).to.be.deep.equal({domain: "example.com"});
    })

    it('getParametersBasedOnOptions should return help if help is specified',  async function () {
        sinon.stub(process, 'exit');
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
            path: {
                // inquirer
                message: 'Location of Static Domain Path?',
                name: 'path',
                // yargs
                demandOption: true,
                describe: 'Location of Static Domain Path?',
                // shared
                type: 'string',
                default: "/var/www/example.com",
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
        const responses = await getParametersBasedOnOptions(['xxx', 'xxx', '--help'], options);
        console.log(responses);
        assert(process.exit.calledWith(0));
        process.exit.restore();


    })
    it('getParametersBasedOnOptions should return appropriate values',  async function () {

        const processArgs=[
            '/Users/xx/.nvm/versions/node/v18.7.0/bin/node',
            '/Users/xx/.nvm/versions/node/v18.7.0/bin/create-static-virtual-domain',
            '--domain',
            'example.com',
            '--path',
            '/var/www/example.com'
        ]
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
            path: {
                // inquirer
                message: 'Location of Static Domain Path?',
                name: 'path',
                // yargs
                demandOption: true,
                describe: 'Location of Static Domain Path?',
                // shared
                type: 'string',
                default: "/var/www/example.com",
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
        const responses = await getParametersBasedOnOptions(processArgs, options);
        console.log(responses);

        //expect responses contains domain: "example.com",path: "/var/www/example.com",nginxFolder: "/etc/nginx",useSSL: false
        expect(responses).to.be.deep.contains({domain: "example.com",path: "/var/www/example.com",nginxFolder: "/etc/nginx",useSSL: false});



    })
});