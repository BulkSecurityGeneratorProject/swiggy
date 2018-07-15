import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse } from '@angular/common/http';
import { Subscription } from 'rxjs/Subscription';
import { JhiEventManager } from 'ng-jhipster';

import { Slot } from './slot.model';
import { SlotService } from './slot.service';

@Component({
    selector: 'jhi-slot-detail',
    templateUrl: './slot-detail.component.html'
})
export class SlotDetailComponent implements OnInit, OnDestroy {

    slot: Slot;
    private subscription: Subscription;
    private eventSubscriber: Subscription;

    constructor(
        private eventManager: JhiEventManager,
        private slotService: SlotService,
        private route: ActivatedRoute
    ) {
    }

    ngOnInit() {
        this.subscription = this.route.params.subscribe((params) => {
            this.load(params['id']);
        });
        this.registerChangeInSlots();
    }

    load(id) {
        this.slotService.find(id)
            .subscribe((slotResponse: HttpResponse<Slot>) => {
                this.slot = slotResponse.body;
            });
    }
    previousState() {
        window.history.back();
    }

    ngOnDestroy() {
        this.subscription.unsubscribe();
        this.eventManager.destroy(this.eventSubscriber);
    }

    registerChangeInSlots() {
        this.eventSubscriber = this.eventManager.subscribe(
            'slotListModification',
            (response) => this.load(this.slot.id)
        );
    }
}
