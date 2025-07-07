import {Module} from '@nestjs/common'
import {TodoController} from './application/controllers/TodoController'
import {TodoService} from './application/services/TodoService'

@Module({
  imports: [],
  controllers: [TodoController],
  providers: [TodoService],
  exports: [],
})
export class TodoModule {}
