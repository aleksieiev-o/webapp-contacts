/* eslint-disable @typescript-eslint/no-explicit-any */
export interface IAppFormInput {
  mode: 'input' | 'textarea';
  formModel: any;
  type: 'text' | 'email' | 'password' | 'number';
  name: string;
  label: string;
  placeholder: string;
  required: boolean;
  disabled: boolean;
  isDataPending: boolean;
}
