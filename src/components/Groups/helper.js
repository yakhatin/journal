const addGroup = (id, name) => {
    let storedGroups = [];
    const storedGroupsString = window.localStorage.getItem('groups');
    if (typeof storedGroupsString === 'string') {
        storedGroups = JSON.parse(storedGroupsString);
    }
    storedGroups.push({ id, name })
    window.localStorage.setItem('groups', JSON.stringify(storedGroups));
};

export const getGroudData = (id) => {
    const storedGroupData = window.localStorage.getItem(id);
    if (typeof storedGroupData === 'string') {
        return JSON.parse(storedGroupData);
    }
    return [];
};

export const updateGroupData = (data, groupId, groupName, type) => {
    let storedGroup = [];
    const storedGroupString = window.localStorage.getItem(groupId);

    if (typeof storedGroupString === 'string') {
        storedGroup = JSON.parse(storedGroupString);
    } else {
        addGroup(groupId, groupName);
    }

    switch (type) {
        case 'delete': {
            const index = storedGroup.findIndex(el => el.id === (data.id || data['__KEY__']));
            storedGroup.splice(index, 1);
            break;
        }
        case 'insert': {
            storedGroup.push({ id: data['__KEY__'], name: data.name });
            break;
        }
        case 'update': {
            storedGroup.find(el => el.id === (data.id || data['__KEY__'])).name = data.name;
            break;
        }
    }

    window.localStorage.setItem(groupId, JSON.stringify(storedGroup));
};

export const getGroups = () => {
    const storedGroups = window.localStorage.getItem('groups');
    if (typeof storedGroups === 'string') {
        return JSON.parse(storedGroups);
    }
    return [];
};