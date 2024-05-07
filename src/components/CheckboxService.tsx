import React, { useEffect, useState } from 'react';
import { servicesApi } from '../services/service';
import { ServiceProps } from '../types/types';
import SelectForm from './SelectForm';
import { useCheckboxContext } from '../providers/CheckboxProvider';
import {
    Card,
    CardBody,
    Typography,
    Checkbox,
} from "@material-tailwind/react";

export default function CheckboxService() {
    const serviceApi = servicesApi();
    const [service, setService] = useState<ServiceProps[]>([]);
    const { checkedItems, setCheckedItems, setSelectedService, setTotalPages, setTotalLanguages } = useCheckboxContext();

    useEffect(() => {
        serviceApi.getAll()
            .then((res) => res.data)
            .then((data) => {
              console.log("Service Data:", data);
                setService(data);
            });
    }, []);

    const handleCheck = (event: React.ChangeEvent<HTMLInputElement>) => {
      const { id, checked } = event.target;
      const updatedCheckedItems = Object.fromEntries(
          service.map(item => [item.id, false])
      );
      updatedCheckedItems[id] = checked;
      setCheckedItems(updatedCheckedItems);
  
      if (checked) {

          const selectedService = service.find(item => item.id == id);
          setSelectedService(selectedService || null);
          setTotalPages(selectedService?.pages || 0);
          setTotalLanguages(selectedService?.languages || 0);
     
      } else {
          setSelectedService(null);
          setTotalPages(0);
          setTotalLanguages(0);
      } 
  }

    return (
        <form action="">
            {service.map((item, index) => (
                <Card key={index} className="mt-6 w-[50rem] items-end">
                    <CardBody className='w-[100%] flex flex-row justify-between items-center'>
                        <div>
                            <Typography variant="h2" color="blue-gray" className="mb-2">
                                {item.value}
                            </Typography>
                            <Typography>
                                {item.name}
                            </Typography>
                        </div>
                        <Typography variant="h3" color="blue-gray" className="mb-2">
                            {item.price}€
                        </Typography>
                        <Checkbox
                            label="Afegir"
                            id={item.id}
                            name={item.name}
                            value={item.value}
                            checked={checkedItems[item.id] || false}
                            onChange={handleCheck}
                        />
                    </CardBody>
                    <div className='p-6'>
                        {checkedItems[item.id] && <SelectForm />}
                    </div>
                </Card>
            ))}
        </form>
    );
}