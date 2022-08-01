import { createContext, useContext, useState, useCallback } from "react";

export const InvalidDataNotificationContext = createContext();

// export function debounce(func, timeout = 350) {
export function debounce(func, timeout = 500) {
    let timer;
    return (...args) => {
        clearTimeout(timer);
        timer = setTimeout(() => { func.apply(this, args); }, timeout);
    };
};

const initialState = { name: '' };

export const InvalidDataNotificationProvider = ({
    children
}) => {
    const [errors, setErrors] = useState(initialState);

    const addInvalidDataNotification = useCallback((message) => {
        setErrors(state => ({ ...state, name: message }));

        setTimeout(() => {
            setErrors(initialState);
        }, 5000);
    }, [initialState]);

    return (
        <InvalidDataNotificationContext.Provider value={{errors, addInvalidDataNotification}}>
            {children}
        </InvalidDataNotificationContext.Provider>
    )
};

export const useInvalidDataNotificationContext = () => {
    const state = useContext(InvalidDataNotificationContext);
    return state;
};
