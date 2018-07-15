import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';

import { CircuitSlotModule } from './slot/slot.module';
import { CircuitCustomerModule } from './customer/customer.module';
import { CircuitRestaurantModule } from './restaurant/restaurant.module';
/* jhipster-needle-add-entity-module-import - JHipster will add entity modules imports here */

@NgModule({
    imports: [
        CircuitSlotModule,
        CircuitCustomerModule,
        CircuitRestaurantModule,
        /* jhipster-needle-add-entity-module - JHipster will add entity modules here */
    ],
    declarations: [],
    entryComponents: [],
    providers: [],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class CircuitEntityModule {}
