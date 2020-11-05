import { fstat, writeFileSync } from 'fs';
import * as path from 'path';

import type { Model } from '../client/interfaces/Model';
import { HttpClient } from '../index';
import { writeFile } from './fileSystem';
import { format } from './format';
import { Templates } from './registerHandlebarTemplates';

/**
 * Generate Models using the Handlebar template and write to disk.
 * @param models Array of Models to write
 * @param templates The loaded handlebar templates
 * @param outputPath Directory to write the generated files to
 * @param httpClient The selected httpClient (fetch, xhr or node)
 * @param useUnionTypes Use union types instead of enums
 */
export async function writeClientModels(models: Model[], templates: Templates, outputPath: string, httpClient: HttpClient, useUnionTypes: boolean, useDateType: boolean): Promise<void> {
    if (useDateType) {
        models = dateTypeOverride(models);
    }
    for (const model of models) {
        const file = path.resolve(outputPath, `${model.name}.ts`);
        const templateResult = templates.exports.model({
            ...model,
            httpClient,
            useUnionTypes,
        });
        await writeFile(file, format(templateResult));
    }
}

const formatDate = ['date', 'date-time'];
function dateTypeOverride(properties: Model[]): Model[] {
    return properties.map(prop => {
        if (prop.export === 'interface') {
            prop.properties = dateTypeOverride(prop.properties);
            return prop;
        }
        if (prop.export === 'array') {
            if (prop.link !== null) {
                prop.link.properties = dateTypeOverride(prop.link.properties);
            }
            return prop;
        }
        if (prop.format === undefined) {
            return prop;
        }
        if (formatDate.includes(prop.format)) {
            prop.base = 'Date';
        }
        return prop;
    });
};
