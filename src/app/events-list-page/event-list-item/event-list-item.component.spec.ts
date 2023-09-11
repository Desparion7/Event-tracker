import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EventListItemComponent } from './event-list-item.component';

describe('EventListItemComponent', () => {
  let component: EventListItemComponent;
  let fixture: ComponentFixture<EventListItemComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [EventListItemComponent]
    });
    fixture = TestBed.createComponent(EventListItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
