/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async } from '@angular/core/testing';
import { Observable } from 'rxjs/Observable';
import { HttpHeaders, HttpResponse } from '@angular/common/http';

import { CircuitTestModule } from '../../../test.module';
import { SlotComponent } from '../../../../../../main/webapp/app/entities/slot/slot.component';
import { SlotService } from '../../../../../../main/webapp/app/entities/slot/slot.service';
import { Slot } from '../../../../../../main/webapp/app/entities/slot/slot.model';

describe('Component Tests', () => {

    describe('Slot Management Component', () => {
        let comp: SlotComponent;
        let fixture: ComponentFixture<SlotComponent>;
        let service: SlotService;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [CircuitTestModule],
                declarations: [SlotComponent],
                providers: [
                    SlotService
                ]
            })
            .overrideTemplate(SlotComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(SlotComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(SlotService);
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN
                const headers = new HttpHeaders().append('link', 'link;link');
                spyOn(service, 'query').and.returnValue(Observable.of(new HttpResponse({
                    body: [new Slot(123)],
                    headers
                })));

                // WHEN
                comp.ngOnInit();

                // THEN
                expect(service.query).toHaveBeenCalled();
                expect(comp.slots[0]).toEqual(jasmine.objectContaining({id: 123}));
            });
        });
    });

});
