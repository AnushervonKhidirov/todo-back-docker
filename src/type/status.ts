export type StatusOk<T> = {
    status: 200
    message: string
    data: T
}

export type StatusServerError = {
    status: 500
    message: string
}

export type StatusNotFound = {
    status: 404
    message: string
}
