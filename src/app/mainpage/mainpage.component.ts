import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { Effect } from './animationClass';

@Component({
  selector: 'app-mainpage',
  templateUrl: './mainpage.component.html',
  styleUrls: ['./mainpage.component.css'],
})
export class MainpageComponent implements OnInit {
  @ViewChild('canvas1', { static: true }) canvas!: ElementRef;

  private ctx!: CanvasRenderingContext2D;

  ngOnInit(): void {
    this.ctx = this.canvas.nativeElement.getContext('2d');
    this.setupAnimation();
  }
  setupAnimation(): void {
    const canvas = this.canvas.nativeElement;
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    const gradient = this.ctx.createLinearGradient(0, 0, 0, canvas.height);
    gradient.addColorStop(0, 'darkblue');
    gradient.addColorStop(0.5, 'blue');
    gradient.addColorStop(1, 'orangered');
    this.ctx.fillStyle = gradient;
    this.ctx.strokeStyle = gradient;

    const effect = new Effect(canvas, this.ctx);

    const animate = () => {
      this.ctx.clearRect(0, 0, canvas.width, canvas.height);
      effect.handleParticles();
      requestAnimationFrame(animate.bind(this));
    };
    animate.bind(this)();
  }
}
