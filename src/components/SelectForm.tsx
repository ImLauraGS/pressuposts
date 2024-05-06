import React, { useState } from 'react';
import { useCheckboxContext } from '../providers/CheckboxProvider';

export default function SelectForm() {
    const [pages, setPages] = useState(0);
    const [languages, setLanguages] = useState(0);
    const { setTotalPages, setTotalLanguages } = useCheckboxContext();

    const handlePageChange = (event) => {
        const selectedPages = parseInt(event.target.value);
        setPages(selectedPages);
        setTotalPages(selectedPages); // Actualiza el total de páginas en el contexto
    }

    const handleLanguageChange = (event) => {
        const selectedLanguages = parseInt(event.target.value);
        setLanguages(selectedLanguages);
        setTotalLanguages(selectedLanguages); // Actualiza el total de idiomas en el contexto
    }
    
    console.log(pages, languages); // Imprime los valores seleccionados en la consola

    return (
        <>
            <select value={pages} onChange={handlePageChange}>
                <option value={0}></option>
                <option value={1}>1</option>
                <option value={2}>2</option>
                <option value={3}>3</option>
            </select>
            <select value={languages} onChange={handleLanguageChange}>
                <option value={0}></option>
                <option value={1}>1</option>
                <option value={2}>2</option>
                <option value={3}>3</option>
            </select>
        </>
    );
}