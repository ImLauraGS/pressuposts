import React, { useState } from 'react';
import Checkbox from './components/Checkbox';
import Total from './components/Total';
import { ServiceProps } from './types/types';

function App() {
  const [selectedServices, setSelectedServices] = useState<ServiceProps | null>(null);

  return (
    <>
      <Checkbox setSelectedServices={setSelectedServices} />
      <Total selectedService={selectedServices} />
    </>
  );
}

export default App;