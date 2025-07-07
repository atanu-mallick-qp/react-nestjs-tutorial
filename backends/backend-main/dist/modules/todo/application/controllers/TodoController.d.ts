import { TodoDto } from '../dtos/TodoDto';
import { TodoService } from '../services/TodoService';
import { ITodo } from '../types/ITodo';
export declare class TodoController {
    private readonly todoService;
    constructor(todoService: TodoService);
    getTodo(id: number): string;
    createTodo(todoDto: TodoDto): ITodo;
}
