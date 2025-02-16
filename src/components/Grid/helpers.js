import { getGroudData } from '../Groups/helper';

const apiUrl = process.env.REACT_APP_API_URL;

const formatDate = (date) => {
    var dd = date.getDate();
    if (dd < 10) dd = '0' + dd;

    var mm = date.getMonth() + 1;
    if (mm < 10) mm = '0' + mm;

    var yy = date.getFullYear();

    return yy + '-' + mm + '-' + dd;
};

export const getColumns = () => {
    const persistedData = window.localStorage.getItem('columns');
    if (typeof persistedData === 'string') {
        return JSON.parse(persistedData);
    } else {
        window.localStorage.setItem('columns', JSON.stringify([]));
        return [];
    }
};

const dataSourceWithGroupData = (groupId, journalData) => {
    const groupData = getGroudData(groupId);
    const columns = [{ dataField: 'name', caption: 'ФИО', sortOrder: 'asc', fixed: true }];
    columns.push(...journalData.columns);
    const defaultValues = journalData.columns.reduce((obj, item) => {
        obj[item.dataField] = false;
        return obj
    }, {})
    const dataSource = groupData.map(group => {
        const index = journalData.dataSource.findIndex(j => j.id === group.id);
        if (index > -1) {
            return {
                ...group,
                ...journalData.dataSource[index]
            };
        }
        return {
            ...group,
            ...defaultValues
        };
    });
    return { dataSource, columns };
};

export const getDataSource = async (dataSourceName, params) => {
    try {
        const response = await fetch(`${apiUrl}${dataSourceName}`, {
            method: 'POST',
            body: JSON.stringify(params)
        });
        const { success, data, message } = await response.json();
        if (success) {
            return data;
        }
        throw new Error(message);
    } catch (err) {
        throw new Error(err);
    }
};

export const getCurrentDate = () => {
    const date = new Date();
    return formatDate(date);
};

export const getHeaderHeight = () => {
    return document.querySelector('.header-container') ? document.querySelector('.header-container').offsetHeight + 20 : 0;
};

export const updateColumns = (columns = [], dataSourceId) => {
    const data = getDataSource(dataSourceId);
    const lastColumn = columns[columns.length - 1];
    data.columns = columns;
    const newDataSource = data.dataSource.map(el => ({
        ...el,
        [lastColumn.dataField]: false
    }));
    data.dataSource = newDataSource;
    window.localStorage.setItem(dataSourceId, JSON.stringify(data));
};

export const updateDataSource = (data, dataSourceId, type = 'update') => {
    console.log(data);
    const storedData = getDataSource(dataSourceId);
    const { dataSource } = storedData;
    let index = dataSource.findIndex(el => el.id === data.id);
    let updated = false;

    switch (type) {
        case 'update': {
            if (index < 0) {
                dataSource.push(data)
            } else {
                dataSource[index] = data;
            }
            updated = true;
            break;
        }
        case 'delete': {
            dataSource.splice(index, 1);
            updated = true;
            break;
        }
        case 'insert': {
            dataSource.push({ id: data['__KEY__'], ...data });
            updated = true;
            break;
        }
    };

    if (updated) {
        window.localStorage.setItem(dataSourceId, JSON.stringify(storedData));
    }
};