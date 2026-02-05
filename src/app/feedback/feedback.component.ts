import { Component, AfterViewInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TranslateService, TranslateModule } from '@ngx-translate/core';
import Aos from 'aos';

/**
 * Feedback carousel component displaying client testimonials.
 * Supports touch/pointer swipe gestures and navigation arrows.
 * Features drag functionality for desktop users.
 * 
 * @implements {AfterViewInit}
 */
@Component({
  selector: 'app-feedback',
  templateUrl: './feedback.component.html',
  styleUrls: ['./feedback.component.scss'],
  standalone: true,
  imports: [CommonModule, TranslateModule],
})
export class FeedbackComponent implements AfterViewInit {
  /**
   * @param {TranslateService} translate - ngx-translate service for i18n
   */
  constructor(private translate: TranslateService) {}

  /**
   * Array of client feedback testimonials.
   * Text keys reference translation files for multilingual support.
   */
  feedbacks = [
    { text: 'FEEDBACK.TEXT1', author: 'Ahmet', role: 'Team Partner' },
    { text: 'FEEDBACK.TEXT2', author: 'Jan', role: 'Team Partner' },
    { text: 'FEEDBACK.TEXT3', author: 'Dennis', role: 'Team Partner' },
  ];

  /** Currently visible slide index (zero-based) */
  currentSlide = 0;
  
  /** Starting X coordinate for swipe/drag detection */
  private startX = 0;
  
  /** Minimum pixel distance for valid swipe/drag (250px) */
  private threshold = 250;
  
  /** Tracks if user is currently dragging */
  private isDragging = false;

  /** Advances to next slide, loops to first after last */
  nextSlide(): void {
    this.currentSlide = (this.currentSlide + 1) % this.feedbacks.length;
  }

  /** Goes to previous slide, loops to last after first */
  prevSlide(): void {
    this.currentSlide =
      (this.currentSlide - 1 + this.feedbacks.length) % this.feedbacks.length;
  }

  /**
   * Jumps to specific slide by index.
   * Used by navigation dots.
   * 
   * @param {number} slideIndex - Target slide index (zero-based)
   */
  goToSlide(slideIndex: number): void {
    this.currentSlide = slideIndex;
  }

  /**
   * Checks if given index is currently active slide.
   * 
   * @param {number} index - Slide index to check
   * @returns {boolean} True if index matches current slide
   */
  isActive(index: number): boolean {
    return this.currentSlide === index;
  }

  /**
   * Checks if given index is previous slide.
   * Used for CSS positioning/animations.
   * 
   * @param {number} index - Slide index to check
   * @returns {boolean} True if index is previous slide
   */
  isPrev(index: number): boolean {
    return (
      (this.currentSlide - 1 + this.feedbacks.length) %
        this.feedbacks.length ===
      index
    );
  }

  /**
   * Checks if given index is next slide.
   * Used for CSS positioning/animations.
   * 
   * @param {number} index - Slide index to check
   * @returns {boolean} True if index is next slide
   */
  isNext(index: number): boolean {
    return (this.currentSlide + 1) % this.feedbacks.length === index;
  }

  /**
   * Touch start handler for mobile swipe gestures.
   * Records initial touch X position.
   * 
   * @param {any} event - Touch event
   */
  onTouchStart(event: any): void {
    this.startX = event.touches[0].clientX;
  }

  /**
   * Touch end handler for mobile swipe gestures.
   * Calculates swipe distance and triggers slide change if threshold met.
   * Swipe right = previous, swipe left = next.
   * 
   * @param {any} event - Touch event
   */
  onTouchEnd(event: any): void {
    const deltaX = event.changedTouches[0].clientX - this.startX;
    if (deltaX > this.threshold) {
      this.prevSlide();
    } else if (deltaX < -this.threshold) {
      this.nextSlide();
    }
  }

  /**
   * Pointer down handler for desktop drag functionality.
   * Initiates drag tracking and adds visual feedback class.
   * Only responds to left mouse button (button 0).
   * 
   * @param {PointerEvent} event - Pointer down event
   */
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

  /**
   * Pointer up handler to end drag operation.
   * Removes dragging visual feedback class.
   */
  onPointerUp(): void {
    this.isDragging = false;

    const sliderElement = document.querySelector('.slider');
    if (sliderElement) {
      sliderElement.classList.remove('dragging');
    }
  }

  /**
   * Pointer move handler for drag gesture detection.
   * Triggers slide change if drag distance exceeds threshold.
   * Resets start position after each slide change to allow continuous dragging.
   * 
   * @param {PointerEvent} event - Pointer move event
   */
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

  /**
   * Lifecycle hook that sets up touch and pointer event listeners.
   * Uses passive listeners for touch events to improve scroll performance.
   * Binds event handlers to maintain correct 'this' context.
   */
  ngOnInit(): void {
    const sliderElement = document.querySelector('.slider') as HTMLElement;

    if (sliderElement) {
      sliderElement.addEventListener(
        'touchstart',
        this.onTouchStart.bind(this),
        { passive: true }
      );
      sliderElement.addEventListener('touchend', this.onTouchEnd.bind(this), {
        passive: true,
      });

      sliderElement.addEventListener(
        'pointerdown',
        this.onPointerDown.bind(this)
      );
      sliderElement.addEventListener(
        'pointermove',
        this.onPointerMove.bind(this)
      );
      sliderElement.addEventListener('pointerup', this.onPointerUp.bind(this));
    }
    window.addEventListener('pointerup', this.onPointerUp.bind(this));
  }

  /**
   * Lifecycle hook that refreshes AOS animations.
   * Ensures feedback section animates correctly on scroll.
   */
  ngAfterViewInit(): void {
    setTimeout(() => Aos.refresh(), 200);
  }
}
