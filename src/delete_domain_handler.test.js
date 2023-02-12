import {deleteDomainInNginx} from "./delete_domain_handler.js";
import Path from "path";
import {getHomeFolder} from "./shared/system_processor.js";
import {createDomainWithPortRedirection} from "./redirect_domain_handler.js";
import {expect} from "chai";
import fs from "fs";

describe('Delete domain Test', function () {


    it('should delete domain', async () => {

        const nginxFolder = Path.join(getHomeFolder() , "test/resources/nginx") ;
        let domainName = "deletabledomain.com";
        await createDomainWithPortRedirection({nginxFolder: nginxFolder, domain: domainName, port: 3000, useSSL: false})

        await deleteDomainInNginx({nginxFolder: nginxFolder, domain: domainName})

        //expect nginxFolder not exists

        const nginxSitesAvailableFolder = nginxFolder + Path.sep + 'sites-available'
        const nginxSitesEnabledFolder = nginxFolder + Path.sep + 'sites-enabled'
        let siteAvailableFile = Path.join(nginxSitesAvailableFolder, domainName + '.conf');
        let siteEnabledLink = Path.join(nginxSitesEnabledFolder, domainName + '.conf');


        expect(fs.existsSync(siteAvailableFile)).to.be.false;
        expect(fs.existsSync(siteEnabledLink)).to.be.false;


    });
});