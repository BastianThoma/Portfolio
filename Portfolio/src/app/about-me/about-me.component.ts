import { Component } from '@angular/core';
import { SectionCardComponent } from "../section-card/section-card.component";
import { TranslateService, TranslateModule } from '@ngx-translate/core';
@Component({
  selector: 'app-about-me',
  standalone: true,
  imports: [SectionCardComponent, TranslateModule],
  templateUrl: './about-me.component.html',
  styleUrl: './about-me.component.scss',
})
export class AboutMeComponent {
  constructor(private translate: TranslateService) {}

  hovered = false; // Status des Hover-Effekts

  onMouseEnter() {
    if (!this.hovered) {
      this.hovered = true; // Aktiviert den Hover-Effekt
    }
  }
}
