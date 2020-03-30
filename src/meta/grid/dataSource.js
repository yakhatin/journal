import CustomStore from 'devextreme/data/custom_store';
import { post } from '../meta';

const getDataSource = (dataSourceName, key = null, params = {}) => {
    return new CustomStore({
        insert: async (loadOptions) => {
            return post(`${dataSourceName}/insert`, {
                ...params,
                ...loadOptions
            });
        },
        load: async (loadOptions) => {
            return post(dataSourceName, params);
        },
        update: async (oldValues, newValues) => {
            const defaultData = {
                ...params,
                id: oldValues[key || 'id'],
            };
            const data = dataSourceName === 'journal' ?
                Object.assign(defaultData, { values: newValues }) :
                Object.assign(defaultData, newValues);
            return post(`${dataSourceName}/update`, data);
        },
        remove: async (data) => {
            return post(`${dataSourceName}/delete`, {
                ...params,
                id: data[key || 'id']
            });
        }
    });
};

export default getDataSource;