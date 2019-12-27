const formatDate = (date) => {
    var dd = date.getDate();
    if (dd < 10) dd = '0' + dd;

    var mm = date.getMonth() + 1;
    if (mm < 10) mm = '0' + mm;

    var yy = date.getFullYear() % 100;
    if (yy < 10) yy = '0' + yy;

    return dd + '.' + mm + '.' + yy;
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

export const getDataSource = () => {
    const persistedData = window.localStorage.getItem('data');
    if (typeof persistedData === 'string') {
        return JSON.parse(persistedData);
    } else {
        window.localStorage.setItem('data', JSON.stringify([]));
        return [];
    }
};

export const getCurrentDate = () => {
    const date = new Date();
    return formatDate(date);
};

export const getHeaderHeight = () => {
    return document.querySelector('.header-container') ? document.querySelector('.header-container').offsetHeight + 20 : 0;
};

export const updateColumns = (columns = []) => {
    const lastColumn = columns[columns.length - 1];
    window.localStorage.setItem('columns', JSON.stringify(columns));
    const dataSource = getDataSource();
    const newDataSource = dataSource.map(el => ({
        ...el,
        [lastColumn.dataField]: false
    }));
    window.localStorage.setItem('data', JSON.stringify(newDataSource));
};

export const updateDataSource = (data, type = 'update') => {
    const dataSource = getDataSource();
    const index = dataSource.findIndex(el => el.id === data.id);
    let updated = false;

    switch (type) {
        case 'update': {
            dataSource[index] = data;
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
        window.localStorage.setItem('data', JSON.stringify(dataSource));
    }
};