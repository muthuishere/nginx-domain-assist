import {createFolder, deleteFile, readFile} from "./files.js";
import {assert} from "chai";

const fail = assert.fail;
describe('files tests', function () {


    it('read file for invalid throws error', function (done) {
        readFile("notexist.conf").then((data) => {
            fail("file should not exist");
        }).catch((err) => {

            done();
        })
    });
    it('deleteFile file for invalid should throws error', function (done) {
        deleteFile("notexist.conf").then((data) => {
            fail("file should not exist");
        }).catch((err) => {

            done();
        })
    });
    it('createFolder  for invalid should throws error', function (done) {
        createFolder("/ax/notexist.conf").then((data) => {
            fail("createFolder should not work");
        }).catch((err) => {

            done();
        })
    });

});