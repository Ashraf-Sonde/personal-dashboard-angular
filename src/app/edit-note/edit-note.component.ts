import {Component, Input, OnInit} from '@angular/core';
import {ActivatedRoute, ParamMap, Router} from '@angular/router';
import {NoteService} from '../shared/note.service';
import {Note} from '../shared/note.model';
import {NgForm} from '@angular/forms';
import {NotificationService} from '../shared/notification.service';

@Component({
  selector: 'app-edit-note',
  templateUrl: './edit-note.component.html',
  styleUrls: ['./edit-note.component.scss']
})
export class EditNoteComponent implements OnInit {

  note: Note

  constructor(
    private route: ActivatedRoute,
    private noteService: NoteService,
    private router: Router,
    private notificationService: NotificationService
  ) { }

  ngOnInit(): void {
    this.route.paramMap.subscribe((paramMap: ParamMap) => {
      const idParam = paramMap.get('id');

      if (idParam != null) {
        // @ts-ignore
        this.note = this.noteService.getNote(idParam);
      }
    })
  }

  onFormSubmit(form: NgForm) {
    this.noteService.updateNote(this.note.id, form.value);

    this.notificationService.show('Note Updated!', 5000, '#0AA1DD');
    this.router.navigateByUrl("notes");
  }

  deleteNote() {
    this.noteService.deleteNote(this.note.id);

    this.notificationService.show('Note Deleted!', 5000, '#EB4747');
    this.router.navigateByUrl("notes");
  }
}
