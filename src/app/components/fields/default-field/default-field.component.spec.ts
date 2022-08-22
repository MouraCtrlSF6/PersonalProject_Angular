import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DefaultFieldComponent } from './default-field.component';

describe('DefaultFieldComponent', () => {
  let component: DefaultFieldComponent;
  let fixture: ComponentFixture<DefaultFieldComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DefaultFieldComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DefaultFieldComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
