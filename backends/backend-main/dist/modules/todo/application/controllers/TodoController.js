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
exports.TodoController = void 0;
const common_1 = require("@nestjs/common");
const controller_decorator_1 = require("@nestjs/common/decorators/core/controller.decorator");
const TodoDto_1 = require("../dtos/TodoDto");
const TodoService_1 = require("../services/TodoService");
let TodoController = class TodoController {
    constructor(todoService) {
        this.todoService = todoService;
    }
    getTodo(id) {
        const todo = this.todoService.getTodoById(id);
        if (!todo) {
            return `Todo with ID ${id} not found`;
        }
        return `Todo found: ${JSON.stringify(todo)}`;
    }
    createTodo(todoDto) {
        const newTodo = this.todoService.createTodo(todoDto.title);
        return newTodo;
    }
};
exports.TodoController = TodoController;
__decorate([
    (0, common_1.Get)(':id'),
    __param(0, (0, common_1.Param)('id', common_1.ParseIntPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", String)
], TodoController.prototype, "getTodo", null);
__decorate([
    (0, common_1.Post)(),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [TodoDto_1.TodoDto]),
    __metadata("design:returntype", Object)
], TodoController.prototype, "createTodo", null);
exports.TodoController = TodoController = __decorate([
    (0, controller_decorator_1.Controller)('todos'),
    __metadata("design:paramtypes", [TodoService_1.TodoService])
], TodoController);
//# sourceMappingURL=TodoController.js.map