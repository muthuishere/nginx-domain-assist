
import { expect } from 'chai';
import {parsePortRedirectConfig} from "../template_parser.js";

import { getPortNumber, getPortNumberFromFile, updatePortNumber } from "./nginxparser.js";
import fs from 'fs';
describe('Nginx Parser', () => {



    it('should get the port number', async () => {


        const domainName = "ex.com";
        const redirectPort = 34;
        const fileContents = await parsePortRedirectConfig({domainName, redirectPort})
        const port = getPortNumber(fileContents);

        expect(port).to.be.equal(34);

    });
});





describe('getPortNumber', () => {
    it('should return the correct port number from file contents', () => {
        const fileContents = 'proxy_pass http://localhost:8080;';
        const port = getPortNumber(fileContents);
        expect(port).to.be.equal(8080);
    });

    it('should return null if no port number is found', () => {
        const fileContents = 'proxy_pass http://localhost;';
        const port = getPortNumber(fileContents);
        expect(port).to.be.null;
    });
});

describe('getPortNumberFromFile', () => {
    it('should return the correct port number from file', () => {
        fs.writeFileSync('test.txt', 'proxy_pass http://localhost:8080;');
        const port = getPortNumberFromFile('test.txt');
        expect(port).to.be.equal(8080);
        fs.unlinkSync('test.txt');
    });

    it('should return null if file does not exist', () => {
        const port = getPortNumberFromFile('nonexistent.txt');
        expect(port).to.be.null;
    });
});

describe('updatePortNumber', () => {
    it('should correctly update the port number in file contents', () => {
        const fileContents = 'proxy_pass http://localhost:8080;';
        const updatedFileContents = updatePortNumber(fileContents, 9090);
        expect(updatedFileContents).to.be.equal('proxy_pass http://localhost:9090;');
    });


});