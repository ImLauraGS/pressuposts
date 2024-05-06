import CheckboxService from './components/CheckboxService';
import FormBudget from './components/FormBudget';
import Total from './components/Total';
import { CheckboxProvider } from './providers/CheckboxProvider';

function App() {

  return (
    <CheckboxProvider>
      <main className="w-full flex flex-col align-center items-center">
        <CheckboxService/>
        <Total/>
        <FormBudget/>
      </main>
    </CheckboxProvider>
  );
}

export default App;