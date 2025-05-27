import {IProduct} from './iproduct';

export interface IpageProduct {
  products: IProduct[];
  page:number;
  size:number;
  totalPages:number;
}
