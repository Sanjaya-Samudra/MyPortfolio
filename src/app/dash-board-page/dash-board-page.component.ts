import { Component } from '@angular/core';
import { NavigationComponent } from '../common/navigation/navigation.component';
import { Router, RouterOutlet } from '@angular/router';
import { FooterComponent } from "../common/footer/footer.component";
import { CommonModule, NgIf } from '@angular/common';

@Component({
  selector: 'app-dash-board-page',
  standalone: true,
  imports: [NavigationComponent, RouterOutlet, FooterComponent, CommonModule, NgIf],
  templateUrl: './dash-board-page.component.html',
  styleUrl: './dash-board-page.component.css',
})
export class DashBoardPageComponent {
  constructor(public router: Router) {}
}
