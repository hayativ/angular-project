import { Routes } from '@angular/router';
import { Home } from './home/home';
import { About } from './about/about';
import { PaintingsList } from './paintings-list/paintings-list';
import { PaintingDetails } from './painting-details/painting-details';
import { Login } from './login/login';

export const routes: Routes = [
    { path: '', component: Home },
    { path: 'about', component: About },
    { path: 'paintings', component: PaintingsList },
    { path: 'paintings/:id', component: PaintingDetails },
    { path: 'login', component: Login }
];
