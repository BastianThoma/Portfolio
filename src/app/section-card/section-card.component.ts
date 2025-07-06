import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-section-card',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './section-card.component.html',
  styleUrl: './section-card.component.scss',
})
export class SectionCardComponent {
  @Input() sectionTitle: string = '';
  @Input() mainHeading: string = '';
  @Input() mainText: string = '';
  @Input() highlights: {
    img?: { src: string; alt: string };
    text?: string;
    marginTop?: boolean;
  }[] = [];
}
