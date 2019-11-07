import { Model } from '../../../client/interfaces/Model';
import { OpenApi } from '../interfaces/OpenApi';

/**
 * Get the OpenAPI models.
 */
export function getModels(openApi: OpenApi): Map<string, Model> {
    const models: Map<string, Model> = new Map<string, Model>();

    // Iterate over the definitions
    const { definitions } = openApi;
    for (const definitionName in definitions) {
        if (definitions.hasOwnProperty(definitionName)) {
            // const definition: OpenApiSchema = openApi.definitions[definitionName];
            // const required: string[] = definition.required || [];
            // const modelClass: Type = getType(definitionName);
            // Check if we haven't already parsed the model
            // if (!models.has(modelClass.base)) {
            // // Create a new model object
            // const model: Model = {
            //     name: modelClass.base,
            //     base: modelClass.base,
            //     type: modelClass.type,
            //     template: getModelTemplate(modelClass),
            //     description: null,
            //     extends: [],
            //     imports: [],
            //     properties: [],
            //     enums: [],
            // };
            //
            // const properties = definition.properties;
            // for (const propertyName in properties) {
            //     if (properties.hasOwnProperty(propertyName)) {
            //         const property = properties[propertyName];
            //         const propertyRequired = required.includes(propertyName);
            //         getModelProperty(propertyName, property);
            //     }
            // }
            //
            // models.set(modelClass.base, model);
            // }
        }
    }

    return models;
}
