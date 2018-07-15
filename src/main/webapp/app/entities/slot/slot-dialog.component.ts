import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';

import { Observable } from 'rxjs/Observable';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { Slot } from './slot.model';
import { SlotPopupService } from './slot-popup.service';
import { SlotService } from './slot.service';

@Component({
    selector: 'jhi-slot-dialog',
    templateUrl: './slot-dialog.component.html'
})
export class SlotDialogComponent implements OnInit {

    slot: Slot;
    isSaving: boolean;

    constructor(
        public activeModal: NgbActiveModal,
        private slotService: SlotService,
        private eventManager: JhiEventManager
    ) {
    }

    ngOnInit() {
        this.isSaving = false;
    }

    clear() {
        this.activeModal.dismiss('cancel');
    }

    save() {
        this.isSaving = true;
        if (this.slot.id !== undefined) {
            this.subscribeToSaveResponse(
                this.slotService.update(this.slot));
        } else {
            this.subscribeToSaveResponse(
                this.slotService.create(this.slot));
        }
    }

    private subscribeToSaveResponse(result: Observable<HttpResponse<Slot>>) {
        result.subscribe((res: HttpResponse<Slot>) =>
            this.onSaveSuccess(res.body), (res: HttpErrorResponse) => this.onSaveError());
    }

    private onSaveSuccess(result: Slot) {
        this.eventManager.broadcast({ name: 'slotListModification', content: 'OK'});
        this.isSaving = false;
        this.activeModal.dismiss(result);
    }

    private onSaveError() {
        this.isSaving = false;
    }
}

@Component({
    selector: 'jhi-slot-popup',
    template: ''
})
export class SlotPopupComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private slotPopupService: SlotPopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            if ( params['id'] ) {
                this.slotPopupService
                    .open(SlotDialogComponent as Component, params['id']);
            } else {
                this.slotPopupService
                    .open(SlotDialogComponent as Component);
            }
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
