import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {BookmarksComponent} from './bookmarks/bookmarks.component';
import {TodosComponent} from './todos/todos.component';
import {NotesComponent} from './notes/notes.component';

const routes: Routes = [
  { path: 'bookmarks', component: BookmarksComponent, data: { tabIndex: 1}},
  { path: 'todos', component: TodosComponent, data: { tabIndex: 2}},
  { path: 'notes', component: NotesComponent, data: { tabIndex: 3}}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
