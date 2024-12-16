import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-popup',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './popup.component.html',
  styleUrls: ['./popup.component.scss'],
})
export class PopupComponent {
  isPopupVisible = false;

  // Array von Projekten
  projects = [
    {
      projectNumber: '01',
      projectTitle: 'Pokedex',
      projectDescriptionTitle: 'What is this project about?',
      projectDescription: 'An interactive Pokedex inspired by the Pokémon universe. Search, explore, and view details about Pokémon using data from the PokéAPI. The app features smooth navigation, detailed Pokémon stats, and visuals, providing a seamless experience for Pokémon enthusiasts.',
      projectImage: '/assets/img/portrait.jpg',
      githubLink: 'https://github.com',
      liveTestLink: 'https://taskmanager.com',
      techStack: [
        { name: 'HTML', icon: '/assets/img/colored-icons/html-colored.png' },
        { name: 'CSS', icon: '/assets/img/colored-icons/css-colored.png' },
        { name: 'JavaScript', icon: '/assets/img/colored-icons/js-colored.png' },
        { name: 'API', icon: '/assets/img/colored-icons/api-colored.png' },
      ],
    },
    {
      projectNumber: '02',
      projectTitle: 'Join',
      projectDescriptionTitle: 'What is this project about?',
      projectDescription: 'Task manager inspired by the Kanban System. Create and organize tasks using drag and drop functions, assign users and categories.',
      projectImage: '/assets/img/portrait.jpg',
      githubLink: 'https://github.com',
      liveTestLink: 'https://example.com',
      techStack: [
        { name: 'HTML', icon: '/assets/img/colored-icons/html-colored.png' },
        { name: 'CSS', icon: '/assets/img/colored-icons/css-colored.png' },
        { name: 'JavaScript', icon: '/assets/img/colored-icons/js-colored.png' },
      ],
    },
    {
      projectNumber: '03',
      projectTitle: 'El Pollo Loco',
      projectDescriptionTitle: 'What is this project about?',
      projectDescription: 'Jump, run and throw game based on object-oriented approach. Help Pepe to find coins and tabasco salsa to fight against the crazy hen.',
      projectImage: '/assets/img/portrait.jpg',
      githubLink: 'https://github.com',
      liveTestLink: 'https://example.com',
      techStack: [
        { name: 'HTML', icon: '/assets/img/colored-icons/html-colored.png' },
        { name: 'CSS', icon: '/assets/img/colored-icons/css-colored.png' },
        { name: 'JavaScript', icon: '/assets/img/colored-icons/js-colored.png' },
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
