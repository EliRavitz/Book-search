import { Component, Output, EventEmitter } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';

import { Books } from '../../Books';

@Component({
  selector: 'app-add-book',
  templateUrl: './add-book.component.html',
  styleUrls: ['./add-book.component.css'],
})
export class AddBookComponent {
  @Output() onAddBook: EventEmitter<Books> = new EventEmitter();
  title!: string;
  description!: string;
  author_name!: string;
  published_date!: Date;

  bookForm: FormGroup;

  constructor() {
    this.bookForm = new FormGroup({
      title: new FormControl('', Validators.required),
      description: new FormControl('', Validators.required),
      author_name: new FormControl('', Validators.required),
      published_date: new FormControl('', Validators.required),
    });
  }

  onSubmit() {
    if (this.bookForm.invalid) {
      alert('Please fill in all fields');
      return;
    }

    const publishedDate = new Date(this.bookForm.value.published_date);
    const year = publishedDate.getFullYear();
    const month = String(publishedDate.getMonth() + 1).padStart(2, '0');
    const day = String(publishedDate.getDate()).padStart(2, '0');
    const formattedDate = `${year}.${month}.${day}`;

    const newBook: Books = {
      title: this.bookForm.value.title,
      description: this.bookForm.value.description,
      author_name: this.bookForm.value.author_name,
      published_date: formattedDate,
    };

    this.onAddBook.emit(newBook);

    this.bookForm.reset();
  }
}
