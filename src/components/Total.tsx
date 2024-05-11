import React, { useEffect, useState } from 'react';
import { useCheckboxContext } from '../providers/CheckboxProvider';
import { servicesApi } from '../services/service';
import { ServiceProps } from '../types/types';

export default function Total() {
    const serviceApi = servicesApi();
    const [dataApi, setDataApi] = useState<ServiceProps[]>([]);
    const { services, setBudgetTotal, budgetTotal } = useCheckboxContext();

    useEffect(() => {
        serviceApi.getAll()
            .then((res) => res.data)
            .then((data) => {
                console.log("Service Data:", data);
                setDataApi(data);
            });
    }, []); 

    useEffect(() => {
        const calculateTotalCost = () => {
            let totalServices = 0;

            services.forEach(dataApi => {
                totalServices += dataApi.price; 
            });

            let totalPages = 0;
            let totalLanguages = 0;

            services.forEach(item => {
                totalPages += item.pages; 
                totalLanguages += item.languages; 
            });

            const websiteTotal = (totalPages + totalLanguages) * 30; 

            const budgetTotal = totalServices + websiteTotal; 

            return budgetTotal;
        }

        const budgetTotal = calculateTotalCost();
        setBudgetTotal(budgetTotal);
    }, [services, setBudgetTotal]);

    return (
        <section>
            <h2>Total Price</h2>
            <p>Budget Total: {budgetTotal}€</p>
        </section>
    );
}