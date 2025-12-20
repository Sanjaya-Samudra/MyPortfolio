import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';

@Component({
  selector: 'app-acheivements',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './acheivements.component.html',
  styleUrl: './acheivements.component.css'
})
export class AcheivementsComponent {
  achievements = [
    {
      title: 'Top 68 Local Rank in ProjectEuler+',
      description: 'I participated in the ProjectEuler+ HackerRank contest that involved solving algorithmic and mathematical problems, showcasing my problem-solving skills and proficiency in coding challenges.',
      icon: 'MyCurrentGlobalRank.png',
      year: 2024,
      color: 'teal-500'
    },
    {
      title: '3rd Place Winner in CODEFUSE\'24 Hackathon',
      description: 'I placed 3rd in the CODEFUSE\'24, showcasing my skills in programming. This achievement highlights my problem-solving abilities and earned me a certificate of recognition.',
      icon: 'codefuse.PNG',
      year: 2024,
      color: 'pink-500'
    }
  ];

  selectedAchievement: any = null;
  showModal = false;

  getRibbonColor(color: string): string {
    const colorMap: { [key: string]: string } = {
      'teal-500': 'linear-gradient(45deg, #14b8a6, #0f766e)',
      'pink-500': 'linear-gradient(45deg, #ec4899, #be185d)'
    };
    return colorMap[color] || 'linear-gradient(45deg, #6b7280, #4b5563)';
  }

  openModal(achievement: any) {
    this.selectedAchievement = achievement;
    this.showModal = true;
  }

  closeModal() {
    this.showModal = false;
    this.selectedAchievement = null;
  }
}
