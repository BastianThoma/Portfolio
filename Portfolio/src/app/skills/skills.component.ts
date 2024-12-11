import { Component } from '@angular/core';
import { SectionCardComponent } from "../section-card/section-card.component";

@Component({
  selector: 'app-skills',
  standalone: true,
  imports: [SectionCardComponent],
  templateUrl: './skills.component.html',
  styleUrl: './skills.component.scss'
})
export class SkillsComponent {

}
