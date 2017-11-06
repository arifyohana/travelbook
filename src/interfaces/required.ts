export interface IRequired {
  mandatory: string;
  type: string;
  example: string;
  FieldText: string;
  category: string;
  disabled: string;
  resource: { id: string, name: string }[];
  value: string;
}
