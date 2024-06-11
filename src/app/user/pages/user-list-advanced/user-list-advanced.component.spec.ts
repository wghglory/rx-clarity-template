import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UserListAdvancedComponent } from './user-list-advanced.component';

describe('UserListAdvancedComponent', () => {
  let component: UserListAdvancedComponent;
  let fixture: ComponentFixture<UserListAdvancedComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [UserListAdvancedComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(UserListAdvancedComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
