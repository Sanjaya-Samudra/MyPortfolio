import { Component, OnInit, AfterViewInit, ElementRef, ViewChildren, QueryList } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';


@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css'
})
export class DashboardComponent implements OnInit, AfterViewInit{

  @ViewChildren('video') videos!: QueryList<ElementRef<HTMLVideoElement>>;

  fullText = "In the tapestry of code and creativity, I am the weaver of extraordinary digital experiences, harmonizing technical prowess with visionary artistry. Step into my universe where innovation knows no bounds.";
  currentText = '';
  isTyping = true;
  private typeSpeed = 50; // ms per character
  private pauseTime = 2000; // ms to pause after typing
  private eraseSpeed = 30; // ms per character for erasing

  constructor(private router: Router, private activatedRoute: ActivatedRoute) {}

  ngOnInit(): void{
    
  }

  ngAfterViewInit(): void {
    setTimeout(() => {
      this.videos.forEach(video => {
        video.nativeElement.play().catch(err => {
          console.log('Autoplay failed:', err);
        });
      });
    }, 1000);

    // Start typewriter effect
    this.startTypewriter();
  }

  private startTypewriter() {
    this.typeText();
  }

  private typeText() {
    let i = 0;
    const typeInterval = setInterval(() => {
      if (i < this.fullText.length) {
        this.currentText += this.fullText.charAt(i);
        i++;
      } else {
        clearInterval(typeInterval);
        setTimeout(() => {
          this.eraseText();
        }, this.pauseTime);
      }
    }, this.typeSpeed);
  }

  private eraseText() {
    let i = this.currentText.length;
    const eraseInterval = setInterval(() => {
      if (i > 0) {
        this.currentText = this.currentText.substring(0, i - 1);
        i--;
      } else {
        clearInterval(eraseInterval);
        setTimeout(() => {
          this.typeText();
        }, 500); // Short pause before restarting
      }
    }, this.eraseSpeed);
  }

  navigateToProjects() {
    this.router.navigate(['../projects'], { relativeTo: this.activatedRoute });
  }

}
