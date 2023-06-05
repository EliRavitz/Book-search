import { Component, Input, Output, EventEmitter } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Books } from 'src/app/Books';
import {
  faTimes,
  faEdit,
  faArrowDown,
  faArrowUp,
} from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-book-item',
  templateUrl: './book-item.component.html',
  styleUrls: ['./book-item.component.css'],
})
export class BookItemComponent {
  @Input() book!: Books;
  @Output() onDeleteBook: EventEmitter<Books> = new EventEmitter();
  @Output() onUpdateBook: EventEmitter<{ id?: number; book: Partial<Books> }> =
    new EventEmitter();

  // title!: string;
  // description!: string;
  // author_name!: string;
  // published_date!: Date;

  bookForm: FormGroup;

  constructor() {
    this.bookForm = new FormGroup({
      title: new FormControl('', Validators.required),
      description: new FormControl('', Validators.required),
      author_name: new FormControl('', Validators.required),
      published_date: new FormControl('', Validators.required),
    });
  }

  ngOnInit() {
    this.bookForm.patchValue(this.book);
  }

  onSubmit() {
    if (this.bookForm.invalid) {
      alert('Please fill in all fields');
      return;
    }

    const updatedFields: Partial<Books> = {};

    if (this.bookForm.value.title !== this.book.title) {
      updatedFields.title = this.bookForm.value.title;
    }

    if (this.bookForm.value.description !== this.book.description) {
      updatedFields.description = this.bookForm.value.description;
    }

    if (this.bookForm.value.author_name !== this.book.author_name) {
      updatedFields.author_name = this.bookForm.value.author_name;
    }

    if (this.bookForm.value.published_date !== this.book.published_date) {
      const publishedDate = new Date(this.bookForm.value.published_date);
      const year = publishedDate.getFullYear();
      const month = String(publishedDate.getMonth() + 1).padStart(2, '0');
      const day = String(publishedDate.getDate()).padStart(2, '0');
      const formattedDate = `${year}.${month}.${day}`;

      updatedFields.published_date = formattedDate;
    }

    if (Object.keys(updatedFields).length === 0) {
      return;
    }

    if (this.book.id) {
      this.onUpdateBook.emit({ id: this.book.id, book: updatedFields });
    }
  }

  faTimes = faTimes;
  faEdit = faEdit;
  faArrowDown = faArrowDown;
  faArrowUp = faArrowUp;

  isExpanded = false;
  isExpandedEdit = false;

  toggleExpansion() {
    this.isExpanded = !this.isExpanded;
  }
  toggleExpansionEdit() {
    this.isExpandedEdit = !this.isExpandedEdit;
  }

  onDelete(book: Books) {
    this.onDeleteBook.emit(book);
  }
}
