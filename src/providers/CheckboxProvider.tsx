import React, { createContext, useContext, useState, Dispatch, SetStateAction } from 'react';
import { ServiceProps } from '../types/types';

interface CheckboxContextType {
    checkedItems: Record<string, boolean>;
    setCheckedItems: Dispatch<SetStateAction<Record<string, boolean>>>;
    services: ServiceData[];
    setServices: Dispatch<SetStateAction<ServiceData[]>>;
    selectedService: ServiceProps | null;
    setSelectedService: Dispatch<SetStateAction<ServiceProps | null>>;
    budgetTotal: number; // Agregar budgetTotal al contexto
    setBudgetTotal: Dispatch<SetStateAction<number>>;
}

interface ServiceData {
    id: string;
    pages: number;
    languages: number;
}

const CheckboxContext = createContext<CheckboxContextType>({
    checkedItems: {},
    setCheckedItems: () => {},
    services: [],
    setServices: () => {},
    selectedService: null,
    setSelectedService: () => {},
    budgetTotal: 0, // Establecer el valor predeterminado de budgetTotal
    setBudgetTotal: () => {},
    
});

export const CheckboxProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [checkedItems, setCheckedItems] = useState<Record<string, boolean>>({});
    const [services, setServices] = useState<ServiceData[]>([]);
    const [selectedService, setSelectedService] = useState<ServiceProps | null>(null);
    const [budgetTotal, setBudgetTotal] = useState<number>(0);

    const defaultServiceData: ServiceData = {
        id: '', 
        pages: 0,
        languages: 0,
    };

    const value = {
        checkedItems,
        setCheckedItems,
        services: services.map(service => ({ ...defaultServiceData, ...service })), // Asegúrate de copiar todos los servicios con valores predeterminados
        setServices,
        selectedService,
        setSelectedService,
        budgetTotal, // Agregar budgetTotal al valor del contexto
        setBudgetTotal,
    };

    return (
        <CheckboxContext.Provider value={value}>
            {children}
        </CheckboxContext.Provider>
    );
};

export const useCheckboxContext = () => useContext(CheckboxContext);