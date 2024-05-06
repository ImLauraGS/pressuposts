import React, { createContext, useContext, useState } from 'react';

const CheckboxContext = createContext();

export const CheckboxProvider = ({ children }) => {
    const [checkedItems, setCheckedItems] = useState({});
    const [totalPages, setTotalPages] = useState(0);
    const [totalLanguages, setTotalLanguages] = useState(0);
    const [selectedService, setSelectedService] = useState(null); // Agregar selectedService al estado del contexto

    const value = {
        checkedItems,
        setCheckedItems,
        totalPages,
        setTotalPages,
        totalLanguages,
        setTotalLanguages,
        selectedService, 
        setSelectedService, 
    };

    return (
        <CheckboxContext.Provider value={value}>
            {children}
        </CheckboxContext.Provider>
    );
};

export const useCheckboxContext = () => useContext(CheckboxContext);