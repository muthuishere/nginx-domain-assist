import * as fs from "fs";

export async function  writeFile( path ,  content ) {


    return new Promise((resolve, reject) => {
        fs.writeFile(path, content, err => {
            if (err) {
                reject(err);
            }
            resolve();
            // file written successfully
        });
    })



}

export async function readFile(filename) {

    return new Promise((resolve, reject) => {
        fs.readFile( filename,"utf8", function(err, data) {

            if (err) {
                reject(err) ;
            }
            resolve(data);

        });
    });


}
export async function deleteFile(filename) {

    return new Promise((resolve, reject) => {


        try {
            const res  = fs.rmSync(filename, {
                force: true,
            });

            if(undefined === res){
                reject("file not exist");
            }

            resolve(res);
        }catch (e) {
            reject(e);
        }



    });


}
export async function createFolder(path) {

    return new Promise((resolve, reject) => {

        if (fs.existsSync(path)){
            resolve();
        }

        fs.mkdir(path, { recursive: true }, (err) => {
            if (err) {
                reject(err) ;
            }
            resolve();
        });



    });


}


export async function createSymbolicLink(path,link) {

    return new Promise((resolve, reject) => {

        if (fs.existsSync(link)){
            resolve();
        }


        fs.symlink(link, path, "file", err => {
            if (err) {
                reject(err) ;
            }
            resolve();
        });

    });


}


