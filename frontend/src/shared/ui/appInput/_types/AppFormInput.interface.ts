export interface IAppFormInput {
  mode: 'input' | 'textarea';
  formModel: unknown;
  type: 'text' | 'email' | 'password' | 'number';
  name: string;
  label: string;
  placeholder: string;
  required: boolean;
  disabled: boolean;
  isDataPending: boolean;
}
