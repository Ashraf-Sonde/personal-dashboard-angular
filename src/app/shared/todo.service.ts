import { Injectable } from '@angular/core';
import {Todo} from './todo.model';

@Injectable({
  providedIn: 'root'
})
export class TodoService {

  todos: Todo[]

  constructor() { }

  getTodos() {
    return this.todos
  }

  getTodo(id: string) {
    return this.todos.find(t => t.id === id)
  }

  addTodo(todo: Todo) {
    this.todos.push(todo)
  }

  updateTodo(id: string, updatedTodoFields: Partial<Todo>) {
    const todo = this.getTodo(id)
    Object.assign(todo, updatedTodoFields)
  }

  deleteTodo(id: string) {
    const Todoindex = this.todos.findIndex(t => t.id === id)
    if (Todoindex == -1) return
    this.todos.splice(Todoindex, 1)
  }
}