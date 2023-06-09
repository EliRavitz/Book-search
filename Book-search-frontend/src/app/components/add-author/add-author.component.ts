import { Component, Output, EventEmitter } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Authors } from '../../Authors';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-add-author',
  templateUrl: './add-author.component.html',
  styleUrls: ['./add-author.component.css'],
})
export class AddAuthorComponent {
  @Output() onAddAuthor: EventEmitter<Authors> = new EventEmitter();

  authorForm: FormGroup;
  constructor(private toastr: ToastrService) {
    this.authorForm = new FormGroup({
      name: new FormControl('', Validators.required),
      email: new FormControl('', Validators.required),
    });
  }

  onSubmit() {
    if (this.authorForm.invalid) {
      this.toastr.error('Please fill in all fields');
      return;
    }

    const newAuthor: Authors = {
      name: this.authorForm.value.name,
      email: this.authorForm.value.email,
    };

    this.onAddAuthor.emit(newAuthor);

    this.authorForm.reset();
  }
}
