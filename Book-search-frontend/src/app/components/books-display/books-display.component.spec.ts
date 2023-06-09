import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BooksDisplayComponent } from './books-display.component';

describe('BooksDisplayComponent', () => {
  let component: BooksDisplayComponent;
  let fixture: ComponentFixture<BooksDisplayComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [BooksDisplayComponent]
    });
    fixture = TestBed.createComponent(BooksDisplayComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
