export const createId = () => {
    return '_' + Math.random().toString(36).substr(2, 9);
};

export const getMenuData = (selectedId = null) => {
    const storedMenuString = window.localStorage.getItem('menu-data');
    if (typeof storedMenuString === 'string') {
        const storedMenu = JSON.parse(storedMenuString);
        if (selectedId) {
            return storedMenu.map(p1 => {
                return {
                    ...p1,
                    items: p1.items.map(p2 => {
                        return {
                            ...p2,
                            items: p2.items.map(p3 => {
                                return {
                                    ...p3,
                                    expanded: p3.id === selectedId,
                                    selected: p3.id === selectedId
                                }
                            })
                        }
                    })
                }
            });
        }
        return storedMenu;
    }
    return [];
};

export const addMenuData = (data) => {
    try {
        const id = createId();
        let allMenuData = [];
        const storedMenuString = window.localStorage.getItem('menu-data');
        if (typeof storedMenuString === 'string') {
            allMenuData = JSON.parse(storedMenuString);
        }
        const menuData = {
            id: id,
            text: data.name,
            items: data.groups.map(el => ({
                id: `${id}_${el.id}`,
                text: el.name,
                items: data.types.map(typeData => ({
                    link: true,
                    id: `${id}_${el.id}_${typeData.type}`,
                    text: typeData.text,
                    data: {
                        type: typeData.type,
                        group: el.id,
                        groupName: el.name,
                        subjectName: data.name
                    }
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