import React, { useState } from 'react';
import { EuiGlobalToastList } from '@elastic/eui';
import { Toast } from '@elastic/eui/src/components/toast/global_toast_list';

// global variables
let addToastHandler: (toast: Toast) => void;
let removeAllToastsHandler: () => void;
let toastId = 0;

export const addToast = (toast: Omit<Toast, 'id'>): void => addToastHandler({ ...toast, id: `Toast${toastId}` });

export const removeAllToasts = (): void => removeAllToastsHandler();

const ToastHandler = (): JSX.Element => {
    const [toasts, setToasts] = useState<Toast[]>([]);

    addToastHandler = (toast: Toast): void => {
        setToasts(toasts.concat(toast));
        toastId += 1;
    };

    const removeToast = (removedToast: Toast): void => {
        setToasts(toasts.filter((toast) => toast.id !== removedToast.id));
    };

    removeAllToastsHandler = (): void => {
        setToasts([]);
    };

    return <EuiGlobalToastList side="left" toasts={toasts} dismissToast={removeToast} toastLifeTimeMs={6000} />;
};

export default ToastHandler;
