import {
    Card,
    Input,
    Button,
    Typography,
} from "@material-tailwind/react";
import { totalApi } from "../services/service";
import { useState, useEffect } from "react";   
import { useCheckboxContext } from '../providers/CheckboxProvider';
import { DialogConfirm } from "./DialogConfirm";

export default function FormBudget() {
    const totalService = totalApi(); 
    const { selectedService, budgetTotal, services } = useCheckboxContext();
    const [showModal, setShowModal] = useState(false); 
    const [modalMessage, setModalMessage] = useState(""); 


    const [formData, setFormData] = useState({
        name: "",
        phone: "",
        email: "",
        date: "", 
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

    useEffect(() => {
        const currentDate = new Date().toISOString().split('T')[0];
        setFormData(prevFormData => ({
            ...prevFormData,
            date: currentDate,
        }));
    }, []);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const target = e.target as HTMLInputElement;
        setFormData({
            ...formData,
            [target.name]: target.value,
        });
    };

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        try {
            const response = await totalService.postTotal({
                ...formData,
                budgetTotal: budgetTotal, 
            }); 
            console.log('Data sent:', response);
            setModalMessage("El pressupost s'ha guardat correctament."); 
            setShowModal(true); 
        } catch (error) {
            console.error('Error posting data:', error);
            setModalMessage("Hi ha hagut un error en desar el pressupost."); 
            setShowModal(true); 
        }
    };

    const handleCloseModal = () => {
        setShowModal(false);
        window.location.reload();
    };

    return (
        <Card color="transparent" className="w-[70rem] p-10 gap-4">
            <Typography variant="h3" color="blue-gray">
                Demanar Pressupost
            </Typography>
            <form className="flex flex-row gap-9 items-center justify-around" onSubmit={handleSubmit}>
                    <Input
                        size="lg"
                        label="Nom"
                        type="text"
                        variant="outlined"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                    />
                    <Input
                        size="lg"
                        label="Telefon"
                        type="number"
                        variant="outlined"
                        name="phone"
                        value={formData.phone}
                        onChange={handleChange}
                    />
                    <Input
                        size="lg"
                        label="Email"
                        type="email"
                        variant="outlined"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                    />

                    <Button 
                    type="submit" 
                    className="" 
                    color="green"
                    fullWidth>
                    Sol·licitar Pressupost
                </Button>
            </form>
            <DialogConfirm isOpen={showModal} onClose={handleCloseModal} message={modalMessage} />
        </Card>
    );
}
