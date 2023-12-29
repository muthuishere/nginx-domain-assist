import {deleteSiteInNginx} from "./delete_domain_handler.js";
import Path from "path";
import {getHomeFolder} from "./shared/system_processor.js";
import {createRedirectedDomain} from "./redirect_domain_handler.js";
import {expect} from "chai";
import fs from "fs";

describe('Delete domain Test', function () {


    it('should delete domain', async () => {

        const nginxFolder = Path.join(getHomeFolder() , "test/resources/nginx") ;
        let domainName = "deletabledomain.com";
        const nginxSitesAvailableFolder = nginxFolder + Path.sep + 'sites-available'
        const nginxSitesEnabledFolder = nginxFolder + Path.sep + 'sites-enabled'
        let siteAvailableFile = Path.join(nginxSitesAvailableFolder, domainName + '.conf');
        let siteEnabledLink = Path.join(nginxSitesEnabledFolder, domainName + '.conf');

        //delete if exists
        if(fs.existsSync(siteAvailableFile)){
            fs.unlinkSync(siteAvailableFile)

        }
        if(fs.existsSync(siteEnabledLink)){
            fs.unlinkSync(siteEnabledLink)

        }

        await createRedirectedDomain({nginxFolder: nginxFolder, domain: domainName, port: 3000, useSSL: false})

        expect(fs.existsSync(siteAvailableFile)).to.be.true;
        expect(fs.existsSync(siteEnabledLink)).to.be.true;
        await deleteSiteInNginx({nginxFolder: nginxFolder, site: domainName})

        //expect nginxFolder not exists




        expect(fs.existsSync(siteAvailableFile)).to.be.false;
        expect(fs.existsSync(siteEnabledLink)).to.be.false;


    });

    it('should delete domain if passed with domain', async () => {

        const nginxFolder = Path.join(getHomeFolder() , "test/resources/nginx") ;
        let domainName = "deletabledomain.com";
        const nginxSitesAvailableFolder = nginxFolder + Path.sep + 'sites-available'
        const nginxSitesEnabledFolder = nginxFolder + Path.sep + 'sites-enabled'
        let siteAvailableFile = Path.join(nginxSitesAvailableFolder, domainName + '.conf');
        let siteEnabledLink = Path.join(nginxSitesEnabledFolder, domainName + '.conf');

        //delete if exists
        if(fs.existsSync(siteAvailableFile)){
            fs.unlinkSync(siteAvailableFile)

        }
        if(fs.existsSync(siteEnabledLink)){
            fs.unlinkSync(siteEnabledLink)

        }

        await createRedirectedDomain({nginxFolder: nginxFolder, domain: domainName, port: 3000, useSSL: false})

        expect(fs.existsSync(siteAvailableFile)).to.be.true;
        expect(fs.existsSync(siteEnabledLink)).to.be.true;
        await deleteSiteInNginx({nginxFolder: nginxFolder, domain: domainName})

        //expect nginxFolder not exists




        expect(fs.existsSync(siteAvailableFile)).to.be.false;
        expect(fs.existsSync(siteEnabledLink)).to.be.false;


    });
});