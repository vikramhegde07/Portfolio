'use client'

import React, { createContext, useContext, useState } from "react";

type visibilityType = {
    visible: boolean
    changeVisibility: () => void;
}
type PropType = {
    children: React.ReactNode
}

const VisibilityContext = createContext<visibilityType | undefined>(undefined);

export const VisibilityProvider = ({ children }: PropType) => {
    const [visible, setVisible] = useState<boolean>(false);

    const changeVisibility = () => setVisible(!visible);

    return (
        <VisibilityContext.Provider value={{ visible, changeVisibility }}>
            {children}
        </VisibilityContext.Provider>
    )
}

export const useVisibility = () => {
    const context = useContext(VisibilityContext);
    if (!context) throw new Error("useVisibility should be used within VisibilityContext");
    return context;
}