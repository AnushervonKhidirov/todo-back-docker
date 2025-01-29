import type { StatusOk, StatusServerError, StatusNotFound } from '../type/status'

export default class Status {
    ok<T>(data: T = {} as T, message?: string): StatusOk<T> {
        return {
            status: 200,
            message: message ?? 'Success',
            data: data,
        }
    }

    serverError(message?: string): StatusServerError {
        return {
            status: 500,
            message: message ?? 'Internal Server Error',
        }
    }

    notFound(message?: string): StatusNotFound {
        return {
            status: 404,
            message: message ?? 'Not found',
        }
    }
}
