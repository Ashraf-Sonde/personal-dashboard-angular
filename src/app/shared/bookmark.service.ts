import {Injectable, OnDestroy} from '@angular/core';
import {Bookmark} from './bookmark.model';
import {Subscription} from 'rxjs';
import {fromEvent} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class BookmarkService implements OnDestroy {

  bookmarks: Bookmark[] = []
  storageListener: Subscription

  constructor() {
    this.loadState()

    // @ts-ignore
    this.storageListener = fromEvent(window, 'storage').subscribe((event: StorageEvent) => {
      if (event.key === 'bookmarks') this.loadState()
    })
  }

  ngOnDestroy(): void {
    if (this.storageListener) this.storageListener.unsubscribe()
  }

  getBookmarks() {
    return this.bookmarks;
  }

  getBookmark(id: string) {
    return this.bookmarks.find(b => b.id === id)
  }

  addBookmark(bookmark: Bookmark) {
    this.bookmarks.push(bookmark)
    this.saveState()
  }

  updateBookmark(id: string, updatedFields: Partial<Bookmark>) {
    const bookmark = this.getBookmark(id);
    Object.assign(bookmark, updatedFields)
    this.saveState()
  }

  deleteBookmark(id: string) {
    const bookmarkIndex = this.bookmarks.findIndex(b => b.id === id);
    if(bookmarkIndex == -1) return
    this.bookmarks.splice(bookmarkIndex, 1)
    this.saveState()
  }

  saveState() {
    localStorage.setItem('bookmarks', JSON.stringify(this.bookmarks))
  }

  loadState() {
    try {
      // @ts-ignore
      const notesInLocalStorage = JSON.parse(localStorage.getItem('bookmarks'), (key, value) => {
        if (key === 'url') return new URL(value)
        return value
      })
      this.bookmarks.length = 0     // clearing the notes array but keeping its reference
      this.bookmarks.push(...notesInLocalStorage)
    } catch(e) {
      console.log("Error while fetching bookmarks from Local Storage.")
      console.log(e)
    }
  }

}
