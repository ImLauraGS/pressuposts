import React, { useEffect, useState } from 'react';
import { useCheckboxContext } from '../providers/CheckboxProvider';
import SelectForm from './SelectForm';
import { ServiceProps } from '../types/types';
import { servicesApi } from '../services/service';
import {
    Card,
    CardBody,
    Typography,
    Checkbox,
} from "@material-tailwind/react";

export default function CheckboxService() {
    const serviceApi = servicesApi();
    const [dataApi, setDataApi] = useState<ServiceProps[]>([]);
    const { checkedItems, setCheckedItems, setSelectedService, setServices } = useCheckboxContext();

    useEffect(() => {
        serviceApi.getAll()
            .then((res) => res.data)
            .then((data) => {
                console.log("Service Data:", data);
                setDataApi(data);
            });
    }, []);

    const handleCheck = (event: React.ChangeEvent<HTMLInputElement>, item: ServiceProps) => {
        const { id, checked } = event.target;

        setCheckedItems(prevCheckedItems => ({
            ...prevCheckedItems,
            [id]: checked,
        }));

        if (checked) {

            setServices(prevServices => [...prevServices, item]);
            setSelectedService(item);
        } else {

            setServices(prevServices => prevServices.filter(service => service.id !== item.id));
            setSelectedService(null);
        }
    }

    return (
        <form action="">
            {dataApi.map((item, index) => (
                <Card key={index} className="mb-6 bg-amber-50 w-[70rem] items-end">
                    <CardBody className='w-[100%] flex flex-row justify-between items-center'>
                        <div>
                            <Typography variant="h2" color="blue-gray" className="mb-2">
                                {item.value}
                            </Typography>
                            <Typography>
                                {item.description}
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
                            onChange={(event) => handleCheck(event, item)}
                        />
                    </CardBody>
                    <div className='p-6'>
                        {checkedItems[item.id] && <SelectForm serviceId={item.id} />}
                    </div>
                </Card>
            ))}
        </form>
    );
}