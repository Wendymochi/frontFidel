import { MenuItem } from '@data/interfaces/menu-item.interface';

export const MENU_ITEMS: MenuItem[] = [
  {
    label: 'Dashboard',
    icon: 'pi pi-home',
    route: '/dashboard',
  },
  {
    label: 'Productos',
    icon: 'pi pi-box',
    route: '/productos',
  },
  {
    label: 'Categorías',
    icon: 'pi pi-tags',
    route: '/categorias',
  },
  {
    label: 'Clientes',
    icon: 'pi pi-users',
    route: '/clientes',
  },
  {
    label: 'Sucursales',
    icon: 'pi pi-building',
    route: '/sucursales',
  },
  {
    label: 'Usuarios',
    icon: 'pi pi-user',
    route: '/usuarios',
  },
];
