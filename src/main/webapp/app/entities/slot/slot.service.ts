import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { SERVER_API_URL } from '../../app.constants';

import { Slot } from './slot.model';
import { createRequestOption } from '../../shared';

export type EntityResponseType = HttpResponse<Slot>;

@Injectable()
export class SlotService {

    private resourceUrl =  SERVER_API_URL + 'api/slots';

    constructor(private http: HttpClient) { }

    create(slot: Slot): Observable<EntityResponseType> {
        const copy = this.convert(slot);
        return this.http.post<Slot>(this.resourceUrl, copy, { observe: 'response' })
            .map((res: EntityResponseType) => this.convertResponse(res));
    }

    update(slot: Slot): Observable<EntityResponseType> {
        const copy = this.convert(slot);
        return this.http.put<Slot>(this.resourceUrl, copy, { observe: 'response' })
            .map((res: EntityResponseType) => this.convertResponse(res));
    }

    find(id: number): Observable<EntityResponseType> {
        return this.http.get<Slot>(`${this.resourceUrl}/${id}`, { observe: 'response'})
            .map((res: EntityResponseType) => this.convertResponse(res));
    }

    query(req?: any): Observable<HttpResponse<Slot[]>> {
        const options = createRequestOption(req);
        return this.http.get<Slot[]>(this.resourceUrl, { params: options, observe: 'response' })
            .map((res: HttpResponse<Slot[]>) => this.convertArrayResponse(res));
    }

    delete(id: number): Observable<HttpResponse<any>> {
        return this.http.delete<any>(`${this.resourceUrl}/${id}`, { observe: 'response'});
    }

    private convertResponse(res: EntityResponseType): EntityResponseType {
        const body: Slot = this.convertItemFromServer(res.body);
        return res.clone({body});
    }

    private convertArrayResponse(res: HttpResponse<Slot[]>): HttpResponse<Slot[]> {
        const jsonResponse: Slot[] = res.body;
        const body: Slot[] = [];
        for (let i = 0; i < jsonResponse.length; i++) {
            body.push(this.convertItemFromServer(jsonResponse[i]));
        }
        return res.clone({body});
    }

    /**
     * Convert a returned JSON object to Slot.
     */
    private convertItemFromServer(slot: Slot): Slot {
        const copy: Slot = Object.assign({}, slot);
        return copy;
    }

    /**
     * Convert a Slot to a JSON which can be sent to the server.
     */
    private convert(slot: Slot): Slot {
        const copy: Slot = Object.assign({}, slot);
        return copy;
    }
}
