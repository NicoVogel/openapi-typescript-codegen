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
    for (const model of models) {
        const file = path.resolve(outputPath, `${model.name}.ts`);
        if (useDateType) {
            console.log('start type conversion');
            model.properties = conditionalTypeOverride(model.properties);
        }
        const templateResult = templates.exports.model({
            ...model,
            httpClient,
            useUnionTypes,
        });
        await writeFile(file, format(templateResult));
    }
}

const formatDate = ['date', 'date-time'];
const conditionalTypeOverride = (properties: Model[]): Model[] => {
    return properties.map(model => {
        if (model.name === 'ElementItem') {
            console.log(model);
        }
        if (model.properties.length > 0) {
            console.log({ text: 'has children', name: model.name });
            model.properties = conditionalTypeOverride(model.properties);
        }
        // if (model.export !== 'interface') {
        //     return model;
        // }
        if (model.format === undefined) {
            return model;
        }
        if (formatDate.includes(model.format)) {
            console.log({ text: 'has format', model });
            return { ...model, type: 'Date' };
        }
        return model;
    });
};
