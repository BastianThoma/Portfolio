import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TranslateService, TranslateModule } from '@ngx-translate/core';
@Component({
  selector: 'app-popup',
  standalone: true,
  imports: [CommonModule, TranslateModule],
  templateUrl: './popup.component.html',
  styleUrls: ['./popup.component.scss'],
})
export class PopupComponent {
  constructor(private translate: TranslateService) {}

  isPopupVisible = false;

  // Array von Projekten
  projects = [
    {
      projectNumber: '01',
      projectTitle: 'Pokedex',
      projectDescriptionTitle: 'POPUP.DESCRIPTION_TITLE',
      projectDescription: 'POPUP.DESCRIPTION1',
      projectImage: '/assets/img/pokedex.png',
      githubLink: 'https://github.com',
      liveTestLink: 'https://taskmanager.com',
      techStack: [
        { name: 'HTML', icon: '/assets/img/colored-icons/html-colored.png' },
        { name: 'CSS', icon: '/assets/img/colored-icons/css-colored.png' },
        {
          name: 'JavaScript',
          icon: '/assets/img/colored-icons/js-colored.png',
        },
        { name: 'API', icon: '/assets/img/colored-icons/api-colored.png' },
      ],
    },
    {
      projectNumber: '02',
      projectTitle: 'Join',
      projectDescriptionTitle: 'POPUP.DESCRIPTION_TITLE',
      projectDescription: 'POPUP.DESCRIPTION2',
      projectImage: '/assets/img/join.png',
      githubLink: 'https://github.com',
      liveTestLink: 'https://example.com',
      techStack: [
        { name: 'HTML', icon: '/assets/img/colored-icons/html-colored.png' },
        { name: 'CSS', icon: '/assets/img/colored-icons/css-colored.png' },
        {
          name: 'JavaScript',
          icon: '/assets/img/colored-icons/js-colored.png',
        },
      ],
    },
    {
      projectNumber: '03',
      projectTitle: 'El Pollo Loco',
      projectDescriptionTitle: 'POPUP.DESCRIPTION_TITLE',
      projectDescription: 'POPUP.DESCRIPTION3',
      projectImage: '/assets/img/elPolloLoco.png',
      githubLink: 'https://github.com',
      liveTestLink: 'https://example.com',
      techStack: [
        { name: 'HTML', icon: '/assets/img/colored-icons/html-colored.png' },
        { name: 'CSS', icon: '/assets/img/colored-icons/css-colored.png' },
        {
          name: 'JavaScript',
          icon: '/assets/img/colored-icons/js-colored.png',
        },
      ],
    },
  ];

  // Das aktuell angezeigte Projekt
  currentProject = this.projects[0];

  showPopup() {
    this.isPopupVisible = true;
    document.body.style.overflow = 'hidden';
  }

  closePopup() {
    this.isPopupVisible = false;
    document.body.style.overflow = '';
  }

  openLink(url: string) {
    window.open(url, '_blank');
  }

  // Wechseln zum nächsten Projekt
  nextProject() {
    const currentIndex = this.projects.indexOf(this.currentProject);
    const nextIndex = (currentIndex + 1) % this.projects.length; // Zirkulär durch die Projekte
    this.currentProject = this.projects[nextIndex];
  }

  showPopupWithIndex(index: number) {
    this.currentProject = this.projects[index];
    this.showPopup(); // Öffne das Popup mit dem ausgewählten Projekt
  }
}
