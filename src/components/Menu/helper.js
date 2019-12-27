export const getMenuData = () => {
    const storedMenuString = window.localStorage.getItem('menu-data');
    if (typeof storedMenuString === 'string') {
        return JSON.parse(storedMenuString);
    }
    return [];
};