import * as fs from 'fs';
import * as path from 'path';
import { Client } from '../client/interfaces/Client';
import { HttpClient, Language } from '../index';
import { Templates } from './readHandlebarsTemplates';
import { getFileName } from './getFileName';

export function writeClientSettings(client: Client, language: Language, httpClient: HttpClient, templates: Templates, outputPath: string): void {
    const fileName = getFileName('OpenAPI', language);
    try {
        fs.writeFileSync(
            path.resolve(outputPath, fileName),
            templates.settings({
                language,
                httpClient,
                server: client.server,
                version: client.version,
            })
        );
    } catch (e) {
        throw new Error(`Could not write settings: "${fileName}"`);
    }
}
