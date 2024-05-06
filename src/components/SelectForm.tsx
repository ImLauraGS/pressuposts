import React, { useState } from 'react'

interface Props {
    onSelectionChange: (pages: number, languages: number) => void;
}

export default function SelectForm({ onSelectionChange }: Props) {
    const [pages, setPages] = useState(0);
    const [languages, setLanguages] = useState(0);
  

    const handlePageChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
        setPages(parseInt(event.target.value));
        onSelectionChange(parseInt(event.target.value), languages);
    }

    const handleLanguageChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
        setLanguages(parseInt(event.target.value));
        onSelectionChange(pages, parseInt(event.target.value));
    }
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
  )
}
