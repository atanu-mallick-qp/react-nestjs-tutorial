import {Body, Get, Param, ParseIntPipe, Post} from '@nestjs/common'
import {Controller} from '@nestjs/common/decorators/core/controller.decorator'
import {TodoDto} from '../dtos/TodoDto'
import {TodoService} from '../services/TodoService'
import {ITodo} from '../types/ITodo'

@Controller('todos')
export class TodoController {
  constructor(private readonly todoService: TodoService) {}
  @Get(':id')
  getTodo(@Param('id', ParseIntPipe) id: number): string {
    const todo = this.todoService.getTodoById(id)
    if (!todo) {
      return `Todo with ID ${id} not found`
    }
    return `Todo found: ${JSON.stringify(todo)}`
  }

  @Post()
  createTodo(@Body() todoDto: TodoDto): ITodo {
    const newTodo = this.todoService.createTodo(todoDto.title)
    return newTodo
  }
}
