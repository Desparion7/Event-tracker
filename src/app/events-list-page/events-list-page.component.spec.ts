import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EventsListPageComponent } from './events-list-page.component';

describe('EventsListPageComponent', () => {
  let component: EventsListPageComponent;
  let fixture: ComponentFixture<EventsListPageComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [EventsListPageComponent]
    });
    fixture = TestBed.createComponent(EventsListPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
