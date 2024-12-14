import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SliderComponent } from '../slider/slider.component';

@Component({
  selector: 'app-feedback',
  standalone: true,
  imports: [CommonModule, SliderComponent],
  templateUrl: './feedback.component.html',
  styleUrl: './feedback.component.scss',
})
export class FeedbackComponent {}
