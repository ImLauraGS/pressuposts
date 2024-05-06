import React from 'react';
import { ServiceProps } from '../types/types';

interface Props {
    selectedService: ServiceProps | null;
}

export default function Total({ selectedService }: Props) {
    return (
        <section>
            <h2>Total Price</h2>
            <p>{selectedService ? selectedService.price : '0'}</p>
        </section>
    );
}