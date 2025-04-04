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
      title: 'JavaScript Mastery',
      description: 'A deep dive into JavaScript and its modern frameworks like React, Vue, and Angular.',
      imageUrl: 'https://via.placeholder.com/400?text=JavaScript+Mastery',
    },
    {
      title: 'CSS Grid & Flexbox',
      description: 'Master modern layout techniques in CSS with Grid and Flexbox to create responsive designs.',
      imageUrl: 'https://via.placeholder.com/400?text=CSS+Grid+%26+Flexbox',
    },
    {
      title: 'Web Accessibility (a11y)',
      description: 'Learn how to make your websites accessible to everyone, including people with disabilities.',
      imageUrl: 'https://via.placeholder.com/400?text=Web+Accessibility',
    }
  ];

  // Array of external learning resources
  resources = [
    {
      title: 'MDN Web Docs',
      description: 'Comprehensive resource for web developers to understand HTML, CSS, JavaScript, and more.',
      link: 'https://developer.mozilla.org/en-US/',
    },
    {
      title: 'freeCodeCamp',
      description: 'An interactive learning platform for web development and programming with coding challenges.',
      link: 'https://www.freecodecamp.org/',
    },
    {
      title: 'CSS Tricks',
      description: 'CSS Tricks provides tips, tricks, and techniques for mastering CSS and front-end development.',
      link: 'https://css-tricks.com/',
    }
  ];
}
