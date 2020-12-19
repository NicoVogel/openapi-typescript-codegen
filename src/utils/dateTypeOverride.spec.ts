import type { Model } from '../client/interfaces/Model';

describe('dateTypeOverride', () => {
    it('sucess', async () => {

    });
});

type ModelOnlyName = { name: string };

const baseModel: Omit<RequiredFields<ModelOnlyName>, 'export' | 'base' | 'name'> = {
    link: null,
    properties: [],
};

const models: RequiredFields<ModelOnlyName>[] = [
    {
        ...baseModel,
        name: 'ParentType',
        export: 'interface',
        base: 'any',
        properties: [
            {
                ...baseModel,
                name: 'name',
                export: 'interface',
                base: 'any',
            },
        ],
    },
    {
        ...baseModel,
        name: 'ExampleType',
        export: 'interface',
        base: 'any',
        properties: [
            {
                ...baseModel,
                name: 'id',
                export: 'generic',
                base: 'number',
            },
            {
                ...baseModel,
                name: 'dateTime',
                export: 'generic',
                base: 'string',
                format: 'date-time',
            },
            {
                ...baseModel,
                name: 'date',
                export: 'generic',
                base: 'string',
                format: 'date',
            },
            {
                ...baseModel,
                name: 'dateTimeNullable',
                export: 'generic',
                base: 'string',
                format: 'date',
            },
            {
                ...baseModel,
                name: 'dateNullable',
                export: 'generic',
                base: 'string',
                format: 'date',
            },
        ],
    },
    {
        ...baseModel,
        name: 'InheritType',
        export: 'all-of',
        base: 'any',
        properties: [
            {
                ...baseModel,
                name: '',
                export: 'reference',
                base: 'ParentType',
            },
            {
                ...baseModel,
                name: '',
                export: 'reference',
                base: 'ExampleType',
            },
        ],
    },
    {
        ...baseModel,
        name: 'WrappedInArray',
        export: 'array',
        base: 'any',
        link: {
            ...baseModel,
            name: '',
            export: 'interface',
            base: 'any',
            properties: [
                {
                    ...baseModel,
                    name: 'dateTime',
                    export: 'generic',
                    base: 'string',
                    format: 'date-time',
                },
                {
                    ...baseModel,
                    name: 'date',
                    export: 'generic',
                    base: 'string',
                    format: 'date',
                },
                {
                    ...baseModel,
                    name: 'dateTimeNullable',
                    export: 'generic',
                    base: 'string',
                    format: 'date',
                },
                {
                    ...baseModel,
                    name: 'dateNullable',
                    export: 'generic',
                    base: 'string',
                    format: 'date',
                },
            ],
        },
    },
];
