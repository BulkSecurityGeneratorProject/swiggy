import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { CircuitSharedModule } from '../../shared';
import {
    SlotService,
    SlotPopupService,
    SlotComponent,
    SlotDetailComponent,
    SlotDialogComponent,
    SlotPopupComponent,
    SlotDeletePopupComponent,
    SlotDeleteDialogComponent,
    slotRoute,
    slotPopupRoute,
} from './';

const ENTITY_STATES = [
    ...slotRoute,
    ...slotPopupRoute,
];

@NgModule({
    imports: [
        CircuitSharedModule,
        RouterModule.forChild(ENTITY_STATES)
    ],
    declarations: [
        SlotComponent,
        SlotDetailComponent,
        SlotDialogComponent,
        SlotDeleteDialogComponent,
        SlotPopupComponent,
        SlotDeletePopupComponent,
    ],
    entryComponents: [
        SlotComponent,
        SlotDialogComponent,
        SlotPopupComponent,
        SlotDeleteDialogComponent,
        SlotDeletePopupComponent,
    ],
    providers: [
        SlotService,
        SlotPopupService,
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class CircuitSlotModule {}
