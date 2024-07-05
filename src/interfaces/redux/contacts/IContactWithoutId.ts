import { IContact } from './IContact';

export interface IContactWithoutId extends Omit<IContact, 'id'> {}
