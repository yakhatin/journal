export const getMenuData = () => {
    const storedMenuString = window.localStorage.getItem('menu-data');
    if (typeof storedMenuString === 'string') {
        return JSON.parse(storedMenuString);
    }
    return [];
};

export const addMenuData = (data) => {
    try {
        const id = new Date().valueOf();
        let allMenuData = [];
        const storedMenuString = window.localStorage.getItem('menu-data');
        if (typeof storedMenuString === 'string') {
            allMenuData = JSON.parse(storedMenuString);
        }
        const menuData = {
            id: id,
            text: data.name,
            expanded: false,
            items: data.groups.map(el => ({
                targetId: el.id,
                id: `${id}_${el.id}`,
                text: el.name,
                items: data.types.map(typeData => ({
                    targetId: typeData.type,
                    id: `${id}_${typeData.type}`,
                    text: typeData.text
                }))
            }))
        };
        allMenuData.push(menuData);
        window.localStorage.setItem('menu-data', JSON.stringify(allMenuData));
        return { success: true, error: null };
    } catch (error) {
        return { success: false, error };
    };
};