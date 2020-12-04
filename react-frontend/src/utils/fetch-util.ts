interface QueryParams {
    [key: string]: any;
}

export const fetchWithQueryParams = (url: string, params: QueryParams): Promise<Response> => {
    const esc = encodeURIComponent;
    const query = Object.keys(params)
        .map((key) => `${esc(key)}=${esc(params[key])}`)
        .join('&');
    return fetch(`${url}?${query}`);
};

export const fetchWithJsonBody = (url: string, reqBody: QueryParams): Promise<Response> => {
    return fetch(url, {
        method: 'POST',
        headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(reqBody),
    });
};
