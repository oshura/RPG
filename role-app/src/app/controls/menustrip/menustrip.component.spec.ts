import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MenustripComponent } from './menustrip.component';

describe('MenustripComponent', () => {
  let component: MenustripComponent;
  let fixture: ComponentFixture<MenustripComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MenustripComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MenustripComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
