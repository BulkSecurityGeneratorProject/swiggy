/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';

import { CircuitTestModule } from '../../../test.module';
import { SlotDetailComponent } from '../../../../../../main/webapp/app/entities/slot/slot-detail.component';
import { SlotService } from '../../../../../../main/webapp/app/entities/slot/slot.service';
import { Slot } from '../../../../../../main/webapp/app/entities/slot/slot.model';

describe('Component Tests', () => {

    describe('Slot Management Detail Component', () => {
        let comp: SlotDetailComponent;
        let fixture: ComponentFixture<SlotDetailComponent>;
        let service: SlotService;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [CircuitTestModule],
                declarations: [SlotDetailComponent],
                providers: [
                    SlotService
                ]
            })
            .overrideTemplate(SlotDetailComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(SlotDetailComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(SlotService);
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN

                spyOn(service, 'find').and.returnValue(Observable.of(new HttpResponse({
                    body: new Slot(123)
                })));

                // WHEN
                comp.ngOnInit();

                // THEN
                expect(service.find).toHaveBeenCalledWith(123);
                expect(comp.slot).toEqual(jasmine.objectContaining({id: 123}));
            });
        });
    });

});
