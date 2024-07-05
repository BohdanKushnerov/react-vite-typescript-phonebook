import { IContact } from './IContact';

export interface IContactInitialState {
  items: IContact[];
  isLoading: boolean;
  error: string | null;
}
