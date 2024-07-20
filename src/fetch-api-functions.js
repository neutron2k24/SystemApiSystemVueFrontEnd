//Address for API.
export let apiAddress = 'https://localhost:7060/api';

export let apiKey = 'ihqvkmciorvdwubphzywyefcmfxzvobc';

//Set the API Address
export function setApiSettings(url, key) {
    apiAddress = url;
    apiKey = key;
}

//GET JSON (endpoint must contain leading /)
export function getJsonObjectFromAPI(endPoint) {
    try {
        return fetch(
            apiAddress + endPoint, {
            headers: {
                'x-api-key': apiKey
            }
        }).then(result => {
            return result;
        }).catch(function (err) {
            alert(err);
        });
    }
    catch { alert('error'); return null; }
}

//POST Json Object to Endpoint
export function postJsonObjectToApi(endPoint, data) {
    return fetch(
        apiAddress + endPoint, {
        headers: {
            'x-api-key': apiKey,
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        method: 'POST',
        body: JSON.stringify(data)
    });
}

//POST Json Object to Endpoint
export function putJsonObjectToApi(endPoint, id, data) {
    return fetch(
        apiAddress + endPoint + '/' + id, {
        headers: {
            'x-api-key': apiKey,
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        method: 'PUT',
        body: JSON.stringify(data)
    });
}

//POST Json Object to Endpoint
export function deleteFromApi(endPoint, id) {
    return fetch(
        apiAddress + endPoint + '/' + id, {
        headers: {
            'x-api-key': apiKey
        },
        method: 'DELETE'
    });
}

