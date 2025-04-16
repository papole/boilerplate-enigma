import { StockMovementService } from './stock-movement.service';
import { CreateStockMovementDto } from './dto/create-stock-movement.dto';
import { UpdateStockMovementDto } from './dto/update-stock-movement.dto';
export declare class StockMovementController {
    private readonly stockMovementService;
    constructor(stockMovementService: StockMovementService);
    create(createStockMovementDto: CreateStockMovementDto): string;
    findAll(): string;
    findOne(id: string): string;
    update(id: string, updateStockMovementDto: UpdateStockMovementDto): string;
    remove(id: string): string;
}
