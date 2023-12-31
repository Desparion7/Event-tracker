import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './layout/header/header.component';
import { FooterComponent } from './layout/footer/footer.component';
import { MainpageComponent } from './mainpage/mainpage.component';
import { EventsListPageComponent } from './events-list-page/events-list-page.component';
import { EventListItemComponent } from './events-list-page/event-list-item/event-list-item.component';
import { EventPageComponent } from './event-page/event-page.component';
import { CommentComponent } from './event-page/comment/comment.component';
import { AddEventComponent } from './add-event/add-event.component';
import { FormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FooterComponent,
    MainpageComponent,
    EventsListPageComponent,
    EventListItemComponent,
    EventPageComponent,
    CommentComponent,
    AddEventComponent,
  ],
  imports: [BrowserModule, AppRoutingModule, FormsModule],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
