import React from 'react';
import { useCheckboxContext } from '../providers/CheckboxProvider';

export default function Total() {
    const { selectedService, totalPages, totalLanguages } = useCheckboxContext();

    console.log(selectedService, totalPages, totalLanguages);

    const calculateTotalCost = () => {
        if (selectedService) {
            const websiteTotal = (totalPages + totalLanguages) * 30;
            const budgetTotal = websiteTotal + selectedService.price;
            return { budgetTotal, websiteTotal };
        }
        return { budgetTotal: 0, websiteTotal: 0 };
    }

    const { budgetTotal } = calculateTotalCost();

    return (
        <section>
            <h2>Total Price</h2>
            <p>{budgetTotal}€</p>
        </section>
    );
}