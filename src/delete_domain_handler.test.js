import * as Path from "path";
import fs from "fs";




import { expect } from 'chai';
import { createStaticDomain } from "./static_domain_handler.js";
import { getHomeFolder } from "./shared/system_processor.js";
import { readFile } from "./shared/files.js";
import {deleteDomainInNginx, deleteSiteInNginx} from "./delete_domain_handler.js";

describe('delete_domain Handler', () => {
    it('deleteDomainInNginx should delete appropriately', async () => {
        const nginxFolder = Path.join(getHomeFolder(), "test/resources/nginx");
        const staticPath = Path.join(getHomeFolder(), "test/resources/www");
        let filename = Path.join(nginxFolder, "sites-available", "deletenewdomain.com.conf");
        await createStaticDomain({ nginxFolder: nginxFolder, domain: "deletenewdomain.com", path: staticPath, useSSL: true });
        expect(fs.existsSync(filename)).to.be.true;
        await deleteDomainInNginx({nginxFolder: nginxFolder, domain: "deletenewdomain.com"});

        expect(fs.existsSync(filename)).to.be.false;


    });

    it('deleteSiteInNginx should delete appropriately', async () => {
        const nginxFolder = Path.join(getHomeFolder(), "test/resources/nginx");
        const staticPath = Path.join(getHomeFolder(), "test/resources/www");
        let filename = Path.join(nginxFolder, "sites-available", "deletenewdomain.com.conf");
        await createStaticDomain({ nginxFolder: nginxFolder, domain: "deletenewdomain.com", path: staticPath, useSSL: true });
        expect(fs.existsSync(filename)).to.be.true;
        await deleteSiteInNginx({nginxFolder: nginxFolder, site: "deletenewdomain.com"});

        expect(fs.existsSync(filename)).to.be.false;


    });



    it('should create a new static domain without SSL', async () => {
        const nginxFolder = Path.join(getHomeFolder(), "test/resources/nginx");
        const staticPath = Path.join(getHomeFolder(), "test/resources/www");
        await createStaticDomain({ nginxFolder: nginxFolder, domain: "newdomain.com", path: staticPath, useSSL: false });

        let filename = Path.join(nginxFolder, "sites-available", "newdomain.com.conf");
        expect(fs.existsSync(filename)).to.be.true;
        const contents = await readFile(filename);
        expect(contents).to.contain("server_name newdomain.com");
        // expect(contents).to.contain("root " + staticPath);
    });
});