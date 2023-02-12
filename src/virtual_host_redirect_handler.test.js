// create a mocha test for the function adding two numbers


import {expect} from "chai";
import {getHomeFolder} from "./shared/system_processor.js";
import * as Path from "path";
import {createDomainWithPortRedirection} from "./virtual_host_redirect_handler.js";
import {readFile} from "./shared/files.js";
import fs from "fs";


describe('addition test',   function() {



        it('should create example.com.conf', async () => {

            const nginxFolder = Path.join(getHomeFolder() , "test/resources/nginx") ;
            await createDomainWithPortRedirection({nginxFolder: nginxFolder, domain: "example.com", port: 3000, useSSL: true})

            let filename = Path.join(nginxFolder, "sites-available", "example.com.conf");
            expect(fs.existsSync(filename)).to.be.true;
            const contents = await readFile(filename)
            expect(contents).to.contain("server_name example.com")
            expect(contents).to.contain("listen 80")

        });
});