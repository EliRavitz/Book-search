import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdatingObjectsAreaComponent } from './updating-objects-area.component';

describe('UpdatingObjectsAreaComponent', () => {
  let component: UpdatingObjectsAreaComponent;
  let fixture: ComponentFixture<UpdatingObjectsAreaComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [UpdatingObjectsAreaComponent]
    });
    fixture = TestBed.createComponent(UpdatingObjectsAreaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
