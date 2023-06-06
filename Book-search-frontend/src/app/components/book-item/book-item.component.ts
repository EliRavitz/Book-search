import { Component, Input, Output, EventEmitter } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Books } from 'src/app/Books';
import { Authors } from 'src/app/Authors';
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
  @Input() authors: Authors[] = [];
  @Output() onDeleteBook: EventEmitter<Books> = new EventEmitter();
  @Output() onDeleteAuthor: EventEmitter<Authors> = new EventEmitter();
  @Output() onUpdateBook: EventEmitter<{ id?: number; book: Partial<Books> }> =
    new EventEmitter();
  @Output() onUpdateAuthor: EventEmitter<{
    id?: number;
    author: Partial<Authors>;
  }> = new EventEmitter();

  getAuthorForBook(): Authors | undefined {
    if (this.book && this.book.author_name) {
      return this.authors.find(
        (author) => author.name === this.book.author_name
      );
    }
    return undefined;
  }

  bookForm: FormGroup;
  authorForm: FormGroup;

  constructor() {
    this.bookForm = new FormGroup({
      title: new FormControl('', Validators.required),
      description: new FormControl('', Validators.required),
      author_name: new FormControl('', Validators.required),
      published_date: new FormControl('', Validators.required),
    });
    this.authorForm = new FormGroup({
      name: new FormControl('', Validators.required),
      email: new FormControl('', Validators.required),
    });
  }

  authorForBook: Authors | undefined;
  ngOnInit() {
    this.bookForm.patchValue(this.book);
    this.authorForBook = this.getAuthorForBook();
    const author = this.getAuthorForBook();
    if (author) {
      this.authorForm.patchValue({
        name: author.name,
        email: author.email,
      });
    }
  }

  onSubmit() {
    if (this.bookForm.invalid) {
      alert('Please fill in all fields');
      return;
    }
    const updatedFields: Partial<Books> = {};

    this.isExpandedEdit = false;
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

  onSubmitAuthor() {
    if (this.authorForm.invalid) {
      alert('Please fill in all fields');
      return;
    }
    const updatedFields: Partial<Authors> = {};

    this.isExpandedEditAuthor = false;
    if (
      this.authorForBook &&
      this.authorForm.value.name !== this.authorForBook.name
    ) {
      updatedFields.name = this.authorForm.value.name;
    }

    if (
      this.authorForBook &&
      this.authorForm.value.email !== this.authorForBook.email
    ) {
      updatedFields.email = this.authorForm.value.email;
    }

    if (Object.keys(updatedFields).length === 0) {
      return;
    }

    if (this.authorForBook && this.authorForBook.id) {
      this.onUpdateAuthor.emit({
        id: this.authorForBook.id,
        author: updatedFields,
      });
    }
  }

  faTimes = faTimes;
  faEdit = faEdit;
  faArrowDown = faArrowDown;
  faArrowUp = faArrowUp;

  isExpanded = false;
  isExpandedEdit = false;
  isExpandedEditAuthor = false;

  toggleExpansion() {
    this.isExpanded = !this.isExpanded;
  }
  toggleExpansionEdit() {
    this.isExpandedEdit = !this.isExpandedEdit;
  }

  toggleExpansionEditAuthor() {
    this.isExpandedEditAuthor = !this.isExpandedEditAuthor;
  }

  onDelete(book: Books) {
    this.onDeleteBook.emit(book);
  }

  onDeleteAut(author: Authors | undefined) {
    if (author) {
      this.onDeleteAuthor.emit(author);
    }
  }
}
