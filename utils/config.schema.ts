import { Ajv, Schema } from 'ajv';
const ajv = new Ajv();

export interface Configuration {
    environnement: string,
    version: number,
    subversion: number,
    deploys: Array<string>,
}

const ConfigurationSchema: Schema = {
    type: 'object',
    properties: {
        environnement : { type: "string", nullable: false },
        version       : { type: "integer" },
        subversion    : { type: "integer" },
        deploys       : {
            type: "array",
            items: {
                type: "string",
            }
        }
    },
    required: [
        "environnement",
        "version",
        "subversion",
        "deploys",
    ],
    additionalProperties: false,
};

export const ConfigurationValidation = ajv.compile(ConfigurationSchema);
