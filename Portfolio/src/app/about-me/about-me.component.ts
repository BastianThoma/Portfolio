import { Component } from '@angular/core';
import { SectionCardComponent } from "../section-card/section-card.component";

@Component({
  selector: 'app-about-me',
  standalone: true,
  imports: [SectionCardComponent],
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
