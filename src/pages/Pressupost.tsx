import { Link } from 'react-router-dom';
import CheckboxService from '../components/CheckboxService';
import FormBudget from '../components/FormBudget';
import Total from '../components/Total';
import { CheckboxProvider } from '../providers/CheckboxProvider';

export default function Pressupost() {
  return (
    <CheckboxProvider>
          <main className="w-full flex flex-col align-center items-center">
            <Link to="/">
                <button className="m-4">Home</button>
            </Link>
            <CheckboxService/>
            <Total/>
            <FormBudget/>
          </main>
        </CheckboxProvider>
      );
}
