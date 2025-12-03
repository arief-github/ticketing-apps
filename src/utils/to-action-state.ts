import { ZodError } from "zod";

export type ActionState = {
    status?: 'SUCCESS' | 'ERROR'
    message: string;
    payload?: FormData;
    fieldErrors: Record<string, string[] | undefined>;
    timestamp: number;
}

export const EMPTY_ACTION_STATE: ActionState = {
    message: "",
    fieldErrors: {},
    timestamp: Date.now()
}

export const toActionState = (status: ActionState['status'], message: string, formData?: FormData): ActionState => {
    return { status, message, fieldErrors: {}, payload: formData, timestamp: Date.now() }
}

export const fromErrorToActionState = (error: unknown, formData?: FormData): ActionState => {
    // error instance from zodError
    if (error instanceof ZodError) {
        const flatten = error.flatten((issue) => issue.message)

        return {
            status: 'ERROR',
            message: "",
            fieldErrors: flatten.fieldErrors,
            payload: formData,
            timestamp: Date.now()
        }
    } else if (error instanceof Error) {
        return {
            status: 'ERROR',
            message: error.message,
            fieldErrors: {},
            payload: formData,
            timestamp: Date.now()
        }
    }
    else {
        return {
            status: 'ERROR',
            message: "an unknown error occured",
            fieldErrors: {},
            payload: formData,
            timestamp: Date.now()
        }
    }
}