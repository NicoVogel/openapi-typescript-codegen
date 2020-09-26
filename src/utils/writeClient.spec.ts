import { Client } from '../client/interfaces/Client';
import { HttpClient } from '../index';
import { mkdir, rmdir, writeFile } from './fileSystem';
import { Templates } from './registerHandlebarTemplates';
import { writeClient } from './writeClient';

jest.mock('./fileSystem');

describe('writeClient', () => {
    it('should write to filesystem', async () => {
        const client: Client = {
            server: 'http://localhost:8080',
            version: 'v1',
            models: [],
            services: [],
        };

        const templates: Templates = {
            index: () => 'index',
            exports: {
                model: () => 'model',
                schema: () => 'schema',
                service: () => 'service',
            },
            core: {
                settings: () => 'settings',
                getFormData: () => 'getFormData',
                getQueryString: () => 'getQueryString',
                getUrl: () => 'getUrl',
                isSuccess: () => 'isSuccess',
                catchGenericError: () => 'catchGenericError',
                request: () => 'request',
                requestOptions: () => 'requestOptions',
                requestUsingFetch: () => 'requestUsingFetch',
                requestUsingXHR: () => 'requestUsingXHR',
                requestUsingNode: () => 'requestUsingNode',
                response: () => 'response',
                responseError: () => 'responseError',
            },
        };

        await writeClient(client, templates, './dist', HttpClient.FETCH, false, false, true, true, true, true);

        expect(rmdir).toBeCalled();
        expect(mkdir).toBeCalled();
        expect(writeFile).toBeCalled();
    });
});
