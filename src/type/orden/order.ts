export interface IReadOrden {
  id: string;
  number: string;
  items: IReadItems[];
}

export interface IReadItems {
  name: string;
  price: string;
  quantity: string;
  sku: string | null;
}
