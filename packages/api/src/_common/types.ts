export type FetchConfig = {
  [key: string]: string | object;
};

export type Error = Map<string, string>;

export type FormState = {
  errors: Error;
  success?: boolean;
  values?: FormData;
};

export const initialState: FormState = {
  errors: new Map(),
  values: new FormData(),
};
