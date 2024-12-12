import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SectionCardComponent } from '../section-card/section-card.component';

@Component({
  selector: 'app-skills',
  standalone: true,
  imports: [SectionCardComponent, CommonModule],
  templateUrl: './skills.component.html',
  styleUrl: './skills.component.scss',
})
export class SkillsComponent {
  skills = [
    { icon: '/assets/img/html.png', label: 'HTML' },
    { icon: '/assets/img/css.png', label: 'CSS' },
    { icon: '/assets/img/javascript.png', label: 'JavaScript' },
    { icon: '/assets/img/typescript.png', label: 'TypeScript' },
    { icon: '/assets/img/angular.png', label: 'Angular' },
    { icon: '/assets/img/firebase.png', label: 'Firebase' },
    { icon: '/assets/img/material_design.png', label: 'Material Design' },
    { icon: '/assets/img/git.png', label: 'Git' },
    { icon: '/assets/img/api.png', label: 'API' },
    { icon: '/assets/img/python.png', label: 'Python' },
    { icon: '/assets/img/scrum.png', label: 'Scrum' },
  ];
}
