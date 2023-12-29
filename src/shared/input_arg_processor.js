import {hideBin} from 'yargs/helpers';
import yargs from 'yargs/yargs';
import inquirer from "inquirer";


export function hasAllOptionsSet(existingargv, cliOptions) {

    return Object.entries(cliOptions)
        .filter(([key, value]) => value.demandOption)
        .map(([key, value]) => key)
        .every(key => existingargv.hasOwnProperty(key))

}

export function getDefaultValues(cliOptions) {

    return Object.entries(cliOptions)
        .filter(([key, value]) => Object.hasOwn(value, "default"))
        .map(([key, value]) => {
            return {[key]: value.default}
        }).reduce((acc, curr) => {
            return {...acc, ...curr}
        });


}

async function getInteractiveInputs(cliOptions) {
    const answers = await inquirer.prompt(Object.values(cliOptions));
    Object.entries(answers).forEach(([key, value]) => {
        value && process.argv.push(`--${key}`, value);
    });
    return yargs(hideBin(process.argv))
        .usage('Usage: npx $0')
        .options(cliOptions)
        .parseSync();
}

export function hasHelpOrVersion(processArgs) {
    return processArgs
            .slice(2)
            .filter(arg =>arg.indexOf("help") > 0 || arg.indexOf("version") > 0)
            .length > 0;
}

export async function getParametersBasedOnOptions(processArgs, cliOptions) {


    if (hasHelpOrVersion(processArgs)) {
        yargs(hideBin(processArgs)).usage('Usage: npx $0').options(cliOptions).help().version().argv;
        return
    }


    let inputs = yargs(hideBin(processArgs)).argv;

    if (hasAllOptionsSet(inputs, cliOptions) === false) {
        inputs = await getInteractiveInputs(cliOptions);
    }


    const defaultValues = getDefaultValues(cliOptions);
    const formattedInputs = {...defaultValues, ...inputs}
    for (const key in inputs) {
        if (defaultValues.hasOwnProperty(key)) {
            const defaultValue = defaultValues[key];
            const inputValue = inputs[key];

            if (typeof defaultValue === 'boolean') {
                formattedInputs[key] = Boolean(inputValue);
            } else if (typeof defaultValue === 'number') {
                formattedInputs[key] = Number(inputValue);
            } else {
                formattedInputs[key] = inputValue;
            }
        }
    }
    return formattedInputs;
}

