import React, { useEffect, useState } from 'react';
import { servicesApi } from '../services/service';
import { ServiceProps } from '../types/types';
import SelectForm from './SelectForm';

interface Props {
    setSelectedServices: (selectedService: ServiceProps | null) => void;
    setTotalPages: (pages: number) => void;
    setTotalLanguages: (languages: number) => void;
}

export default function Checkbox({ setSelectedServices, setTotalPages, setTotalLanguages }: Props) {
    const [checkedItems, setCheckedItems] = useState<{ [key: string]: boolean }>({});
    const serviceApi = servicesApi();
    const [service, setService] = useState<ServiceProps[]>([]);

    useEffect(() => {
        serviceApi.getAll()
            .then((res) => res.data)
            .then((data) => {
                setService(data);
            });
    }, []);

    const handleCheck = (event: React.ChangeEvent<HTMLInputElement>) => {
        const { id, checked } = event.target;
        setCheckedItems({
            ...checkedItems,
            [id]: checked
        });
        
        if (checked) {
            const selectedService = service.find(item => item.id === id);
            setSelectedServices(selectedService || null);
        } else {
            setSelectedServices(null);
        }
    }

    const handleSelectionChange = (pages: number, languages: number) => {
        setTotalPages(pages);
        setTotalLanguages(languages);
    }
    
    return (
        <form action="">
            {service.map((item, index) => (
                <div key={index}>
                    <label htmlFor={item.id}>{item.name}</label>
                    <p>{item.price}</p>
                    <input type="checkbox"
                        id={item.id}
                        name={item.name}
                        value={item.value}
                        onChange={handleCheck} />
                       {checkedItems[item.id] && <SelectForm onSelectionChange={handleSelectionChange} />}
                </div>
            ))}
        </form>
    );
}