import { Pages } from './interfaces/pages';

export const menusAnyUser: (Pages & { order: number, flag?: number })[] = [
    { order: 1, title: 'Home', url: '/home-results', direct: 'root', icon: 'home' },
    { order: 2, title: 'Marcadores', url: '/game-scores', direct: 'root', icon: 'baseball' },
    { order: 4, title: 'Nosotros', url: '/about', direct: 'forward', icon: 'information-circle-outline' },
    { order: 5, title: 'Historia', url: '/about', direct: 'forward', icon: 'information-circle-outline' },
    { order: 6, title: 'Tienda', url: '/tienda', direct: 'forward', icon: 'card' },
    { order: 7, title: 'Configuración', url: '/settings', direct: 'forward', icon: 'cog' }
];

export const menusWithFlag: (Pages & { order: number, flag?: number })[] = [
    { order: 3, title: 'Nuevo partido', url: '/create-game', direct: 'root', icon: 'add-circle-outline', flag: 3 },
    { order: 3, title: 'Configurar usuarios', url: '/profile-users', direct: 'root', icon: 'people', flag: 1 },
];
