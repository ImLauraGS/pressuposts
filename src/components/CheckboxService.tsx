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
    const { checkedItems, setCheckedItems, setSelectedService } = useCheckboxContext();

    useEffect(() => {
        serviceApi.getAll()
            .then((res) => res.data)
            .then((data) => {
                setService(data);
            });
    }, []);

    const handleCheck = (event: React.ChangeEvent<HTMLInputElement>) => {
      const { id, checked } = event.target;

      const updatedCheckedItems = {
        ...checkedItems,
        [id]: checked
    };

    setCheckedItems(updatedCheckedItems);
      
      if (checked) {
        console.log(service);
          const selectedService = service.find(item => 
            item.id == id );
          setSelectedService(selectedService || null);
      } else {
        setSelectedService(null);
      }
  }
    return (
        <form action="">
            {service.map((item, index) => (
                <Card key={index} className="mt-6 w-[50rem] flex-row">
                    <CardBody className='flex-row w-full justufy-between'>
                        <Typography variant="h5" color="blue-gray" className="mb-2">
                            {item.value}
                        </Typography>
                        <Typography>
                            {item.name}
                        </Typography>
                        <Typography variant="h5" color="blue-gray" className="mb-2">
                            {item.price}
                        </Typography>
                        <Checkbox 
                            label="Afegir"
                            id={item.id}
                            name={item.name}
                            value={item.value}
                            checked={checkedItems[item.id] || false}
                            onChange={handleCheck}
                        />
                        {checkedItems[item.id] && <SelectForm />}
                    </CardBody>
                </Card>
            ))}
        </form>
    );
}