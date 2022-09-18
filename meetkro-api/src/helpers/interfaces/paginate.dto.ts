export interface IPaginate {
  columns: Array<any>;
  draw: number;
  length: number;
  order: Array<{ column: number; dir: string }>;
  search: { value: string; regex: string };
  start: number;
}
