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
    const { selectedService, totalBudget } = useCheckboxContext(); // Obtener selectedService y totalBudget del contexto

    const [formData, setFormData] = useState({
        name: "",
        phone: "",
        email: "",
        selectedService: selectedService ? selectedService : null,
        totalBudget: 0,
    });
    
    useEffect(() => {
        if (selectedService) {
            setFormData(prevFormData => ({
                ...prevFormData,
                selectedService: selectedService,
            }));
        }
    }, [selectedService]);

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            // Actualizar formData con totalBudget antes de enviarlo al servidor
            const updatedFormData = {
                ...formData,
                totalBudget: totalBudget,
            };

            const response = await totalService.postTotal(updatedFormData); 
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