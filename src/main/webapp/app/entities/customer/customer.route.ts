import { Routes } from '@angular/router';

import { UserRouteAccessService } from '../../shared';
import { CustomerComponent } from './customer.component';
import { CustomerDetailComponent } from './customer-detail.component';
import { CustomerPopupComponent } from './customer-dialog.component';
import { CustomerDeletePopupComponent } from './customer-delete-dialog.component';

export const customerRoute: Routes = [
    {
        path: 'customer',
        component: CustomerComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'circuitApp.customer.home.title'
        },
        canActivate: [UserRouteAccessService]
    }, {
        path: 'customer/:id',
        component: CustomerDetailComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'circuitApp.customer.home.title'
        },
        canActivate: [UserRouteAccessService]
    }
];

export const customerPopupRoute: Routes = [
    {
        path: 'customer-new',
        component: CustomerPopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'circuitApp.customer.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'customer/:id/edit',
        component: CustomerPopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'circuitApp.customer.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'customer/:id/delete',
        component: CustomerDeletePopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'circuitApp.customer.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    }
];
