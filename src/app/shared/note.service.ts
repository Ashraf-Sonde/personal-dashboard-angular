import {Injectable, OnDestroy} from '@angular/core';
import { Note } from './note.model'
import {fromEvent} from 'rxjs';
import { Subscription } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class NoteService implements OnDestroy {

  notes: Note[] = []
  storageListener: Subscription

  constructor() {
    this.loadState()

    // @ts-ignore
    this.storageListener = fromEvent(window, 'storage').subscribe((event: StorageEvent) => {
     if (event.key === 'notes') this.loadState()
    })
  }

  ngOnDestroy() {
    if (this.storageListener) this.storageListener.unsubscribe()
  }

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
    this.saveState()
  }

  updateNote(id: string, updatedFields: Partial<Note>) {
    const note = this.getNote(id)
    Object.assign(note, updatedFields)
    this.saveState()
  }

  deleteNote(id: string) {
    const noteIndex = this.notes.findIndex(n => n.id === id)
    if (noteIndex == -1) return     // return if no index found of the given id
    this.notes.splice(noteIndex, 1)
    this.saveState()
  }

  saveState() {
    localStorage.setItem('notes', JSON.stringify(this.notes))
  }

  loadState() {
    try {
      // @ts-ignore
      const notesInLocalStorage = JSON.parse(localStorage.getItem('notes'))
      this.notes.length = 0     // clearing the notes array but keeping its reference
      this.notes.push(...notesInLocalStorage)
    } catch(e) {
      console.log("Error while fetching notes fron Local Storage.")
      console.log(e)
    }
  }
}
