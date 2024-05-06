import React, { useState } from 'react';
import { useCheckboxContext } from '../providers/CheckboxProvider';

export default function SelectForm() {
    const [pages, setPages] = useState(0);
    const [languages, setLanguages] = useState(0);
    const { setTotalPages, setTotalLanguages } = useCheckboxContext();

    const handlePageChange = (event) => {
        const selectedPages = parseInt(event.target.value);
        setPages(selectedPages);
        setTotalPages(selectedPages); 
    }

    const handleLanguageChange = (event) => {
        const selectedLanguages = parseInt(event.target.value);
        setLanguages(selectedLanguages);
        setTotalLanguages(selectedLanguages); 
    }

    const incrementPages = () => {
        setPages(pages + 1);
        setTotalPages(pages + 1);
    }

    const decrementPages = () => {
        if (pages > 0) {
            setPages(pages - 1);
            setTotalPages(pages - 1);
        }
    }

    const incrementLanguages = () => {
        setLanguages(languages + 1);
        setTotalLanguages(languages + 1);
    }

    const decrementLanguages = () => {
        if (languages > 0) {
            setLanguages(languages - 1);
            setTotalLanguages(languages - 1);
        }
    }

    return (
        <section className='flex flex-col items-end'>
            <div>
                <label>Nombre de pagines: </label>
                <button type="button" onClick={decrementPages} className='border px-2 rounded-3xl'>-</button>
                <select value={pages} onChange={handlePageChange} className='appearance-none px-4 py-1 m-3 border rounded-lg'>
                    <option value={0}> </option>
                    <option value={1}>1</option>
                    <option value={2}>2</option>
                    <option value={3}>3</option>
                </select>
                <button type="button" onClick={incrementPages} className='border px-2 rounded-3xl'>+</button>
            </div>
            <div>
                <label>Nombre de Llenguatges: </label>
                <button type="button" onClick={decrementLanguages} className='border px-2 rounded-3xl'>-</button>
                <select value={languages} onChange={handleLanguageChange} className='appearance-none px-4 py-1 m-3 border rounded-lg'>
                    <option value={0}> </option>
                    <option value={1}>1</option>
                    <option value={2}>2</option>
                    <option value={3}>3</option>
                </select>
                <button type="button" onClick={incrementLanguages} className='border px-2 rounded-3xl'>+</button>
            </div>
        </section>
    );
}