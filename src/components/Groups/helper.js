const addGroup = (id, name) => {
    let storedGroups = [];
    const storedGroupsString = window.localStorage.getItem('groups');
    if (typeof storedGroupsString === 'string') {
        storedGroups = JSON.parse(storedGroupsString);
    }
    storedGroups.push({ id, name })
    window.localStorage.setItem('groups', JSON.stringify(storedGroups));
};

export const createGroup = (data, id, groupName) => {
    const groupId = `group_${id}`;
    let storedGroup = [];
    const storedGroupString = window.localStorage.getItem(groupId);
    if (typeof storedGroupString === 'string') {
        storedGroup = JSON.parse(storedGroupString);
    } else {
        addGroup(groupId, groupName);
    }
    storedGroup.push({ id: data['__KEY__'], name: data.name });
    window.localStorage.setItem(groupId, JSON.stringify(storedGroup));
};

export const getGroups = () => {
    const storedGroups = window.localStorage.getItem('groups');
    if (typeof storedGroups === 'string') {
        return JSON.parse(storedGroups);
    }
    return [];
};