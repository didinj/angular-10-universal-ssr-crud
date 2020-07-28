import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { ApiService } from '../api.service';
import { FormControl, FormGroupDirective, FormBuilder, FormGroup, NgForm, Validators } from '@angular/forms';
import { ErrorStateMatcher } from '@angular/material/core';

/** Error when invalid control is dirty, touched, or submitted. */
export class MyErrorStateMatcher implements ErrorStateMatcher {
  isErrorState(control: FormControl | null, form: FormGroupDirective | NgForm | null): boolean {
    const isSubmitted = form && form.submitted;
    return !!(control && control.invalid && (control.dirty || control.touched || isSubmitted));
  }
}

@Component({
  selector: 'app-book-edit',
  templateUrl: './book-edit.component.html',
  styleUrls: ['./book-edit.component.scss']
})
export class BookEditComponent implements OnInit {

  bookForm: FormGroup;
  _id = '';
  isbn = '';
  title = '';
  author = '';
  description = '';
  publisher = '';
  publishedYear = '';
  isLoadingResults = false;
  matcher = new MyErrorStateMatcher();

  constructor(private router: Router, private route: ActivatedRoute, private api: ApiService, private formBuilder: FormBuilder) { }

  ngOnInit(): void {
    this.getBook(this.route.snapshot.paramMap.get('id'));
    this.bookForm = this.formBuilder.group({
      'isbn' : [null, Validators.required],
      'title' : [null, Validators.required],
      'author' : [null, Validators.required],
      'description' : [null, Validators.required],
      'publisher' : [null, Validators.required],
      'publishedYear' : [null, Validators.required]
    });
  }

  getBook(id: any): void {
    this.api.getBook(id).subscribe((data: any) => {
      this._id = data._id;
      this.bookForm.setValue({
        isbn: data.isbn,
        title: data.title,
        author: data.author,
        description: data.description,
        publisher: data.publisher,
        publishedYear: data.publishedYear
      });
    });
  }

  onFormSubmit(): void {
    this.isLoadingResults = true;
    this.api.updateBook(this._id, this.bookForm.value)
      .subscribe((res: any) => {
          const id = res._id;
          this.isLoadingResults = false;
          this.router.navigate(['/book-details', id]);
        }, (err: any) => {
          console.log(err);
          this.isLoadingResults = false;
        }
      );
  }

  bookDetails(): void {
    this.router.navigate(['/book-details', this._id]);
  }

}
