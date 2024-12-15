import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TranslateModule } from '@ngx-translate/core';

@Component({
  selector: 'app-feedback',
  templateUrl: './feedback.component.html',
  styleUrls: ['./feedback.component.scss'],
  standalone: true,
  imports: [CommonModule, TranslateModule],
})
export class FeedbackComponent {
  feedbacks = [
    {
      text: 'I really value your ability to efficiently solve complex programming problems. What impresses me most is how quickly you adapt to new technologies and integrate them into our projects, like with the API implementation recently. You consistently bring creative solutions that push our work forward. On a personal level, you are a great asset to the team – always approachable and calm, even during conflicts, which helps us stay focused on solutions.',
      author: 'name 1',
      role: 'Team Partner',
    },
    {
      text: 'Your attention to detail and precision are major strengths. You have been instrumental in keeping our code clean and maintainable – your quality checks have often prevented bugs before they could become issues. I also appreciate how you ask important questions during meetings, which helps avoid misunderstandings. Your clear and open communication makes teamwork much smoother.',
      author: 'name 2',
      role: 'Team Partner',
    },
    {
      text: 'What I particularly admire about you is your structured approach to tasks. You tackle projects systematically and ensure that all necessary steps are followed while maintaining an excellent overview. I really appreciate how patient you are when helping others who are stuck. You explain things clearly and have a talent for making even complex topics easy for everyone to understand.',
      author: 'name 3',
      role: 'Team Partner',
    },
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
    window.addEventListener('pointerup', () => {
      this.isDragging = false;
      const sliderElement = document.querySelector('.slider') as HTMLElement;
      if (sliderElement) {
        sliderElement.classList.remove('dragging');
      }
    });
  }
}
