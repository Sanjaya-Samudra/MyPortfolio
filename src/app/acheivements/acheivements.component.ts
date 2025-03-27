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
    },
    {
      title: 'Python Certification Completion',
      description: 'Earned a certification in Python, demonstrating solid understanding and hands-on experience with the language.',
      icon: 'python-uom.PNG',
      year: 2023,
      color: 'yellow-500'
    }
  ];
}
