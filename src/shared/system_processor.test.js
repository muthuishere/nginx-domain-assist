import {doesOsHasCommand, getHomeFolder, isSudo, runProcess} from "./system_processor.js";
import {expect} from "chai";

describe('Processor tests', function () {

    it('should get home folder', function () {
        const homeFolder = getHomeFolder();
        console.log(homeFolder);
        expect(homeFolder).to.be.a('string');
    });
    it('should execute ls command', async function () {
        const response = await runProcess("ls", ["-l"]);
        console.log(response);
        expect(response).to.be.a('number');

    });
    it('doesOsHasCommand should return true for valid command', async function () {
        const response = await doesOsHasCommand("ls");
       expect(response).to.be.a('boolean');
       expect(response).to.be.equal(true);

    });
    it('should check sudo or not', async function () {
        const response = isSudo();

        expect(response).to.be.a('boolean');

    });
});