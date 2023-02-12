import {listAllDomains} from "./inspect_nginx_handler.js";
import Path from "path";
import {getHomeFolder} from "./shared/system_processor.js";
import {createRedirectedDomain} from "./redirect_domain_handler.js";
import {expect} from "chai";

describe('Inspect nginx domain Test', function () {


    it("should list all domains", async () => {
        const nginxFolder = Path.join(getHomeFolder() , "test/resources/nginx") ;
        let domainName = "firstdomain.com";
        await createRedirectedDomain({nginxFolder: nginxFolder, domain: domainName, port: 3000, useSSL: false})
        domainName = "seconddomain.com";
        await createRedirectedDomain({nginxFolder: nginxFolder, domain: domainName, port: 3000, useSSL: false})
        const domains = await listAllDomains({nginxFolder: nginxFolder })

        console.log("Domains: ", domains);
        expect(domains).to.contain("firstdomain.com")
        expect(domains).to.contain("seconddomain.com")
    })
});