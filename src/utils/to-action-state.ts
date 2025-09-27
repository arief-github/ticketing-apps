import { ZodError } from "zod";

export type ActionState = {
    message: string;
    payload?: FormData;
    fieldErrors: Record<string, string[] | undefined>
}

export const fromErrorToActionState = (error: unknown, formData: FormData): ActionState => {
    // error instance from zodError
    if (error instanceof ZodError) {
        const flatten = error.flatten((issue) => issue.message)

        return {
            message: "",
            fieldErrors: flatten.fieldErrors,
            payload: formData
        }
    } else if (error instanceof Error) {
        return {
            message: error.message,
            fieldErrors: {},
            payload: formData
        }
    }
    else {
        return {
            message: "an unknown error occured",
            fieldErrors: {},
            payload: formData
        }
    }
}