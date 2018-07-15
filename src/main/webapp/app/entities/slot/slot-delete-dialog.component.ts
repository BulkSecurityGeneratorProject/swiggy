import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { Slot } from './slot.model';
import { SlotPopupService } from './slot-popup.service';
import { SlotService } from './slot.service';

@Component({
    selector: 'jhi-slot-delete-dialog',
    templateUrl: './slot-delete-dialog.component.html'
})
export class SlotDeleteDialogComponent {

    slot: Slot;

    constructor(
        private slotService: SlotService,
        public activeModal: NgbActiveModal,
        private eventManager: JhiEventManager
    ) {
    }

    clear() {
        this.activeModal.dismiss('cancel');
    }

    confirmDelete(id: number) {
        this.slotService.delete(id).subscribe((response) => {
            this.eventManager.broadcast({
                name: 'slotListModification',
                content: 'Deleted an slot'
            });
            this.activeModal.dismiss(true);
        });
    }
}

@Component({
    selector: 'jhi-slot-delete-popup',
    template: ''
})
export class SlotDeletePopupComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private slotPopupService: SlotPopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            this.slotPopupService
                .open(SlotDeleteDialogComponent as Component, params['id']);
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
