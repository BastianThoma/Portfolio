import { Component } from '@angular/core';
import { LandingPageComponent } from '../landing-page/landing-page.component';
import { AboutMeComponent } from '../about-me/about-me.component';
import { SkillsComponent } from '../skills/skills.component';
import { ProjectsComponent } from '../projects/projects.component';
import { FeedbackComponent } from '../feedback/feedback.component';
import { ContactComponent } from '../contact/contact.component';
@Component({
  selector: 'app-main-content',
  standalone: true,
  imports: [
    LandingPageComponent,
    AboutMeComponent,
    SkillsComponent,
    ProjectsComponent,
    FeedbackComponent,
    ContactComponent,
  ],
  templateUrl: './main-content.component.html',
  styleUrl: './main-content.component.scss',
})
export class MainContentComponent {}
