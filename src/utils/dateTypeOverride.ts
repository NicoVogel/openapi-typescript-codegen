import { Model } from '../client/interfaces/Model';

const formatDate = ['date', 'date-time'];
/**
 * Change Model.base if it is a string and has the format 'date-time'
 * @param properties Array of Models
 */
export function dateTypeOverride(properties: Model[]): Model[] {
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
}
