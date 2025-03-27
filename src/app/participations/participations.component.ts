import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';

@Component({
  selector: 'app-participations',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './participations.component.html',
  styleUrl: './participations.component.css'
})
export class ParticipationsComponent {
  participatedProjects = [
    {
      name: 'Japura Xtreame Inter University Hackathon',
      description: 'Collaborated with a team to develop a web app for real-time collaboration and task management. Placing in the top 35 among all competitors highlights strong technical skills and creativity.',
      iconClass: 'text-teal-500',
      iconPath: 'hackathon.jpg',
      year: 2024,
      yearClass: 'text-teal-500'
    },
    {
      name: 'DevFest - Inter University Hackathon',
      description: 'DevFest organized by SLIIT, brought together talented students from various universities to collaborate and innovate.',
      iconClass: 'text-pink-500',
      iconPath: 'devfest.png',
      year: 2025,
      yearClass: 'text-pink-500'
    },
    {
      name: 'SpiritX',
      description: 'SpiritX is a hackathon that challenges all university students to create innovative web or app solutions to real-world problems, fostering creativity, teamwork, and technical skills.',
      iconClass: 'text-green-500',
      iconPath: 'spiritx.png',
      year: 2025,
      yearClass: 'text-green-500'
    },
    {
      name: 'Google Developer Group Program',
      description: 'The Google Developer Group (GDG) is a global community for developers to learn, share, and collaborate on Google technologies through events and workshops.',
      iconClass: 'text-green-500',
      iconPath: 'gdg.PNG',
      year: 2024,
      yearClass: 'text-green'
    }
  ];
}
