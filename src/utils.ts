import fetch, {RequestInit} from 'node-fetch'

export async function API<T>(url: string, wrapping?:boolean,init?: RequestInit): Promise<T>{
    try {


        const response = await fetch(url, init);
        if (!response.ok) {
            throw new Error(response.statusText)
        }

        if (wrapping) {
            const wrapped = await response.json() as Promise<{data : T}>
            const { data } = await wrapped;
            return data
        } else {
            const notWrapped = await response.json() as Promise<T>
            return notWrapped;
        }
        //let consumer takes this one.
    } catch (e) {
        throw new Error(e);
    }
}

export function pickRandomElementFrom<T>(list : Array<T>){
    return list[Math.floor(Math.random() * list.length)]
}
