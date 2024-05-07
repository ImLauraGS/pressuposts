import React, { createContext, useContext, useState, useEffect } from 'react';
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
    totalBudget: number; 
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
    totalBudget: 0, 
});

export const CheckboxProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [checkedItems, setCheckedItems] = useState<Record<string, boolean>>({});
    const [totalPages, setTotalPages] = useState<number>(0);
    const [totalLanguages, setTotalLanguages] = useState<number>(0);
    const [selectedService, setSelectedService] = useState<ServiceProps | null>(null);
    const [totalBudget, setTotalBudget] = useState<number>(0); // Nuevo estado para totalBudget

    
    useEffect(() => {
        if (selectedService) {
            const websiteTotal = (totalPages + totalLanguages) * 30;
            const budgetTotal = websiteTotal + selectedService.price;
            setTotalBudget(budgetTotal);
        } else {
            setTotalBudget(0);
        }
    }, [selectedService, totalPages, totalLanguages]);

    const value = {
        checkedItems,
        setCheckedItems,
        totalPages,
        setTotalPages,
        totalLanguages,
        setTotalLanguages,
        selectedService,
        setSelectedService,
        totalBudget, 
    };

    return (
        <CheckboxContext.Provider value={value}>
            {children}
        </CheckboxContext.Provider>
    );
};

export const useCheckboxContext = () => useContext(CheckboxContext);