import { BaseEntity } from './../../shared';

export const enum SlotStatus {
    'UNLOCK',
    'JOIN'
}

export class Slot implements BaseEntity {
    constructor(
        public id?: number,
        public name?: string,
        public status?: SlotStatus,
        public description?: string,
        public discount?: number,
    ) {
    }
}
