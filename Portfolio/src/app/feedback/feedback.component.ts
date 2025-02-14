import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TranslateService, TranslateModule } from '@ngx-translate/core';

@Component({
  selector: 'app-feedback',
  templateUrl: './feedback.component.html',
  styleUrls: ['./feedback.component.scss'],
  standalone: true,
  imports: [CommonModule, TranslateModule],
})
export class FeedbackComponent {
  constructor(private translate: TranslateService) {}

  feedbacks = [
    { text: 'FEEDBACK.TEXT1', author: 'name 1', role: 'Team Partner' },
    { text: 'FEEDBACK.TEXT2', author: 'name 2', role: 'Team Partner' },
    { text: 'FEEDBACK.TEXT3', author: 'name 3', role: 'Team Partner' }
  ];

  currentSlide = 0;
  private startX = 0;
  private threshold = 250;
  private isDragging = false;

  nextSlide(): void {
    this.currentSlide = (this.currentSlide + 1) % this.feedbacks.length;
  }

  prevSlide(): void {
    this.currentSlide =
      (this.currentSlide - 1 + this.feedbacks.length) % this.feedbacks.length;
  }

  goToSlide(slideIndex: number): void {
    this.currentSlide = slideIndex;
  }

  isActive(index: number): boolean {
    return this.currentSlide === index;
  }

  isPrev(index: number): boolean {
    return (
      (this.currentSlide - 1 + this.feedbacks.length) %
        this.feedbacks.length ===
      index
    );
  }

  isNext(index: number): boolean {
    return (this.currentSlide + 1) % this.feedbacks.length === index;
  }

  onTouchStart(event: any): void {
    this.startX = event.touches[0].clientX;
  }

  onTouchEnd(event: any): void {
    const deltaX = event.changedTouches[0].clientX - this.startX;
    if (deltaX > this.threshold) {
      this.prevSlide();
    } else if (deltaX < -this.threshold) {
      this.nextSlide();
    }
  }

  onPointerDown(event: PointerEvent): void {
    if (event.button !== 0) return;
    this.isDragging = true;
    this.startX = event.clientX;
  
    const sliderElement = document.querySelector('.slider');
    if (sliderElement) {
      sliderElement.classList.add('dragging');
    }
  
    event.preventDefault();
  }
  
  onPointerUp(): void {
    this.isDragging = false;
  
    const sliderElement = document.querySelector('.slider');
    if (sliderElement) {
      sliderElement.classList.remove('dragging');
    }
  }
  
  onPointerMove(event: PointerEvent): void {
    if (!this.isDragging) return;
  
    const deltaX = event.clientX - this.startX;
    if (deltaX > this.threshold) {
      this.prevSlide();
      this.startX = event.clientX;
    } else if (deltaX < -this.threshold) {
      this.nextSlide();
      this.startX = event.clientX;
    }
  }

  ngOnInit(): void {
    const sliderElement = document.querySelector('.slider') as HTMLElement;
  
    if (sliderElement) {
      sliderElement.addEventListener('touchstart', this.onTouchStart.bind(this), { passive: true });
      sliderElement.addEventListener('touchend', this.onTouchEnd.bind(this), { passive: true });
  
      sliderElement.addEventListener('pointerdown', this.onPointerDown.bind(this));
      sliderElement.addEventListener('pointermove', this.onPointerMove.bind(this));
      sliderElement.addEventListener('pointerup', this.onPointerUp.bind(this));
    }
    window.addEventListener('pointerup', this.onPointerUp.bind(this));
  }
}
