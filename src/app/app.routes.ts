import { Routes } from '@angular/router';
import { DashBoardPageComponent } from './dash-board-page/dash-board-page.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { ProjectsComponent } from './projects/projects.component';
import { AcheivementsComponent } from './acheivements/acheivements.component';
import { ParticipationsComponent } from './participations/participations.component';
import { AboutComponent } from './about/about.component';
import { EntertainmentComponent } from './entertainment/entertainment.component';
import { LearningsComponent } from './learnings/learnings.component';

export const routes: Routes = [
    {
        path:'',
        component:DashBoardPageComponent,
        children: [
            {
                path:'dashboard',
                component:DashboardComponent
            },
            {
                path:'projects',
                component:ProjectsComponent
            },
            {
                path:'acheivements',
                component:AcheivementsComponent
            },
            {
                path:'participations',
                component:ParticipationsComponent
            },
            {
                path:'about',
                component:AboutComponent
            },
            {
                path:'entertainment',
                component:EntertainmentComponent
            },
            {
                path:'learnings',
                component:LearningsComponent
            }
        ]
    },
    
];
