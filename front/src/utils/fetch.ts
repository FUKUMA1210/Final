const api_base = import.meta.env.VITE_API_BASE;

interface RequestOptions {
    headers?: HeadersInit;
}

/**
 * 異步 GET 請求
 */
export async function asyncGet(api: string, options: RequestOptions = {}): Promise<any> {
    try {
        const res: Response = await fetch(`${api_base}${api}`, {
            method: 'GET',
            headers: {
                'Access-Control-Allow-Origin': api_base,
                'Content-Type': 'application/json',
                ...options.headers,
            },
            mode: 'cors',
        });
        return await res.json();
    } catch (error) {
        console.error('Error in asyncGet:', error);
        throw error;
    }
}

/**
 * 異步 POST 請求
 */
export async function asyncPost(api: string, body: {} | FormData, options: RequestOptions = {}): Promise<any> {
    try {
        const res: Response = await fetch(`${api_base}${api}`, {
            method: 'POST',
            headers: {
                'Access-Control-Allow-Origin': api_base,
                'Content-Type': body instanceof FormData ? 'multipart/form-data' : 'application/json',
                ...options.headers,
            },
            body: body instanceof FormData ? body : JSON.stringify(body),
            mode: 'cors',
        });
        return await res.json();
    } catch (error) {
        console.error('Error in asyncPost:', error);
        throw error;
    }
}

/**
 * 異步 PATCH 請求
 */
export async function asyncPatch(api: string, body: {} | FormData, options: RequestOptions = {}): Promise<any> {
    try {
        const res: Response = await fetch(`${api_base}${api}`, {
            method: 'PATCH',
            headers: {
                'Access-Control-Allow-Origin': api_base,
                'Content-Type': body instanceof FormData ? 'multipart/form-data' : 'application/json',
                ...options.headers,
            },
            body: body instanceof FormData ? body : JSON.stringify(body),
            mode: 'cors',
        });
        return await res.json();
    } catch (error) {
        console.error('Error in asyncPatch:', error);
        throw error;
    }
}

/**
 * 異步 DELETE 請求
 */
export async function asyncDelete(api: string, body?: {} | FormData, options: RequestOptions = {}): Promise<any> {
    try {
        const res: Response = await fetch(`${api_base}${api}`, {
            method: 'DELETE',
            headers: {
                'Access-Control-Allow-Origin': api_base,
                'Content-Type': body instanceof FormData ? 'multipart/form-data' : 'application/json',
                ...options.headers,
            },
            body: body ? (body instanceof FormData ? body : JSON.stringify(body)) : undefined,
            mode: 'cors',
        });
        return await res.json();
    } catch (error) {
        console.error('Error in asyncDelete:', error);
        throw error;
    }
}

/**
 * 異步 PUT 請求
 */
export async function asyncPut(api: string, body: {} | FormData, options: RequestOptions = {}): Promise<any> {
    try {
        const res: Response = await fetch(`${api_base}${api}`, {
            method: 'PUT',
            headers: {
                'Access-Control-Allow-Origin': api_base,
                'Content-Type': body instanceof FormData ? 'multipart/form-data' : 'application/json',
                ...options.headers,
            },
            body: body instanceof FormData ? body : JSON.stringify(body),
            mode: 'cors',
        });
        return await res.json();
    } catch (error) {
        console.error('Error in asyncPut:', error);
        throw error;
    }
}