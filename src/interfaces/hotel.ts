import { Competition } from './competition';
import { TaxesAndFees } from './taxes-and-fees';

export interface Hotel {
  id: number;
  name: string;
  rating: number;
  stars: number;
  address: string;
  photo: string;
  description: string;
  price?: number;
  currencySign?: string;
  competition?: Competition[];
  taxes_and_fees?: TaxesAndFees;
}
