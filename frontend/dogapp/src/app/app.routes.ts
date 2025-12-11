import { Routes } from '@angular/router';
import { Inicio } from './pages/inicio/inicio';
import { Razas } from './pages/razas/razas';

export const routes: Routes = [
  { path: '', component: Inicio, runGuardsAndResolvers: 'always' },
  { path: 'razas', component: Razas },
];
