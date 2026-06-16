import { Routes } from '@angular/router';

import { MainLayout } from './core/layouts/main-layout/main-layout';

import { Dashboard } from './features/dashboard/pages/dashboard/dashboard';
import { Productos } from './features/productos/pages/productos/productos';
import { Categorias } from './features/categorias/pages/categorias/categorias';
import { Clientes } from './features/clientes/pages/clientes/clientes';
import { Sucursales } from './features/sucursales/pages/sucursales/sucursales';
import { Usuarios } from './features/usuarios/pages/usuarios/usuarios';
import { AuthLayout } from './core/layouts/auth-layout/auth-layout';
import { Login } from './features/auth/pages/login/login';
export const routes: Routes = [
   {
    path: 'auth',
    component: AuthLayout,
    children: [
      {
        path: 'login',
        component: Login
      }
    ]
  },
  {
    
    path: '',
    component: MainLayout,
    children: [
      
      {
        path: '',
        redirectTo: 'dashboard',
        pathMatch: 'full'
      },
      {
        path: 'dashboard',
        component: Dashboard
      },
      {
        path: 'productos',
        component: Productos
      },
      {
        path: 'categorias',
        component: Categorias
      },
      {
        path: 'clientes',
        component: Clientes
      },
      {
        path: 'sucursales',
        component: Sucursales
      },
      {
        path: 'usuarios',
        component: Usuarios
      }
    ]
  }
];
