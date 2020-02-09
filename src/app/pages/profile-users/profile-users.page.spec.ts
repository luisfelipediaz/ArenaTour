import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProfileUsersPage } from './profile-users.page';

describe('ProfileUsersPage', () => {
  let component: ProfileUsersPage;
  let fixture: ComponentFixture<ProfileUsersPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProfileUsersPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProfileUsersPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
