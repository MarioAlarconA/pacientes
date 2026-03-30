import { Routes } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { PacientesComponent } from './components/pacientes/pacientes.component';
import { authGuard } from './guards/auth.guard';
import { PeliculasComponent } from './components/peliculas/peliculas.component';

export const routes: Routes = [
  { path: '', redirectTo: '/login', pathMatch: 'full' },
  { path: 'login', component: LoginComponent },
  {
    path: 'pacientes',
    component: PacientesComponent,
    canActivate: [authGuard]
  },
  {
    path: 'peliculas',
    component: PeliculasComponent,
    canActivate: [authGuard]
  },
  { path: '**', redirectTo: '/login' }
];