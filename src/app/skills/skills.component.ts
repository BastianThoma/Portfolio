import { Component, ViewChild, AfterViewInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SectionCardComponent } from '../section-card/section-card.component';
import { TranslateService, TranslateModule } from '@ngx-translate/core';
import { FocusService } from '../services/focus-service/focus-service';
import Aos from 'aos';
@Component({
  selector: 'app-skills',
  standalone: true,
  imports: [SectionCardComponent, CommonModule, TranslateModule],
  templateUrl: './skills.component.html',
  styleUrls: ['./skills.component.scss'],
})
export class SkillsComponent implements AfterViewInit {
  constructor(
    private translate: TranslateService,
    private focusService: FocusService
  ) {}

  scrollToContactForm(): void {
    document
      .getElementById('contactForm')
      ?.scrollIntoView({ behavior: 'smooth' });
    this.focusService.triggerFocus();
  }

  skills = [
    {
      icon: '/assets/img/white-icons/html.png',
      coloredIcon: '/assets/img/colored-icons/html_colored.png',
      label: 'HTML',
      hovered: false,
    },
    {
      icon: '/assets/img/white-icons/css.png',
      coloredIcon: '/assets/img/colored-icons/css_colored.png',
      label: 'CSS',
      hovered: false,
    },
    {
      icon: '/assets/img/white-icons/javascript.png',
      coloredIcon: '/assets/img/colored-icons/js_colored.png',
      label: 'JavaScript',
      hovered: false,
    },
    {
      icon: '/assets/img/white-icons/typescript.png',
      coloredIcon: '/assets/img/colored-icons/ts_colored.png',
      label: 'TypeScript',
      hovered: false,
    },
    {
      icon: '/assets/img/white-icons/angular.png',
      coloredIcon: '/assets/img/colored-icons/angular_colored.png',
      label: 'Angular',
      hovered: false,
    },
    {
      icon: '/assets/img/white-icons/firebase.png',
      coloredIcon: '/assets/img/colored-icons/firebase_colored.png',
      label: 'Firebase',
      hovered: false,
    },
    {
      icon: '/assets/img/white-icons/material_design.png',
      coloredIcon: '/assets/img/colored-icons/md_colored.png',
      label: 'Material Design',
      hovered: false,
    },
    {
      icon: '/assets/img/white-icons/git.png',
      coloredIcon: '/assets/img/colored-icons/git_colored.png',
      label: 'Git',
      hovered: false,
    },
    {
      icon: '/assets/img/white-icons/api.png',
      coloredIcon: '/assets/img/colored-icons/api_colored.png',
      label: 'API',
      hovered: false,
    },
    {
      icon: '/assets/img/white-icons/python.png',
      coloredIcon: '/assets/img/colored-icons/python_colored.png',
      label: 'Python',
      hovered: false,
    },
    {
      icon: '/assets/img/white-icons/scrum.png',
      coloredIcon: '/assets/img/colored-icons/scrum_colored.png',
      label: 'Scrum',
      hovered: false,
    },
    {
      icon: '/assets/img/colored-icons/growth_mindset.png',
      coloredIcon: '/assets/img/colored-icons/growth_mindset.png',
      label: 'Growth Mindset',
      hovered: false,
    },
  ];

  onHover(skill: any, state: boolean): void {
    skill.hovered = state;
  }

  ngAfterViewInit(): void {
    setTimeout(() => Aos.refresh(), 200);
  }
}
