import { BaseEntity } from './../../shared';

export class Restaurant implements BaseEntity {
    constructor(
        public id?: number,
        public name?: string,
        public slug?: string,
        public lat?: number,
        public lng?: number,
        public customers?: BaseEntity[],
    ) {
    }
}
