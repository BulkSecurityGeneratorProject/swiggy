import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { Subscription } from 'rxjs/Subscription';
import { JhiEventManager, JhiAlertService } from 'ng-jhipster';

import { Restaurant } from './restaurant.model';
import { RestaurantService } from './restaurant.service';
import { Principal } from '../../shared';

@Component({
    selector: 'jhi-restaurant',
    templateUrl: './restaurant.component.html'
})
export class RestaurantComponent implements OnInit, OnDestroy {
restaurants: Restaurant[];
    currentAccount: any;
    eventSubscriber: Subscription;

    constructor(
        private restaurantService: RestaurantService,
        private jhiAlertService: JhiAlertService,
        private eventManager: JhiEventManager,
        private principal: Principal
    ) {
    }

    loadAll() {
        this.restaurantService.query().subscribe(
            (res: HttpResponse<Restaurant[]>) => {
                this.restaurants = res.body;
            },
            (res: HttpErrorResponse) => this.onError(res.message)
        );
    }
    ngOnInit() {
        this.loadAll();
        this.principal.identity().then((account) => {
            this.currentAccount = account;
        });
        this.registerChangeInRestaurants();
    }

    ngOnDestroy() {
        this.eventManager.destroy(this.eventSubscriber);
    }

    trackId(index: number, item: Restaurant) {
        return item.id;
    }
    registerChangeInRestaurants() {
        this.eventSubscriber = this.eventManager.subscribe('restaurantListModification', (response) => this.loadAll());
    }

    private onError(error) {
        this.jhiAlertService.error(error.message, null, null);
    }
}
