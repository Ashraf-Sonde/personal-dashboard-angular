import { Component, OnInit } from '@angular/core';
import {NgForm} from '@angular/forms';
import {BookmarkService} from '../shared/bookmark.service';
import {Bookmark} from '../shared/bookmark.model';
import {Router} from '@angular/router';
import {NotificationService} from '../shared/notification.service';

@Component({
  selector: 'app-add-bookmark',
  templateUrl: './add-bookmark.component.html',
  styleUrls: ['./add-bookmark.component.scss']
})
export class AddBookmarkComponent implements OnInit {

  bookmark: Bookmark

  constructor(
    private bookmarkService: BookmarkService,
    private router: Router,
    private notificationService: NotificationService
  ) { }

  ngOnInit(): void {
  }

  onFormSubmit(form: NgForm) {
    this.bookmark = new Bookmark(form.value.name, form.value.url);
    this.bookmarkService.addBookmark(this.bookmark);
    this.router.navigateByUrl('bookmarks');

    this.notificationService.show('Bookmark Created!', 5000, '#36AE7C');
  }
}
