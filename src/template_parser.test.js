import {parsePortRedirectConfig} from "./template_parser.js";

//import chai expect
import {expect} from "chai";

describe('Config File tests', function () {

    it('should read the config file', async () => {

        const configFileContents = await parsePortRedirectConfig({domainName:"ex.com", redirectPort:34})

        //configFileContents not null
        expect(configFileContents).to.not.be.null;

        //contains domain
        expect(configFileContents).to.contain("ex.com");

        //contains port
        expect(configFileContents).to.contain("34");

    });
});