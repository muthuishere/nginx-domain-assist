// create a mocha test for the function adding two numbers


import {expect} from "chai";
import {getHomeFolder} from "./shared/system_processor.js";
import * as Path from "path";
import {createRedirectedDomain} from "./redirect_domain_handler.js";
import {readFile} from "./shared/files.js";
import fs from "fs";


describe('redirect domain handler',   function() {



        it('should create example.com.conf', async () => {

            if(fs.existsSync(Path.join(getHomeFolder() , "test/resources/nginx/sites-available/example.com.conf"))){
                fs.unlinkSync(Path.join(getHomeFolder() , "test/resources/nginx/sites-available/example.com.conf"))
            }
            const nginxFolder = Path.join(getHomeFolder() , "test/resources/nginx") ;
            await createRedirectedDomain({nginxFolder: nginxFolder, domain: "example.com", port: 3000, useSSL: true})

            let filename = Path.join(nginxFolder, "sites-available", "example.com.conf");
            expect(fs.existsSync(filename)).to.be.true;
            const contents = await readFile(filename)
            expect(contents).to.contain("server_name example.com")
            expect(contents).to.contain("listen 80")

        });
        it('should not create existing.com.conf , if the same file already exists', async () => {

            const nginxFolder = Path.join(getHomeFolder() , "test/resources/nginx") ;
            const  {message} =await createRedirectedDomain({nginxFolder: nginxFolder, domain: "existing.com", port: 3000, useSSL: true})

            expect(message).to.be.equal("Site already exists existing.com with 3000")


        });
        it('When we have a different redirect port , should update existingdifferentport.com.conf  ', async () => {


            // copy the contents of testexistingdifferentport.com.conf to existingdifferentport.com.conf
            fs.copyFileSync(Path.join(getHomeFolder() , "test/resources/nginx/sites-available/testexistingdifferentport.com.conf"),Path.join(getHomeFolder() , "test/resources/nginx/sites-available/existingdifferentport.com.conf"))

            const nginxFolder = Path.join(getHomeFolder() , "test/resources/nginx") ;
            const  {message} =await createRedirectedDomain({nginxFolder: nginxFolder, domain: "existingdifferentport.com", port: 7000, useSSL: true})

            expect(message).to.be.equal("Site already exists existingdifferentport.com with 3000 changed port to 7000")


        });
});