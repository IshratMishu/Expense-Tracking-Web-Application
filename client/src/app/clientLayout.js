'use client'
import { Toaster } from "react-hot-toast";
import { Provider } from "react-redux";
import store from "./store";

export default function ClientLayout({ children }) {
    return (
        <>
            <Provider store={store}>
                <div>{children}</div>
                <Toaster />
            </Provider>
        </>
    );
}
