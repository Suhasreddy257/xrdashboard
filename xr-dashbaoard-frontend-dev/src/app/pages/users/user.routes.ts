import { Routes } from '@angular/router';

export default [
    { path: 'usertable', data: { breadcrumb: 'Users List' }, loadComponent: () => import('./user-table').then((c) => c.UsersTable) },
    { path: 'user-new', data: { breadcrumb: 'New User' }, loadComponent: () => import('./user-new').then((c) => c.NewUser) },
    { path: 'user-edit', data: { breadcrumb: 'Edit User' }, loadComponent: () => import('./user-edit').then((c) => c.EditUser) },
    { path: 'user-import', data: { breadcrumb: 'Import User' }, loadComponent: () => import('./user-import').then((c) => c.ImportUser) },
    { path: 'user-export', data: { breadcrumb: 'Export User' }, loadComponent: () => import('./user-export').then((c) => c.ExportUser) },
    { path: '**', redirectTo: '/notfound' }
] as Routes;
