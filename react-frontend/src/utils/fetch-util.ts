interface QueryParams {
    [key: string]: any;
}

export const fetchBasic = (url: string, reqType: 'DELETE' | 'GET'): Promise<Response> => {
    return fetch(url, {
        method: reqType,
    });
};

export const fetchWithQueryParams = (url: string, params: QueryParams): Promise<Response> => {
    const esc = encodeURIComponent;
    const query = Object.keys(params)
        .map((key) => `${esc(key)}=${esc(params[key])}`)
        .join('&');
    return fetch(`${url}?${query}`);
};

export const fetchWithJsonBody = (url: string, reqType: 'POST' | 'PUT', reqBody: QueryParams): Promise<Response> => {
    return fetch(url, {
        method: reqType,
        headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(reqBody),
    });
};
