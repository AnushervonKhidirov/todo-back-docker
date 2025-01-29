export type TTodo = {
    id: string
    name: string
}

export type TTodoBody = Omit<TTodo, 'id'>
