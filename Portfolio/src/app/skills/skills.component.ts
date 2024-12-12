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
    { icon: '/assets/img/white-icons/html.png', coloredIcon: '/assets/img/colored-icons/html-colored.png', label: 'HTML', hovered: false  },
    { icon: '/assets/img/white-icons/css.png', coloredIcon: '/assets/img/colored-icons/css-colored.png', label: 'CSS', hovered: false  },
    { icon: '/assets/img/white-icons/javascript.png', coloredIcon: '/assets/img/colored-icons/js-colored.png', label: 'JavaScript', hovered: false  },
    { icon: '/assets/img/white-icons/typescript.png', coloredIcon: '/assets/img/colored-icons/ts-colored.png', label: 'TypeScript', hovered: false  },
    { icon: '/assets/img/white-icons/angular.png', coloredIcon: '/assets/img/colored-icons/angular-colored.png', label: 'Angular', hovered: false  },
    { icon: '/assets/img/white-icons/firebase.png', coloredIcon: '/assets/img/colored-icons/firebase-colored.png', label: 'Firebase', hovered: false  },
    { icon: '/assets/img/white-icons/material_design.png', coloredIcon: '/assets/img/colored-icons/md-colored.png', label: 'Material Design', hovered: false  },
    { icon: '/assets/img/white-icons/git.png', coloredIcon: '/assets/img/colored-icons/git-colored.png', label: 'Git', hovered: false  },
    { icon: '/assets/img/white-icons/api.png', coloredIcon: '/assets/img/colored-icons/api-colored.png', label: 'API', hovered: false  },
    { icon: '/assets/img/white-icons/python.png', coloredIcon: '/assets/img/colored-icons/python-colored.png', label: 'Python', hovered: false  },
    { icon: '/assets/img/white-icons/scrum.png', coloredIcon: '/assets/img/colored-icons/scrum-colored.png', label: 'Scrum', hovered: false  },
  ];

  hoveredSkill: string | null = null; // Aktuelles Icon
}
