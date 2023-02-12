import {expect} from "chai";
import {getHomeFolder} from "./shared/system_processor.js";
import * as Path from "path";
import {createStaticDomain} from "./virtual_host_domain_handler.js";
import {readFile} from "./shared/files.js";
import fs from "fs";


describe('addition test',   function() {



        it('should create example.com.conf', async () => {

            const nginxFolder = Path.join(getHomeFolder() , "test/resources/nginx") ;
            const staticPath = Path.join(getHomeFolder() , "test/resources/www") ;
            await createStaticDomain({nginxFolder: nginxFolder, domain: "staticdomain.com", path:staticPath, useSSL: true})

            let filename = Path.join(nginxFolder, "sites-available", "staticdomain.com.conf");
            expect(fs.existsSync(filename)).to.be.true;
            const contents = await readFile(filename)
            expect(contents).to.contain("server_name staticdomain.com")
            expect(contents).to.contain("root "+staticPath)

        });
});