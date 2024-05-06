import React, { useState } from 'react';
import Checkbox from './components/Checkbox';
import Total from './components/Total';
import { ServiceProps } from './types/types';

function App() {
  const [selectedServices, setSelectedServices] = useState<ServiceProps[]>([]);

  return (
    <>
      <Checkbox setSelectedServices={setSelectedServices} />
      <Total selectedServices={selectedServices} />
    </>
  );
}

export default App;