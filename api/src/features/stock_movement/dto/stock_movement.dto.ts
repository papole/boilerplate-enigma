import { PartialType } from "@nestjs/mapped-types";

export class CreateStockMovementDto {}

export class UpdateStockMovementDto extends PartialType(CreateStockMovementDto) {}
