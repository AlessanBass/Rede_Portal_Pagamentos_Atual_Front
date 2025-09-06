import { AddressCreateDto } from "../address/address-create.dto";
import { InvoiceDto } from "../invoice/invoice.dto";
import { PlanDto } from "../plan/plan.dto";

export class UserCreateDto {
    firstName: string;
    lastName: string;
    cpf: string;
    email: string;
    planId: PlanDto;
    phoneNumber?: string;
    whatsApp: string;
    dateOfBirth: Date;
    address: AddressCreateDto;
}