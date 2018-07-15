import { BaseEntity } from './../../shared';

export class Customer implements BaseEntity {
    constructor(
        public id?: number,
        public name?: string,
        public lat?: number,
        public lng?: number,
        public restaurants?: BaseEntity[],
    ) {
    }
}
