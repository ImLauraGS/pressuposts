import {
    Card,
    Input,
    Button,
    Typography,
} from "@material-tailwind/react";
import { totalApi } from "../services/service";
import { useState, useEffect } from "react";   
import { useCheckboxContext } from '../providers/CheckboxProvider';

export default function FormBudget() {
    const totalService = totalApi(); 
    const { selectedService, budgetTotal, services } = useCheckboxContext();

    const [formData, setFormData] = useState({
        name: "",
        phone: "",
        email: "",
        services: services ? services : null,
        budgetTotal: 0,
    });

    useEffect(() => {
        if (services) {
            setFormData(prevFormData => ({
                ...prevFormData,
                services: services,
            }));
        }
    }, [services]);

    useEffect(() => {
        if (budgetTotal !== 0) {
            setFormData(prevFormData => ({
                ...prevFormData,
                budgetTotal: budgetTotal,
            }));
        }
    }, [budgetTotal]);

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await totalService.postTotal({
                ...formData,
                budgetTotal: budgetTotal, 
            }); 
            console.log('Data sent:', response);
        } catch (error) {
            console.error('Error posting data:', error);
        }
    };

    return (
        <Card color="transparent">
            <Typography variant="h4" color="blue-gray">
                Demanar Pressupost
            </Typography>
            <form className="mt-8 mb-2 w-80 max-w-screen-lg sm:w-96" onSubmit={handleSubmit}>
                <div className="mb-1 flex flex-col gap-6">
                    <Input
                        size="lg"
                        placeholder="Nom"
                        className=" !border-t-blue-gray-200 focus:!border-t-gray-900"
                        labelProps={{
                            className: "before:content-none after:content-none",
                        }}
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                    />
                    <Input
                        size="lg"
                        placeholder="Telefon"
                        className=" !border-t-blue-gray-200 focus:!border-t-gray-900"
                        labelProps={{
                            className: "before:content-none after:content-none",
                        }}
                        name="phone"
                        value={formData.phone}
                        onChange={handleChange}
                    />
                    <Input
                        size="lg"
                        placeholder="Email"
                        className=" !border-t-blue-gray-200 focus:!border-t-gray-900"
                        labelProps={{
                            className: "before:content-none after:content-none",
                        }}
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                    />
                </div>
                <Button type="submit" className="mt-6" fullWidth>
                    Sol·licitar Pressupost
                </Button>
            </form>
        </Card>
    );
}
