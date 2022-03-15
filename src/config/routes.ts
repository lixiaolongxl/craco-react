import asyncComponent from '@utils/asyncComponent';

// const Create = asyncComponent(() => import("../views/create/index"));
// const Import = asyncComponent(() => import("../views/import/index"));

export const routerList = [
    {
        name: 'Create Project',
        path: '/home/create',
        // component: Create
    },
    {
        name: 'Import Project',
        path: '/home/import',
        // component: Import
    },
    {
        to: '/home/create',
        from: '/home'
    }
]