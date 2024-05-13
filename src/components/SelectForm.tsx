import React, { useState, useEffect } from 'react';
import { useCheckboxContext } from '../providers/CheckboxProvider';
import { Modal } from './Modal';

export default function SelectForm({ serviceId }: { serviceId: string }) {
    const { services, setServices } = useCheckboxContext();
    const [service, setService] = useState<ServiceData>({
        id: serviceId,
        pages: 0,
        languages: 0,
    });

    useEffect(() => {
        const foundService = services.find(s => s.id === serviceId);

        if (foundService) {
            setService(foundService);
        }
    }, [serviceId, services]);

    const handlePageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const selectedPages = parseInt(event.target.value);
        setService(prevService => ({
            ...prevService,
            pages: selectedPages,
        }));
        setServices(prevServices =>
            prevServices.map(s =>
                s.id === serviceId ? { ...s, pages: selectedPages } : s
            )
        );
    }

    const handleLanguageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const selectedLanguages = parseInt(event.target.value);
        setService(prevService => ({
            ...prevService,
            languages: selectedLanguages,
        }));

        setServices(prevServices =>
            prevServices.map(s =>
                s.id === serviceId ? { ...s, languages: selectedLanguages } : s
            )
        );
    }

    const incrementPages = () => {
        setService(prevService => ({
            ...prevService,
            pages: prevService.pages + 1,
        }));

        setServices(prevServices =>
            prevServices.map(s =>
                s.id === serviceId ? { ...s, pages: service.pages + 1 } : s
            )
        );
    }

    const decrementPages = () => {
        if (service.pages > 0) {
            setService(prevService => ({
                ...prevService,
                pages: prevService.pages - 1,
            }));

            setServices(prevServices =>
                prevServices.map(s =>
                    s.id === serviceId ? { ...s, pages: service.pages - 1 } : s
                )
            );
        }
    }

    const incrementLanguages = () => {
        setService(prevService => ({
            ...prevService,
            languages: prevService.languages + 1,
        }));

        setServices(prevServices =>
            prevServices.map(s =>
                s.id === serviceId ? { ...s, languages: service.languages + 1 } : s
            )
        );
    }

    const decrementLanguages = () => {
        if (service.languages > 0) {
            setService(prevService => ({
                ...prevService,
                languages: prevService.languages - 1,
            }));

            setServices(prevServices =>
                prevServices.map(s =>
                    s.id === serviceId ? { ...s, languages: service.languages - 1 } : s
                )
            );
        }
    }

    console.log('Services:', services);

    return (
        <section className='flex flex-col justify-between'>
            <div className='flex items-center justify-between'>
                <Modal 
                title='Número de pagines' 
                text="Afegeix les pàgines que necessitis per dur a terme el teu projecte. El cost de cada pàgina és de 30€."
                />
                <label className='font-medium text-black mr-3'>Nombre de páginas: </label>
                <div>
                <button type="button" onClick={decrementPages} className='border px-2 rounded-3xl bg-white'>-</button>
                <input type="number" value={service.pages} onChange={handlePageChange} className='py-1 m-3 w-12 text-center border rounded-lg' min={0} />
                <button type="button" onClick={incrementPages} className='border px-2 rounded-3xl bg-white'>+</button>
                </div>
            </div>
            <div className='flex items-center justify-between'>
            <Modal 
                title='Número de pagines' 
                text="Afegeix les pàgines que necessitis per dur a terme el teu projecte. El cost de cada pàgina és de 30€."
             />
             <div>
                
             </div>
                <label className='font-medium text-black mr-3'>Nombre de Lenguajes: </label>
                <button type="button" onClick={decrementLanguages} className=' bg-white border px-2 rounded-3xl'>-</button>
                <input type="number" value={service.languages} onChange={handleLanguageChange} className='py-1 m-3 w-12 text-center border rounded-lg' min={0} />
                <button type="button" onClick={incrementLanguages} className='bg-white border px-2 rounded-3xl'>+</button>
            </div>
        </section>
    );
}