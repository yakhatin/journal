const apiUrl = process.env.REACT_APP_API_URL;

const headers = new Headers();
headers.append('Content-Type', 'application/json');
headers.append('Accept', 'application/json');

export const post = async (methodName, params = {}) => {
    try {
        const requestParams = {
            method: 'POST',
            headers
        };

        if (Object.keys(params).length > 0) {
            requestParams.body = JSON.stringify(params);
        }

        const response = await fetch(`${apiUrl}${methodName}`, requestParams);
        const { success, data, message } = await response.json();
        if (success) {
            return data;
        }
        throw new Error(message);
    } catch (err) {
        throw new Error(err);
    }
};