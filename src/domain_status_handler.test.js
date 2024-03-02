import {expect} from "chai";
import * as domain_status_handler from "./domain_status_handler.js";
import Path from "path";
import {getHomeFolder} from "./shared/system_processor.js";
describe('domain_status_handler', () => {

    it('domainstatus should retrieve properly for valid file ', async () => {
        const nginxFolder = Path.join(getHomeFolder() , "test/resources/nginx") ;
 const result = await        domain_status_handler.handleDomainStatus({domain: 'domainstatus.com', nginxFolder})
        console.log("Result: ", result);

        expect(result.port).to.equal(98000)
        expect(result.isAvailable).to.equal(true)
        expect(result.isEnabled).to.equal(true)
    });
    it('domainstatus should retrieve properly for invalid file ', async () => {
        const nginxFolder = Path.join(getHomeFolder() , "test/resources/nginx") ;
 const result = await        domain_status_handler.handleDomainStatus({domain: 'sssdomainstatus.com', nginxFolder})
        console.log("Result: ", result);

        expect(result.port).to.equal(null)
        expect(result.isAvailable).to.equal(false)
        expect(result.isEnabled).to.equal(false)
    });
});
