export type TTodo = {
    id: string
    text: string
    created_at?: number
}

export type TTodoBody = Omit<TTodo, 'id' | 'created_at'>
