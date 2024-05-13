import React, { useEffect, useState } from 'react';
import { useCheckboxContext } from '../providers/CheckboxProvider';
import { servicesApi } from '../services/service';
import { ServiceProps } from '../types/types';
import { Typography } from "@material-tailwind/react";

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
        <section className='flex w-[70%] justify-end item-end mb-20 mt-5'>
            <Typography variant="h2" color="blue-gray">
            Preu pressupostat: {budgetTotal}€
          </Typography>
        </section>
    );
}