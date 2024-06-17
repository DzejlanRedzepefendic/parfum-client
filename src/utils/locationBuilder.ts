export const getTitleFromPathname = (pathname: string): string => {
    const parts = pathname.split('/').filter(Boolean);
    if (parts.length === 0) return '';
    return parts[0][0].toUpperCase() + parts[0].slice(1);
  };