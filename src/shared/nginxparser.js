

import fs from 'fs';
export function getPortNumber(fileContents) {
    try {
        const portRegex = /proxy_pass http:\/\/(?:localhost|127\.0\.0\.1):(\d+);/;
        const portMatch = fileContents.match(portRegex);
        if (portMatch && portMatch.length > 1) {
            return parseInt(portMatch[1], 10);
        }
        return null;
    } catch (error) {
        console.error("An error occurred while getting the port number: ", error);
        return null;
    }
}



export function getPortNumberFromFile(filename) {
    try {
        const fileContents = fs.readFileSync(filename, 'utf-8');
        return getPortNumber(fileContents);
    } catch (error) {
        console.error("An error occurred while getting the port number from the file: ", error);
        return null;
    }
}

export function updatePortNumber(fileContents, newPort) {
    try {
        const portRegex = /(proxy_pass http:\/\/(?:localhost|127\.0\.0\.1):)(\d+)(;)/;
        const updatedFileContents = fileContents.replace(portRegex, `$1${newPort}$3`);
        return updatedFileContents;
    } catch (error) {
        console.error("An error occurred while updating the port number: ", error);
        return null;
    }
}