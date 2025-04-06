import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';

@Component({
  selector: 'app-learnings',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './learnings.component.html',
  styleUrl: './learnings.component.css'
})
export class LearningsComponent {
  learnings = [
    {
      title: 'Python Certification Completion',
      description: 'Earned a certification in Python, demonstrating solid understanding and hands-on experience with the language.',
      imageUrl: 'python-uom.PNG',
    },
    {
      title: 'Basics of WordPress',
      description: 'The WordPress Basics course teaches you how to create, manage, and customize websites with themes, plugins, and content.',
      imageUrl: 'wordpress1.png',
    },
    {
      title: 'Build a Complete Website Using WordPress',
      description: 'Create a fully functional website, from setup to launch, including customization, design, and adding essential features.',
      imageUrl: 'wordpress2.png',
    }
  ];

  // Array of external learning resources
  resources = [
    {
      title: 'Coursera',
      description: 'Coursera is an online platform offering courses and certifications from top universities and companies, allowing flexible learning across various subjects.',
      link: 'https://www.coursera.org/',
    },
    {
      title: 'freeCodeCamp',
      description: 'An interactive learning platform for web development and programming with coding challenges.',
      link: 'https://www.freecodecamp.org/',
    },
    {
      title: 'Udemy',
      description: 'Udemy is an online learning platform offering a wide range of courses across various topics, allowing learners to study at their own pace and earn certificates of completion.',
      link: 'https://www.udemy.com/',
    }
  ];
}
