export interface CommonEntity {
  id: number;
  name: string;
}

export interface Players {
  id: number;
  name: string;
  city: string;
}

export interface BillEntryWithComputedProps {
  id: number;
  billDate: Date;
  billNumber: string;
  customerId: number;
  supplierId: number;
  productQty: number;
  lrNumber: string;
  lrDate: Date;
  transportId: number;
  freight: number;
  netAmount: number;
  taxType: string;
  grossAmount: number;
  customer: { name: string };
  supplier: { name: string };
  transport: { name: string };
  unPaidDays: number;
  paidAmount: number;
  debitNoteAmount: number;
}
