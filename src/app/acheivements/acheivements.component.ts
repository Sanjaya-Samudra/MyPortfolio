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

  achievementHighlights = [
    "Secured Top 68 Local Rank in ProjectEuler+ through relentless problem-solving",
    "3rd Place Winner in CODEFUSE'24 Hackathon after intense coding sessions",
    "Mastered algorithmic challenges and mathematical puzzles with dedication",
    "Transformed complex problems into elegant solutions through persistent effort",
    "Earned recognition for programming excellence and innovative thinking",
    "Pushed boundaries of coding skills to achieve competitive excellence",
    "Demonstrated unwavering commitment to mastering programming challenges",
    "Achieved competitive success through countless hours of practice and learning"
  ];

  currentQuote: string = '';
  currentIndex: number = 0;
  isTyping: boolean = true;
  showCursor: boolean = true;
  selectedAchievement: any = null;
  showModal = false;

  constructor() {
    this.startTypingAnimation();
  }

  startTypingAnimation() {
    this.typeNextSentence();
  }

  typeNextSentence() {
    const sentence = this.achievementHighlights[this.currentIndex];
    this.currentQuote = '';
    this.isTyping = true;

    let charIndex = 0;
    const typeInterval = setInterval(() => {
      if (charIndex < sentence.length) {
        this.currentQuote += sentence[charIndex];
        charIndex++;
      } else {
        clearInterval(typeInterval);
        this.isTyping = false;

        // Wait 3 seconds then pop effect and move to next
        setTimeout(() => {
          this.popAndTransition();
        }, 3000);
      }
    }, 50); // 50ms per character
  }

  popAndTransition() {
    // Add pop class for animation
    const quoteElement = document.querySelector('.rotating-quote');
    if (quoteElement) {
      quoteElement.classList.add('pop-effect');
    }

    setTimeout(() => {
      // Remove pop class and move to next sentence
      if (quoteElement) {
        quoteElement.classList.remove('pop-effect');
      }

      this.currentIndex = (this.currentIndex + 1) % this.achievementHighlights.length;
      this.typeNextSentence();
    }, 500);
  }

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
