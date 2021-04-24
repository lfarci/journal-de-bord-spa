import { IFormDialogProps } from "../dialogs/FormDialog";

export function makeFormDialogProps(props: Partial<IFormDialogProps> = {}): IFormDialogProps {
    return {
        open: false,
        title: "FormDialog",
        loading: false,
        error: undefined,
        children: "This is my content",
        onClose: () => {},
        ...props
    };
}