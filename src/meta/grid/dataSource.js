import CustomStore from 'devextreme/data/custom_store';
import { post } from '../meta';

export default (dataSourceName, key = null, params = {}) => {
    return new CustomStore({
        load: async (loadOptions) => {
            return post(dataSourceName, params);
        },
        update: async (oldValues, newValues) => {
            return post(`${dataSourceName}/update`, {
                ...params,
                id: oldValues[key],
                values: newValues
            });
        }
    });
};