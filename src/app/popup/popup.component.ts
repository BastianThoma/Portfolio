import { Component, HostListener } from '@angular/core';
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

  projects = [
    {
      projectNumber: '01',
      projectTitle: 'Pokedex',
      projectDescriptionTitle: 'POPUP.DESCRIPTION_TITLE',
      projectDescription: 'POPUP.DESCRIPTION1',
      projectImage: '/assets/img/pokedex.png',
      projectImageAlt: 'POPUP.POKEDEX_IMG_ALT',
      githubLink: 'https://github.com/BastianThoma/PokeDex',
      liveTestLink: '/projects/pokedex',
      techStack: [
        { name: 'HTML', icon: '/assets/img/colored-icons/html_colored.png' },
        { name: 'CSS', icon: '/assets/img/colored-icons/css_colored.png' },
        {
          name: 'JavaScript',
          icon: '/assets/img/colored-icons/js_colored.png',
        },
        { name: 'API', icon: '/assets/img/colored-icons/api_colored.png' },
      ],
    },
    {
      projectNumber: '02',
      projectTitle: 'Join',
      projectDescriptionTitle: 'POPUP.DESCRIPTION_TITLE',
      projectDescription: 'POPUP.DESCRIPTION2',
      projectImage: '/assets/img/join.png',
      projectImageAlt: 'POPUP.JOIN_IMG_ALT',
      githubLink: 'https://github.com/BastianThoma/join',
      liveTestLink: '/projects/join/Login.html',
      techStack: [
        { name: 'HTML', icon: '/assets/img/colored-icons/html_colored.png' },
        { name: 'CSS', icon: '/assets/img/colored-icons/css_colored.png' },
        {
          name: 'JavaScript',
          icon: '/assets/img/colored-icons/js_colored.png',
        },
      ],
    },
    {
      projectNumber: '03',
      projectTitle: 'El Pollo Loco',
      projectDescriptionTitle: 'POPUP.DESCRIPTION_TITLE',
      projectDescription: 'POPUP.DESCRIPTION3',
      projectImage: '/assets/img/el_pollo_loco.png',
      projectImageAlt: 'POPUP.EL_POLLO_LOCO_IMG_ALT',
      githubLink: 'https://github.com/BastianThoma/El-Pollo-Loco',
      liveTestLink: '/projects/el-pollo-loco',
      techStack: [
        { name: 'HTML', icon: '/assets/img/colored-icons/html_colored.png' },
        { name: 'CSS', icon: '/assets/img/colored-icons/css_colored.png' },
        {
          name: 'JavaScript',
          icon: '/assets/img/colored-icons/js_colored.png',
        },
      ],
    },
  ];

  currentProject = this.projects[0];

  showPopup() {
    this.isPopupVisible = true;
    document.body.style.overflow = 'hidden';
  }

  closePopup() {
    this.isPopupVisible = false;
    document.body.style.overflow = '';
  }

  @HostListener('document:keydown.escape')
  onEscapeKey() {
    if (this.isPopupVisible) {
      this.closePopup();
    }
  }

  openLink(url: string) {
    window.open(url, '_blank');
  }

  nextProject() {
    const currentIndex = this.projects.indexOf(this.currentProject);
    const nextIndex = (currentIndex + 1) % this.projects.length;
    this.currentProject = this.projects[nextIndex];
  }

  showPopupWithIndex(index: number) {
    this.currentProject = this.projects[index];
    this.showPopup();
  }
}
