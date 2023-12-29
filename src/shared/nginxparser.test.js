
import { expect } from 'chai';
import {parsePortRedirectConfig} from "../template_parser.js";
import {getPortNumber} from "./nginxparser.js";
describe('Nginx Parser', () => {



    it('should get the port number', async () => {


        const domainName = "ex.com";
        const redirectPort = 34;
        const fileContents = await parsePortRedirectConfig({domainName, redirectPort})
        const port = getPortNumber(fileContents);

        expect(port).to.be.equal(34);

    });
});