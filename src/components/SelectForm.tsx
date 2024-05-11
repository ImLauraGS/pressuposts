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

        // Actualizar el contexto con el nuevo valor de páginas
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

        // Actualizar el contexto con el nuevo valor de lenguajes
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

        // Actualizar el contexto con el nuevo valor de páginas
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

            // Actualizar el contexto con el nuevo valor de páginas
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

        // Actualizar el contexto con el nuevo valor de lenguajes
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

            // Actualizar el contexto con el nuevo valor de lenguajes
            setServices(prevServices =>
                prevServices.map(s =>
                    s.id === serviceId ? { ...s, languages: service.languages - 1 } : s
                )
            );
        }
    }

    console.log('Services:', services);

    return (
        <section className='flex flex-col items-end'>
            <div>
                <label>Nombre de páginas: </label>
                <button type="button" onClick={decrementPages} className='border px-2 rounded-3xl'>-</button>
                <input type="number" value={service.pages} onChange={handlePageChange} className='px-4 py-1 m-3 border rounded-lg' min={0} />
                <button type="button" onClick={incrementPages} className='border px-2 rounded-3xl'>+</button>
            </div>
            <Modal 
                title='Número de pagines' 
                text="Afegeix les pàgines que necessitis per dur a terme el teu projecte. El cost de cada pàgina és de 30€." />
            <div>
                <label>Nombre de Lenguajes: </label>
                <button type="button" onClick={decrementLanguages} className='border px-2 rounded-3xl'>-</button>
                <input type="number" value={service.languages} onChange={handleLanguageChange} className='px-4 py-1 m-3 border rounded-lg' min={0} />
                <button type="button" onClick={incrementLanguages} className='border px-2 rounded-3xl'>+</button>
            </div>
            <Modal 
                title='Número de llenguatges' 
                text="Afegeix les llenguatges que tindrà el teu projecte. El cost de cada llenguatge és de 30€." 
                />
        </section>
    );
}