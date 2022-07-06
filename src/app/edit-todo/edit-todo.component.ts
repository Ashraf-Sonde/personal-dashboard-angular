import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, ParamMap, Router} from '@angular/router';
import {TodoService} from '../shared/todo.service';
import {Todo} from '../shared/todo.model';
import {NgForm} from '@angular/forms';

@Component({
  selector: 'app-edit-todo',
  templateUrl: './edit-todo.component.html',
  styleUrls: ['./edit-todo.component.scss']
})
export class EditTodoComponent implements OnInit {

  todo: Todo

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private todoService: TodoService
  ) { }

  ngOnInit(): void {
    this.route.paramMap.subscribe((paramMap: ParamMap) => {
      const todoId = paramMap.get('id');
      // @ts-ignore
       this.todo = this.todoService.getTodo(todoId);
    })
  }

  onFormSubmit(form: NgForm) {
    if (form.invalid) return

    this.todoService.updateTodo(this.todo.id, form.value);
    this.router.navigateByUrl('/todos');
  }

}
