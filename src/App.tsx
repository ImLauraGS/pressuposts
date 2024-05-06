import React, { useState } from 'react';
import Checkbox from './components/Checkbox';
import Total from './components/Total';
import { ServiceProps } from './types/types';

function App() {
  const [selectedServices, setSelectedServices] = useState<ServiceProps | null>(null);
  const [totalPages, setTotalPages] = useState<number>(0);
  const [totalLanguages, setTotalLanguages] = useState<number>(0); 

  return (
    <>
      <Checkbox
        setSelectedServices={setSelectedServices}
        setTotalPages={setTotalPages}
        setTotalLanguages={setTotalLanguages}
      />
      <Total
        selectedService={selectedServices}
        totalPages={totalPages}
        totalLanguages={totalLanguages}
      />
    </>
  );
}

export default App;