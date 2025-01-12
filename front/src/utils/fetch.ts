/**
 * 異步呼叫api, 只可用響應體為 json 的 api
 * @param api 要呼叫的api
 * @returns json 結果
 */
export async function asyncGet(api: string):Promise<any>{
    try {
        const res: Response = await fetch(api)
        try {
            return await res.json()
        } catch (error) {
            return error
        }
    } catch (error) {
        return error
    }
}

export async function asyncPost(api: string, body: {} | FormData) {
    const res: Response = await fetch(api, {
        method: 'POST',
        credentials: 'include',
        headers:new Headers({
            'Access-Control-Allow-Origin':"http://localhost:5173/",
            'content-Type':"application/json"
        }),
        body: body instanceof FormData?body:JSON.stringify(body),
        mode:"cors"
    })
    try {
        let data = res.json()
        return data
    } catch (error) {
        console.error(error)
    }
}

export async function asyncPatch(api: string, body: {} | FormData) {
    const res: Response = await fetch(api, {
        method: 'PATCH',
        headers:new Headers({
            'Access-Control-Allow-Origin':"http://localhost:5173/",
        }),
        body: body instanceof FormData?body:JSON.stringify(body),
        mode:"cors"
    })
    try {
        let data = res.json()
        return data
    } catch (error) {
        console.error(error)
    }
}

/**
 * 異步 PUT 請求
 * @param api 要呼叫的 API URL
 * @param body 請求的資料（JSON 或 FormData）
 * @returns JSON 結果
 */
export async function asyncPut(api: string, body: {} | FormData): Promise<any> {
    const res: Response = await fetch(api, {
        method: 'PUT',
        credentials: 'include',
        headers: new Headers({
            'Access-Control-Allow-Origin': "http://localhost:5173/",
            'content-Type': body instanceof FormData ? 'multipart/form-data' : 'application/json',
        }),
        body: body instanceof FormData ? body : JSON.stringify(body),
        mode: "cors",
    });

    try {
        let data = await res.json();
        return data;
    } catch (error) {
        console.error(error);
    }
}

/**
 * 異步 DELETE 請求
 * @param api 要呼叫的 API URL
 * @param body 可選，請求的資料（JSON 或 FormData）
 * @returns JSON 結果
 */
export async function asyncDelete(api: string, body?: {} | FormData): Promise<any> {
    const res: Response = await fetch(api, {
        method: 'DELETE',
        credentials: 'include',
        headers: new Headers({
            'Access-Control-Allow-Origin': "http://localhost:5173/",
            'content-Type': body instanceof FormData ? 'multipart/form-data' : 'application/json',
        }),
        body: body ? (body instanceof FormData ? body : JSON.stringify(body)) : undefined,
        mode: "cors",
    });

    try {
        let data = await res.json();
        return data;
    } catch (error) {
        console.error(error);
    }
}

import { api } from '../enum/api';

// 添加留言函數
export async function addComment(text: string): Promise<any> {
    try {
        const response = await fetch(api.addComment, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ text }),
        });
        if (!response.ok) {
            throw new Error('Failed to add comment');
        }
        return await response.json();
    } catch (error) {
        console.error('Error adding comment:', error);
        throw error;
    }
}

// 更新留言函數
export async function updateComment(id: number, text: string): Promise<any> {
    try {
        const response = await fetch(`${api.updateComment}/${id}`, {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ text }),
        });
        if (!response.ok) {
            throw new Error('Failed to update comment');
        }
        return await response.json();
    } catch (error) {
        console.error('Error updating comment:', error);
        throw error;
    }
}

// 假設 api.getAllComments 是正確的 API 路徑
export async function getAllComments(): Promise<Comment[]> {
    const response = await fetch(api.getAllUsers); // 這裡改為正確的端點
    if (!response.ok) {
        throw new Error('Failed to fetch comments');
    }
    return await response.json();
}

