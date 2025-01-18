import React, { useState, useEffect } from 'react';
import './style.css';
import GridItems from '../GridItems';
import PaginationControls from '../PaginationControls';

const Pagination = ({ campanha, numeros, addNumero, removeNumero, reservados, pagos, filter }) => {
    const totalItems = campanha?.regra?.valor;
    const itemsPerPage = 100;
    const [currentPage, setCurrentPage] = useState(1);
    const [filteredItems, setFilteredItems] = useState([]);

    useEffect(() => {
        const allItems = Array.from({ length: totalItems }, (_, index) => index + 1);
        let filtered = allItems.filter(item => {
            if (filter === "pago") return pagos.includes(item);
            if (filter === "reservado") return reservados.includes(item);
            if (filter === "disponivel") return !pagos.includes(item) && !reservados.includes(item);
            return true;
        });
        setFilteredItems(filtered);
        setCurrentPage(1); // Resetar para a primeira página ao filtrar
    }, [filter, reservados, pagos, totalItems]);

    const totalPages = Math.ceil(filteredItems.length / itemsPerPage);
    
    const handlePageChange = (page) => {
        if (page >= 1 && page <= totalPages) {
            setCurrentPage(page);
        }
    };

    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    const currentItems = filteredItems.slice(startIndex, endIndex);

    return (
        <div>
            <GridItems 
                filter={filter} 
                reservados={reservados} 
                pagos={pagos} 
                campanha={campanha} 
                items={currentItems} 
                numeros={numeros} 
                addNumero={addNumero} 
                removeNumero={removeNumero} 
            />
            <PaginationControls 
                currentPage={currentPage} 
                totalPages={totalPages} 
                onPageChange={handlePageChange} 
                totalItems={filteredItems.length} 
            />
        </div>
    );
};

export default Pagination;
