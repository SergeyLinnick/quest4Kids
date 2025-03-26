export interface IChild {
  id: string;
  name: string;
  email: string;
  password: string;
  oldPassword?: string;
  createdAt: string;
  availablePoints: number;
  totalEarnedPoints: number;
}

export type ICreateChild = Omit<
  IChild,
  "id" | "availablePoints" | "totalEarnedPoints" | "createdAt"
>;

export type IUpdateChild = Partial<ICreateChild>;

export type IUserCard = Omit<IChild, "password">;

export type IChildResponse = { data: IChild[] };

export type IChildByIdResponse = IChild;
