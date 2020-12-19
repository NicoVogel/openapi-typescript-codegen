import { Model } from '../client/interfaces/Model.d';

const formatDate = ['date-time'];
/**
 * Change Model.base if it is a string and has the format 'date-time'
 * @param models Array of Models
 */
export function dateTypeOverride(models: Model[]): Model[] {
    return models.map(model => {
        if (model.export === 'interface') {
            return { ...model, properties: dateTypeOverride(model.properties) };
        }

        if (model.export === 'array') {
            if (model.link !== null) {
                const link = cloneObject(model.link);
                link.properties = dateTypeOverride(link.properties);
                return { ...model, link };
            }
            return { ...model };
        }

        if (model.base !== 'string' || model.format === undefined) {
            return { ...model };
        }

        let base = model.base;
        if (formatDate.includes(model.format)) {
            base = 'Date';
        }

        return { ...model, base };
    });
}

function cloneObject<T>(object: T): T {
    return { ...object };
}
