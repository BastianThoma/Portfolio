import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';

/**
 * Reusable section card component for content display.
 * Used across About Me, Skills, and other sections.
 * Displays section title, main heading, text, and optional highlights.
 */
@Component({
  selector: 'app-section-card',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './section-card.component.html',
  styleUrl: './section-card.component.scss',
})
export class SectionCardComponent {
  /** Small subtitle displayed above main heading (e.g., "About me") */
  @Input() sectionTitle: string = '';
  
  /** Large main heading (e.g., "I am a Frontend Developer") */
  @Input() mainHeading: string = '';
  
  /** Descriptive text content below heading */
  @Input() mainText: string = '';
  
  /**
   * Optional array of highlight items with icons and text.
   * Each item can have an image, text, and optional margin-top spacing.
   */
  @Input() highlights: {
    img?: { src: string; alt: string };
    text?: string;
    marginTop?: boolean;
  }[] = [];
}
