import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CharacterSelectionEmptyComponent } from './character-selection-empty.component';

describe('CharacterSelectionEmptyComponent', () => {
  let component: CharacterSelectionEmptyComponent;
  let fixture: ComponentFixture<CharacterSelectionEmptyComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CharacterSelectionEmptyComponent]
    });
    fixture = TestBed.createComponent(CharacterSelectionEmptyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
