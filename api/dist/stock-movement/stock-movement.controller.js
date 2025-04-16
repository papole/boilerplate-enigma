"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.StockMovementController = void 0;
const common_1 = require("@nestjs/common");
const stock_movement_service_1 = require("./stock-movement.service");
const create_stock_movement_dto_1 = require("./dto/create-stock-movement.dto");
const update_stock_movement_dto_1 = require("./dto/update-stock-movement.dto");
let StockMovementController = class StockMovementController {
    stockMovementService;
    constructor(stockMovementService) {
        this.stockMovementService = stockMovementService;
    }
    create(createStockMovementDto) {
        return this.stockMovementService.create(createStockMovementDto);
    }
    findAll() {
        return this.stockMovementService.findAll();
    }
    findOne(id) {
        return this.stockMovementService.findOne(+id);
    }
    update(id, updateStockMovementDto) {
        return this.stockMovementService.update(+id, updateStockMovementDto);
    }
    remove(id) {
        return this.stockMovementService.remove(+id);
    }
};
exports.StockMovementController = StockMovementController;
__decorate([
    (0, common_1.Post)(),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_stock_movement_dto_1.CreateStockMovementDto]),
    __metadata("design:returntype", void 0)
], StockMovementController.prototype, "create", null);
__decorate([
    (0, common_1.Get)(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], StockMovementController.prototype, "findAll", null);
__decorate([
    (0, common_1.Get)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], StockMovementController.prototype, "findOne", null);
__decorate([
    (0, common_1.Patch)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, update_stock_movement_dto_1.UpdateStockMovementDto]),
    __metadata("design:returntype", void 0)
], StockMovementController.prototype, "update", null);
__decorate([
    (0, common_1.Delete)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], StockMovementController.prototype, "remove", null);
exports.StockMovementController = StockMovementController = __decorate([
    (0, common_1.Controller)('stock-movement'),
    __metadata("design:paramtypes", [stock_movement_service_1.StockMovementService])
], StockMovementController);
//# sourceMappingURL=stock-movement.controller.js.map