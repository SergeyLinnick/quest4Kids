export interface IChild {
  id: number;
  name: string;
  email: string;
  password: string;
}

export type ICreateChild = Omit<IChild, "id">;

export type IUpdateChild = Partial<ICreateChild>;
