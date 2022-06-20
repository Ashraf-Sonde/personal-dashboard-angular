import { Injectable } from '@angular/core';
import { Note } from './note.model'

@Injectable({
  providedIn: 'root'
})
export class NoteService {

  notes: Note[]

  constructor() { }

  getNotes() {
    return this.notes;
  }

  getNote(id: string) {
    return this.notes.find(n => {
      // return true when n.id equals the id passed into this method
      return n.id === id
    })
  }

  addNote(note: Note) {
    this.notes.push(note)
  }

  updateNote(id: string, updatedFields: Partial<Note>) {
    const note = this.getNote(id)
    Object.assign(note, updatedFields)
  }

  deleteNote(id: string) {
    const noteIndex = this.notes.findIndex(n => n.id === id)
    if (noteIndex == -1) return     // return if no index found of the given id
    this.notes.splice(noteIndex, 1)
  }
}
