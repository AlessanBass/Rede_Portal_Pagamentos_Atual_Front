import { InvoiceDto } from "../invoice/invoice.dto";
import { PlanDto } from "../plan/plan.dto";

export class UserFullDto {
    id: string;
    fullName: string;
    cpf: string;
    email: string;
    plan: PlanDto;
    invoices: InvoiceDto[];
}