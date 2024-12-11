import { Component } from '@angular/core';

@Component({
  selector: 'app-about-me',
  standalone: true,
  imports: [],
  templateUrl: './about-me.component.html',
  styleUrl: './about-me.component.scss',
})
export class AboutMeComponent {
  hovered = false; // Status des Hover-Effekts

  onMouseEnter() {
    if (!this.hovered) {
      this.hovered = true; // Aktiviert den Hover-Effekt
    }
  }
}
