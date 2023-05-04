import { Routes } from '@angular/router';

export const FullLayout_ROUTES: Routes = [
    {
        path: 'tax',
        loadChildren: () => import('../../page/tax.module').then(m => m.TaxModule),
    } 
];