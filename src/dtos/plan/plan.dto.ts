import { PlanTypeEnum } from "../../enum/plan/plan-type.enum";

export class PlanDto {
    name: string;
    planValue: number;
    type: PlanTypeEnum;
    megaQuantities: number;
}