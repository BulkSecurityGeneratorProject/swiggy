import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';

import { Observable } from 'rxjs/Observable';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager, JhiAlertService } from 'ng-jhipster';

import { Restaurant } from './restaurant.model';
import { RestaurantPopupService } from './restaurant-popup.service';
import { RestaurantService } from './restaurant.service';
import { Customer, CustomerService } from '../customer';

@Component({
    selector: 'jhi-restaurant-dialog',
    templateUrl: './restaurant-dialog.component.html'
})
export class RestaurantDialogComponent implements OnInit {

    restaurant: Restaurant;
    isSaving: boolean;

    customers: Customer[];

    constructor(
        public activeModal: NgbActiveModal,
        private jhiAlertService: JhiAlertService,
        private restaurantService: RestaurantService,
        private customerService: CustomerService,
        private eventManager: JhiEventManager
    ) {
    }

    ngOnInit() {
        this.isSaving = false;
        this.customerService.query()
            .subscribe((res: HttpResponse<Customer[]>) => { this.customers = res.body; }, (res: HttpErrorResponse) => this.onError(res.message));
    }

    clear() {
        this.activeModal.dismiss('cancel');
    }

    save() {
        this.isSaving = true;
        if (this.restaurant.id !== undefined) {
            this.subscribeToSaveResponse(
                this.restaurantService.update(this.restaurant));
        } else {
            this.subscribeToSaveResponse(
                this.restaurantService.create(this.restaurant));
        }
    }

    private subscribeToSaveResponse(result: Observable<HttpResponse<Restaurant>>) {
        result.subscribe((res: HttpResponse<Restaurant>) =>
            this.onSaveSuccess(res.body), (res: HttpErrorResponse) => this.onSaveError());
    }

    private onSaveSuccess(result: Restaurant) {
        this.eventManager.broadcast({ name: 'restaurantListModification', content: 'OK'});
        this.isSaving = false;
        this.activeModal.dismiss(result);
    }

    private onSaveError() {
        this.isSaving = false;
    }

    private onError(error: any) {
        this.jhiAlertService.error(error.message, null, null);
    }

    trackCustomerById(index: number, item: Customer) {
        return item.id;
    }

    getSelected(selectedVals: Array<any>, option: any) {
        if (selectedVals) {
            for (let i = 0; i < selectedVals.length; i++) {
                if (option.id === selectedVals[i].id) {
                    return selectedVals[i];
                }
            }
        }
        return option;
    }
}

@Component({
    selector: 'jhi-restaurant-popup',
    template: ''
})
export class RestaurantPopupComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private restaurantPopupService: RestaurantPopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            if ( params['id'] ) {
                this.restaurantPopupService
                    .open(RestaurantDialogComponent as Component, params['id']);
            } else {
                this.restaurantPopupService
                    .open(RestaurantDialogComponent as Component);
            }
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
