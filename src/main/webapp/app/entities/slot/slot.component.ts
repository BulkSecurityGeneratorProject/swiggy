import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { Subscription } from 'rxjs/Subscription';
import { JhiEventManager, JhiAlertService } from 'ng-jhipster';

import { Slot } from './slot.model';
import { SlotService } from './slot.service';
import { Principal } from '../../shared';

@Component({
    selector: 'jhi-slot',
    templateUrl: './slot.component.html'
})
export class SlotComponent implements OnInit, OnDestroy {
slots: Slot[];
    currentAccount: any;
    eventSubscriber: Subscription;

    constructor(
        private slotService: SlotService,
        private jhiAlertService: JhiAlertService,
        private eventManager: JhiEventManager,
        private principal: Principal
    ) {
    }

    loadAll() {
        this.slotService.query().subscribe(
            (res: HttpResponse<Slot[]>) => {
                this.slots = res.body;
            },
            (res: HttpErrorResponse) => this.onError(res.message)
        );
    }
    ngOnInit() {
        this.loadAll();
        this.principal.identity().then((account) => {
            this.currentAccount = account;
        });
        this.registerChangeInSlots();
    }

    ngOnDestroy() {
        this.eventManager.destroy(this.eventSubscriber);
    }

    trackId(index: number, item: Slot) {
        return item.id;
    }
    registerChangeInSlots() {
        this.eventSubscriber = this.eventManager.subscribe('slotListModification', (response) => this.loadAll());
    }

    private onError(error) {
        this.jhiAlertService.error(error.message, null, null);
    }
}
