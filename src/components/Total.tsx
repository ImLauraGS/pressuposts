import React from 'react';
import { ServiceProps } from '../types/types';

interface Props {
    selectedService: ServiceProps | null;
    totalPages: number;
    totalLanguages: number;
}

export default function Total({ selectedService, totalPages, totalLanguages }: Props) {
    const calculateTotalCost = () => {
        if (selectedService) {
            
            const websiteTotal = (totalPages + totalLanguages) * 30;
            const budgetTotal = websiteTotal + selectedService.price;

            console.log(selectedService.price, totalPages, totalLanguages )
            
            return { budgetTotal, websiteTotal };
        }
        return { budgetTotal: 0, websiteTotal: 0 };
    }
    

    const { budgetTotal, websiteTotal } = calculateTotalCost();

    return (
        <section>
            <h2>Total Price</h2>
            <p>{budgetTotal}€</p>
        </section>
    );
}