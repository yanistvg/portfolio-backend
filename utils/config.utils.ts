import * as cdk from 'aws-cdk-lib';
import * as fs from 'fs';

import { Configuration, ConfigurationValidation } from "./config.schema";

/* Define all parameters to used this programm and they values */
const PARAMETER_ENV: string = "env" as const;

const PARAMETERS_VALUES: { [param: string]: Array<string> } = {
    [PARAMETER_ENV]: ['dev', 'prd'],
}

const CONFIG_FOLDER_PARAM_FOLDER: string = "##FOLDER###" as const;
const CONFIG_FOLDER_PARAM_PREFIX: string = "###PREFIX###" as const;
const CONFIG_FOLDER: string = `configs/${CONFIG_FOLDER_PARAM_FOLDER}/${CONFIG_FOLDER_PARAM_PREFIX}.conf.json`;

/**
 * showCmdUsage used to show the manual for this programm
 */
export function showCmdUsage() {
    console.error("usage :");
    console.error("\t-c env=<dev | prd> : select deployement environnement (REQUIRED)");
}

/**
 * getConfigsFromCmd use the commande env parameter to extract
 * JSON file
 * 
 * @param app
 * @returns configuration extracted from JSON file in fonction
 * of parameter env in command
 * @version 1.0
 */
export function getConfigsFromCmd(app: cdk.App): Configuration {
    const configName: string | undefined = app.node.tryGetContext(PARAMETER_ENV);
    
    if (!configName || !PARAMETERS_VALUES[PARAMETER_ENV].includes(configName))
        throw new Error(`Can't get ${PARAMETER_ENV} parameter or bad value`);

    const configFile = CONFIG_FOLDER
        .replace(CONFIG_FOLDER_PARAM_FOLDER, configName)
        .replace(CONFIG_FOLDER_PARAM_PREFIX, configName)
    ;

    let confData: Configuration;
    try {
        confData = JSON.parse(fs.readFileSync(configFile, 'utf8'));
    } catch(e) {
        throw new Error(`Error during extraction of configuration into config file : ${e}`);
    }

    if (!ConfigurationValidation(confData)) {
        throw new Error(`Can't validate configuration schema : ${JSON.stringify(ConfigurationValidation.errors)}`);
    }

    return confData;
}
