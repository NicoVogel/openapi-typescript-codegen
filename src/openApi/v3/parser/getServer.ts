import type { OpenApi } from '../interfaces/OpenApi';

export function getServer(openApi: OpenApi): string {
    const server = openApi.servers && openApi.servers[0];
    const variables = (server && server.variables) || {};
    let url = (server && server.url) || '';
    for (const variable in variables) {
        if (variables.hasOwnProperty(variable)) {
            url = url.replace(`{${variable}}`, variables[variable].default);
        }
    }
    return url;
}
