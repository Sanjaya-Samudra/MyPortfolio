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

  onMouseMove(event: MouseEvent) {
    const card = event.currentTarget as HTMLElement;
    const rect = card.getBoundingClientRect();
    const x = event.clientX - rect.left;
    const y = event.clientY - rect.top;
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;
    const rotateX = (y - centerY) / centerY * -10; // Reduced sensitivity for smoother effect
    const rotateY = (x - centerX) / centerX * 10;
    card.style.transform = `perspective(1200px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateZ(40px) scale(1.05)`;
    card.style.boxShadow = '0 25px 50px -12px rgba(0, 0, 0, 0.25), 0 0 0 1px rgba(34, 211, 238, 0.1)';
  }

  onMouseLeave(event: MouseEvent) {
    const card = event.currentTarget as HTMLElement;
    card.style.transform = '';
    card.style.boxShadow = '';
  }
}
