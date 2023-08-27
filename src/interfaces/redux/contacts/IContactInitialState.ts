import IContact from './IContact';

export default interface IContactInitialState {
  items: IContact[];
  isLoading: boolean;
  error: string | null;
}
