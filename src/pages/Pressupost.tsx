import { Link } from 'react-router-dom';
import CheckboxService from '../components/CheckboxService';
import FormBudget from '../components/FormBudget';
import Total from '../components/Total';
import { CheckboxProvider } from '../providers/CheckboxProvider';
import ListPressupost from '../components/ListPressupost';
import { Header } from '../components/Header';
import { HeroBanner } from '../components/HeroBanner';

export default function Pressupost() {
  return (
    <CheckboxProvider>
        <Header/>
          <main className="w-full flex flex-col align-center items-center">
            <HeroBanner/>
            <CheckboxService/>
            <Total/>
            <FormBudget/>
            <ListPressupost/>
          </main>
        </CheckboxProvider>
      );
}
