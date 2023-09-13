import { Component } from '@angular/core';

@Component({
  selector: 'app-event-page',
  templateUrl: './event-page.component.html',
  styleUrls: ['./event-page.component.css'],
})
export class EventPageComponent {
  stars = 0;
  onStarHover(hoveredStars: number) {
    this.stars = hoveredStars;
  }
}
