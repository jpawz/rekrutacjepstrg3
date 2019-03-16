import { HttpClientModule } from '@angular/common/http';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterTestingModule } from '@angular/router/testing';
import { EditBookComponent } from './edit-book.component';


describe('EditBookComponent', () => {
  let component: EditBookComponent;
  let fixture: ComponentFixture<EditBookComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [EditBookComponent],
      imports: [RouterTestingModule, HttpClientModule, ReactiveFormsModule]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EditBookComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('form invalid when empty', () => {
    fixture.detectChanges();
    expect(component.bookForm.invalid).toBeTruthy();
  });

  it('form should be valid when required fields are not empty', () => {
    component.bookForm.controls['title'].setValue('title');
    component.bookForm.controls['author'].setValue('author');
    expect(component.bookForm.valid).toBeTruthy();
  });
});
