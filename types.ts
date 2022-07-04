export interface responseType{
    error: any,
    data: noteType[]
    count: any,
    status: number,
    statusText: string,
    body: noteType[]
}

export interface noteType {
    id? : number,
    title: string,
    notes: string,
    user_id: string
}