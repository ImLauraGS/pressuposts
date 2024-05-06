import React from 'react';
import { ServiceProps } from '../types/types';

interface Props {
  selectedServices: ServiceProps[];
}

export default function Total({ selectedServices }: Props) {
  // Calcula el precio total sumando los precios de los servicios seleccionados
  return (
    <section>
      <h2>Total Price</h2>
      <p>{selectedServices.price}</p>
    </section>
  );
}