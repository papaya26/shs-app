import { Competitors } from './competitors';
import { TaxesAndFees } from './taxes-and-fees';

export interface Price {
  id: number;
  price: number;
  competitors?: Competitors;
  taxes_and_fees?: TaxesAndFees;
}
