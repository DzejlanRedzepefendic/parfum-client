export const getTitleFromPathname = (pathname: string): string => {
    const parts = pathname.split('/').filter(Boolean);
    if (parts.length === 0) return '';

    const route = parts[0].toLowerCase();

    switch (route) {
        case 'home':
            return 'Početna';
        case 'article':
            return 'Parfemi';
        case 'team':
            return 'Tim';
        case 'logs':
            return 'Logovi';
        case 'company':
            return 'Musterije';
        case 'login':
            return 'Prijava';
        default:
            return route[0].toUpperCase() + route.slice(1);
    }
};
