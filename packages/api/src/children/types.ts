export interface IChild {
  id: string;
  name: string;
  email: string;
  password: string;
  createdAt?: string;
}

export type ICreateChild = Omit<IChild, "id">;

export type IUpdateChild = Partial<ICreateChild>;

export type IUserCard = Omit<IChild, "password">;

export type IChildResponse = { data: IChild[] };

export type IChildByIdResponse = IChild;
