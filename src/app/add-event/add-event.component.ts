import { Component, ViewChild, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-add-event',
  templateUrl: './add-event.component.html',
  styleUrls: ['./add-event.component.css'],
})
export class AddEventComponent implements OnInit {
  @ViewChild('newEventForm') eventForm!: NgForm;

  imgSrc: any = './assets/placeholder.png';
  selectedImg: any;

  ngOnInit(): void {}

  onSubmit(event: NgForm) {
    console.log(event);
  }
  
  showPreview($event: any) {
    const reader = new FileReader();
    reader.onload = (e) => {
      if (e.target) this.imgSrc = e.target.result;
    };
    reader.readAsDataURL($event.target.files[0]);
    this.selectedImg = $event.target.files[0];
  }
}
