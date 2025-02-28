export type RegisterType = {
  name: string;
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  onBlur: (event: React.FocusEvent<HTMLInputElement>) => void;
};

export type inputType =
  | "number"
  | "text"
  | "search"
  | "time"
  | "hidden"
  | "tel"
  | "url"
  | "email"
  | "date"
  | "datetime-local"
  | "month"
  | "password"
  | "week";
