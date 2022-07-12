import { Component, OnInit } from '@angular/core';
import {BookmarkService} from '../shared/bookmark.service';
import {ActivatedRoute, ParamMap, Router} from '@angular/router';
import {Bookmark} from '../shared/bookmark.model';
import {NgForm} from '@angular/forms';
import {NotificationService} from '../shared/notification.service';

@Component({
  selector: 'app-edit-bookmark',
  templateUrl: './edit-bookmark.component.html',
  styleUrls: ['./edit-bookmark.component.scss']
})
export class EditBookmarkComponent implements OnInit {

  bookmark: Bookmark

  constructor(
    private bookmarkService: BookmarkService,
    private notificationService: NotificationService,
    private route: ActivatedRoute,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.route.paramMap.subscribe((paramMap: ParamMap) => {
      const bookmarkId = paramMap.get('id');
      // @ts-ignore
      this.bookmark = this.bookmarkService.getBookmark(bookmarkId);
    })
  }

  onFormSubmit(form: NgForm) {
    const { name, url } = form.value;
    this.bookmarkService.updateBookmark(this.bookmark.id, {
      name,
      url: new URL(url)
    });

    this.notificationService.show('Bookmark Updated!', 5000, '#0AA1DD')
  }

  delete() {
    this.bookmarkService.deleteBookmark(this.bookmark.id);
    this.router.navigate(['../'], { relativeTo: this.route });
    this.notificationService.show('Bookmark Deleted!', 5000, '#EB4747')
  }

}
