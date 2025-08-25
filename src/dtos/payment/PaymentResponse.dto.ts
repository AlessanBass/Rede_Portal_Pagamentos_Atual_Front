import { PaymentStatusDetailEnum } from "../../enum/payment/payment-status-detail.enum";
import { PaymentStatusEnum } from "../../enum/payment/payment-status.enum";
import { PointOfInterationDto } from "./PointOfInteration.dto";

export class PaymentResponseDto {
    id: number;
    dateApproved?: Date;
    dateOfExpiration: Date;
    description: string;
    paymentMethodId: string;
    pointOfInteraction: PointOfInterationDto;
    status: PaymentStatusEnum;
    statusDetail: PaymentStatusDetailEnum;
}