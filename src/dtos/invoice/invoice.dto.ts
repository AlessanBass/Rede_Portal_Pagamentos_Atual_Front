export class InvoiceDto{
   invoiceId : string;
   amount : number;  // valor da fatura
   dueDate : Date; // Data de vencimento
   isPaid : boolean;  // paga ou não
   paymentDate? : Date;
   isExpired: boolean;
}