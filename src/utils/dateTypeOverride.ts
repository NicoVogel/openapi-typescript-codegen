import { Model } from '../client/interfaces/Model';

const formatDate = ['date', 'date-time'];
/**
 * Change Model.base if it is a string and has the format 'date-time'
 * @param properties Array of Models
 */
export function dateTypeOverride(properties: Model[]): Model[] {
    return properties.map(property => {
        if (property.export === 'interface') {
            const properties = dateTypeOverride(property.properties);
            return { ...property, properties };
        }

        if (property.export === 'array') {
            const link = cloneObject(property.link);
            if (link !== null) {
                link.properties = dateTypeOverride(link.properties);
            }
            return { ...property, link };
        }

        if (property.base !== 'string' || property.format === undefined) {
            return { ...property };
        }

        let base = property.base;
        if (formatDate.includes(property.format)) {
            base = 'Date';
        }

        return { ...property, base };
    });
}

function cloneObject<T>(object: T): T {
    return { ...object };
}
