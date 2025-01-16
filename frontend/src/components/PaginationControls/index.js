import React, { useEffect, useState } from 'react';

const PaginationControls = ({ currentPage, totalPages, onPageChange, totalItems }) => {

    const getPageIncrement = () => {
        if (totalItems <= 1000) return 1;
        if (totalItems <= 10000) return 10;
        if (totalItems <= 100000) return 100;
        if (totalItems <= 1000000) return 1000;
        return 10000; // Para mais de 10 milhões
    };

    const [increment, setIncrement] = useState(getPageIncrement()); // Armazenando o incremento calculado no estado

    useEffect(() => {
        // Atualiza o incremento quando o número total de itens muda
        setIncrement(getPageIncrement());
    }, [totalItems]);

    // Função para garantir que a página está dentro dos limites
    const handlePageChange = (newPage) => {
        console.log(newPage);
        if (newPage >= 1 && newPage <= totalPages) {
            onPageChange(newPage);
        }
    };

    return (
        <div className="pagination" style={{ marginTop: '20px', display: 'flex', justifyContent: 'center', alignItems: 'center', gap: '10px' }}>
            {/* Botão de decremento rápido (<<) */}
            <button 
                onClick={() => handlePageChange(currentPage - increment)} 
                style={{ padding: '5px 10px', cursor: 'pointer', backgroundColor: 'var(--primary-color)', color: 'white', border: 'none', borderRadius: '5px' }}
            >
                {`<<`}
            </button>
            
            {/* Botão de decremento simples (<) */}
            <button 
                onClick={() => handlePageChange(currentPage - 1)} 
                disabled={currentPage === 1} 
                style={{ padding: '5px 10px', cursor: 'pointer', backgroundColor: 'var(--primary-color)', color: 'white', border: 'none', borderRadius: '5px' }}
            >
                {`<`}
            </button>
            
            {/* Exibição da página atual */}
            <span style={{ fontSize: '16px' }}>
                {currentPage} de {totalPages}
            </span>
            
            {/* Botão de incremento simples (>) */}
            <button 
                onClick={() => handlePageChange(currentPage + 1)} 
                disabled={currentPage === totalPages} 
                style={{ padding: '5px 10px', cursor: 'pointer', backgroundColor: 'var(--primary-color)', color: 'white', border: 'none', borderRadius: '5px' }}
            >
                {`>`}
            </button>
            
            {/* Botão de incremento rápido (>>) */}
            <button 
                onClick={() => handlePageChange(currentPage + increment)} 
                style={{ padding: '5px 10px', cursor: 'pointer', backgroundColor: 'var(--primary-color)', color: 'white', border: 'none', borderRadius: '5px' }}
            >
                {`>>`}
            </button>
        </div>
    );
};

export default PaginationControls;
