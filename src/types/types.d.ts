export interface ServiceProps {
    serviceApi: any;
    name: string;
    price: number;
    id: string;
    value: string;
    totalApi: any;
}

interface SelectedService {
    id: string;
    price: number;
    value: string;
    
}