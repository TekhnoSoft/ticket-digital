import React, { useState } from 'react';
import './style.css';
import GridItems from '../GridItems';
import PaginationControls from '../PaginationControls';

const Pagination = ({campanha, numeros, addNumero, removeNumero}) => {
    const totalItems = campanha?.regra?.valor;
    const itemsPerPage = 100;
    const totalPages = Math.ceil(totalItems / itemsPerPage); 

    const [currentPage, setCurrentPage] = useState(1); 

    const handlePageChange = (page) => {
        if (page >= 1 && page <= totalPages) {
            setCurrentPage(page);
        }
    };

    // Cálculo dos itens a serem exibidos na página atual
    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    const currentItems = Array.from({ length: itemsPerPage }, (_, index) => startIndex + index);

    return (
        <div>
            <GridItems campanha={campanha} items={currentItems} numeros={numeros} addNumero={addNumero} removeNumero={removeNumero}/>
            <PaginationControls
                currentPage={currentPage} 
                totalPages={totalPages} 
                onPageChange={handlePageChange} 
                totalItems={totalItems}
            />
        </div>
    );
};

export default Pagination;