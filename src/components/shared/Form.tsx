import { toast } from "sonner";

import { useActionFeedback } from "@/hooks/use-action-feedback";
import { ActionState } from "@/utils/to-action-state";

type FormProps = {
    action: (payload: FormData) => void;
    actionState: ActionState;
    children: React.ReactNode;
    onSuccess?: (actionState: ActionState) => void;
    onError?: (actionState: ActionState) => void;
}

const Form = ({ action, actionState, children, onSuccess, onError }: FormProps) => {
    useActionFeedback(actionState, {
        onSuccess: ({ actionState }) => {
            if (actionState.message) {
                toast.success(actionState.message)
            }

            onSuccess?.(actionState)
        },
        onError: ({ actionState }) => {
            if (actionState.message) {
                toast.error(actionState.message)
            } else if (Object.keys(actionState.fieldErrors).length > 0) {
                toast.error("Please check the form for errors")
            }

            onError?.(actionState)
        }
    })

    return (
        <form action={action} className="flex flex-col gap-y-2">
            {children}
        </form>
    )
}

export { Form }