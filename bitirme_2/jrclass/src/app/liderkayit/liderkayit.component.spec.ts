import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LiderkayitComponent } from './liderkayit.component';

describe('LiderkayitComponent', () => {
  let component: LiderkayitComponent;
  let fixture: ComponentFixture<LiderkayitComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LiderkayitComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LiderkayitComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
