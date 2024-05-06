import { useState } from 'react';
import CheckboxService from './components/CheckboxService';
import Total from './components/Total';
import { ServiceProps } from './types/types';
import { CheckboxProvider } from './providers/CheckboxProvider';



function App() {

  return (
    <CheckboxProvider>
      <CheckboxService/>
      <Total/>
    </CheckboxProvider>
  );
}

export default App;