import * as Path from "path";
import fs from "fs";


// describe('addition test',   function() {
//
//
//
//         it('should create example.com.conf', async () => {
//
//             const nginxFolder = Path.join(getHomeFolder() , "test/resources/nginx") ;
//             const staticPath = Path.join(getHomeFolder() , "test/resources/www") ;
//             await createStaticDomain({nginxFolder: nginxFolder, domain: "staticdomain.com", path:staticPath, useSSL: true})
//
//             let filename = Path.join(nginxFolder, "sites-available", "staticdomain.com.conf");
//             expect(fs.existsSync(filename)).to.be.true;
//             const contents = await readFile(filename)
//             expect(contents).to.contain("server_name staticdomain.com")
//             expect(contents).to.contain("root "+staticPath)
//
//         });
// });
//

import { expect } from 'chai';
import { createStaticDomain } from "./static_domain_handler.js";
import { getHomeFolder } from "./shared/system_processor.js";
import { readFile } from "./shared/files.js";

describe('createStaticDomain', () => {
    it('should create a new static domain with SSL', async () => {
        const nginxFolder = Path.join(getHomeFolder(), "test/resources/nginx");
        const staticPath = Path.join(getHomeFolder(), "test/resources/www");
        await createStaticDomain({ nginxFolder: nginxFolder, domain: "newdomain.com", path: staticPath, useSSL: true });

        let filename = Path.join(nginxFolder, "sites-available", "newdomain.com.conf");
        expect(fs.existsSync(filename)).to.be.true;
        const contents = await readFile(filename);
        expect(contents).to.contain("server_name newdomain.com");
        expect(contents).to.contain("root " + staticPath);
    });



    it('should create a new static domain without SSL', async () => {
        const nginxFolder = Path.join(getHomeFolder(), "test/resources/nginx");
        const staticPath = Path.join(getHomeFolder(), "test/resources/www");
        await createStaticDomain({ nginxFolder: nginxFolder, domain: "newdomain.com", path: staticPath, useSSL: false });

        let filename = Path.join(nginxFolder, "sites-available", "newdomain.com.conf");
        expect(fs.existsSync(filename)).to.be.true;
        const contents = await readFile(filename);
        expect(contents).to.contain("server_name newdomain.com");
        expect(contents).to.contain("root " + staticPath);
    });
});