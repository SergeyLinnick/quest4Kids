export interface IWidgetSettings {
  i: string;
  x: number;
  y: number;
  w: number;
  h: number;
  minH?: number;
  maxH?: number;
  minW?: number;
  maxW?: number;
  static?: boolean;
  isResizable?: boolean;
  isVisible: boolean;
}
