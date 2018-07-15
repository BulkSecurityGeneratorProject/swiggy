import { Routes } from '@angular/router';

import { UserRouteAccessService } from '../../shared';
import { SlotComponent } from './slot.component';
import { SlotDetailComponent } from './slot-detail.component';
import { SlotPopupComponent } from './slot-dialog.component';
import { SlotDeletePopupComponent } from './slot-delete-dialog.component';

export const slotRoute: Routes = [
    {
        path: 'slot',
        component: SlotComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'circuitApp.slot.home.title'
        },
        canActivate: [UserRouteAccessService]
    }, {
        path: 'slot/:id',
        component: SlotDetailComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'circuitApp.slot.home.title'
        },
        canActivate: [UserRouteAccessService]
    }
];

export const slotPopupRoute: Routes = [
    {
        path: 'slot-new',
        component: SlotPopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'circuitApp.slot.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'slot/:id/edit',
        component: SlotPopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'circuitApp.slot.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'slot/:id/delete',
        component: SlotDeletePopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'circuitApp.slot.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    }
];
