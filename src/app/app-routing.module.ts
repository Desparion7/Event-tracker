import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MainpageComponent } from './mainpage/mainpage.component';
import { EventsListPageComponent } from './events-list-page/events-list-page.component';
import { EventPageComponent } from './event-page/event-page.component';

const routes: Routes = [
  { path: '', component: MainpageComponent },
  { path: 'events', component: EventsListPageComponent },
  { path: 'event/:id', component: EventPageComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
