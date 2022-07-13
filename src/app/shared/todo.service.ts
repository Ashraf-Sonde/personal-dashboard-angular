import {Injectable, OnDestroy} from '@angular/core';
import {Todo} from './todo.model';
import {fromEvent} from 'rxjs';
import {Subscription} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TodoService implements OnDestroy {

  todos: Todo[] = []
  storageListener: Subscription

  constructor() {
    this.loadState()

    // @ts-ignore
    this.storageListener = fromEvent(window, 'storage').subscribe((event: StorageEvent) => {
      if (event.key === 'todos') this.loadState()
    })
  }

  ngOnDestroy(): void {
    if (this.storageListener) this.storageListener.unsubscribe()
  }

  getTodos() {
    return this.todos
  }

  getTodo(id: string) {
    return this.todos.find(t => t.id === id)
  }

  addTodo(todo: Todo) {
    this.todos.push(todo)
    this.saveState()
  }

  updateTodo(id: string, updatedTodoFields: Partial<Todo>) {
    const todo = this.getTodo(id)
    Object.assign(todo, updatedTodoFields)
    this.saveState()
  }

  deleteTodo(id: string) {
    const Todoindex = this.todos.findIndex(t => t.id === id)
    if (Todoindex == -1) return
    this.todos.splice(Todoindex, 1)
    this.saveState()
  }

  saveState() {
    localStorage.setItem('todos', JSON.stringify(this.todos))
  }

  loadState() {
    try {
      // @ts-ignore
      const todosInLocalStorage = JSON.parse(localStorage.getItem('todos'))

      if (!todosInLocalStorage) return
      this.todos.length = 0;      // clear todos array, keeping the reference
      this.todos.push(...todosInLocalStorage);
    } catch(e) {
      console.log('Error while fetching todos')
      console.log(e)
    }
  }
}
