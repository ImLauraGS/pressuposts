import React, { createContext, useContext, useState } from 'react';
import { ServiceProps } from '../types/types';

interface CheckboxContextType {
    checkedItems: Record<string, boolean>;
    setCheckedItems: React.Dispatch<React.SetStateAction<Record<string, boolean>>>;
    totalPages: number;
    setTotalPages: React.Dispatch<React.SetStateAction<number>>;
    totalLanguages: number;
    setTotalLanguages: React.Dispatch<React.SetStateAction<number>>;
    selectedService: ServiceProps | null;
    setSelectedService: React.Dispatch<React.SetStateAction<ServiceProps | null>>;
}

const CheckboxContext = createContext<CheckboxContextType>({
    checkedItems: {},
    setCheckedItems: () => {},
    totalPages: 0,
    setTotalPages: () => {},
    totalLanguages: 0,
    setTotalLanguages: () => {},
    selectedService: null,
    setSelectedService: () => {},
});

export const CheckboxProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [checkedItems, setCheckedItems] = useState<Record<string, boolean>>({});
    const [totalPages, setTotalPages] = useState<number>(0);
    const [totalLanguages, setTotalLanguages] = useState<number>(0);
    const [selectedService, setSelectedService] = useState<ServiceProps | null>(null); 

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