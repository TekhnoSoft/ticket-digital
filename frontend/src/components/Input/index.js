import React, { useEffect } from 'react';
import './style.css';
import Utils from '../../Utils';

function setFocus(on) {
    var element = document.activeElement;
    if (on) {
        setTimeout(function () {
            element.parentNode.classList.add("focus");
        });
    } else {
        var box = document.querySelector(".input-box");
        box.classList.remove("focus");
        var inputs = document.querySelectorAll("input");
        inputs.forEach(function(input) {
            var parent = input.closest(".input-box");
            if (parent) {
                if (input?.value) parent?.classList?.add("focus");
                else parent.classList.remove("focus");
            }
        });
    }
}

const Input = ({style, type, label, value, setValue, ref, disabled, onChange, hidden, id, accept, capture, maxLegth, hideInputBoxMargin, readOnly}) => {

    const handleChange = (event) => {
        const newValue = event.target.value;
        // Aplicar máscara de acordo com o tipo
        if (type === 'celular') {
            const newValue = event.target.value;
            formatPhoneNumber(newValue);
        } else if (type === 'cpf') {
            const newValue = event.target.value;
            formatCPF(newValue);
        } else if (type === 'cnpj') {
            const newValue = event.target.value;
            formatCNPJ(newValue);
        } else if (type === 'moeda') {
            const newValue = event.target.value;
            formatCurrency(newValue);
        } else if (type === 'cep') {
            const newValue = event.target.value;
            formatCEP(newValue);
        } else if (type === 'cartao') {
            const newValue = event.target.value;
            formatCardNumber(newValue);
        } else if (type === 'data') {
            const newValue = event.target.value;
            formatDate(newValue);
        } else if (type === 'hora') {
            const newValue = event.target.value;
            formatTime(newValue);
        } else if (type === 'code') {
            const newValue = event.target.value;
            formatVerificationCode(newValue);
        }else if (type === 'code-number') {
            const newValue = event.target.value;
            formatVerificationCodeNumber(newValue);
        } else if (type === 'cvc') {
            const newValue = event.target.value;
            formatCvcCode(newValue);
        } else if (type === 'name') {
            const newValue = event.target.value;
            formatName(newValue);
        }else if (type == 'cupom') {
            const newValue = event.target.value;
            formatCupom(newValue);
        } else if (type === 'number') {
            const newValue = event.target.value;
            if(maxLegth){
                if(newValue?.length <= maxLegth){
                    formatNumberText(newValue);
                }
            }else{
                formatNumberText(newValue);
            }
        } else {
            if(maxLegth){
                if(newValue?.length <= maxLegth){
                    setValue(newValue);
                }
            }else{
                setValue(newValue);
            }
        }
    };

    const formatCupom = (input) => {
        // Limpar todos os caracteres que não sejam alfanuméricos
        const cleaned = ('' + input).replace(/[^a-zA-Z0-9]/g, '');
        const formatted = cleaned.toUpperCase();
        setValue(formatted);
    }

    const formatPhoneNumber = (input) => {
        // Limpar todos os caracteres que não sejam números
        const cleaned = ('' + input).replace(/\D/g, '');
        
        // Aplicar a máscara: (XX) XXXXX-XXXX
        const match = cleaned.match(/^(\d{0,2})(\d{0,5})(\d{0,4})$/);
        
        if (match) {
            const formatted = !match[2] ? match[1] : '(' + match[1] + ') ' + match[2] + (match[3] ? '-' + match[3] : '');
            setValue(formatted);
        }
    };

    const formatCPF = (input) => {
        // Limpar todos os caracteres que não sejam números
        const cleaned = ('' + input).replace(/\D/g, '');
        
        // Aplicar a máscara: XXX.XXX.XXX-XX
        const match = cleaned.match(/^(\d{0,3})(\d{0,3})(\d{0,3})(\d{0,2})$/);
        
        if (match) {
            const formatted = !match[2] ? match[1] : match[1] + '.' + match[2] + (match[3] ? '.' + match[3] : '') + (match[4] ? '-' + match[4] : '');
            setValue(formatted);
        }
    };

    const formatCNPJ = (input) => {
        // Limpar todos os caracteres que não sejam números
        const cleaned = ('' + input).replace(/\D/g, '');
        
        // Aplicar a máscara: XX.XXX.XXX/XXXX-XX
        const match = cleaned.match(/^(\d{0,2})(\d{0,3})(\d{0,3})(\d{0,4})(\d{0,2})$/);
        
        if (match) {
            const formatted = !match[2] ? match[1] : match[1] + '.' + match[2] + (match[3] ? '.' + match[3] : '') + (match[4] ? '/' + match[4] : '') + (match[5] ? '-' + match[5] : '');
            setValue(formatted);
        }
    };

    const formatCurrency = (input) => {
        // Limpar todos os caracteres que não sejam números
        const cleaned = ('' + input).replace(/\D/g, '');
        
        // Verificar se há um valor numérico
        if (!cleaned) {
            setValue('');
            return;
        }

        // Converter para número e formatar como moeda
        const number = parseFloat(cleaned) / 100;
        const formatted = number.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });
        setValue(formatted);
    };

    const formatCEP = (input) => {
        // Limpar todos os caracteres que não sejam números
        const cleaned = ('' + input).replace(/\D/g, '');
        
        // Aplicar a máscara: XXXXX-XXX
        const match = cleaned.match(/^(\d{0,5})(\d{0,3})$/);
        
        if (match) {
            const formatted = !match[2] ? match[1] : match[1] + '-' + match[2];
            setValue(formatted);
        }
    };

    const formatCardNumber = (input) => {
        // Limpar todos os caracteres que não sejam números
        const cleaned = ('' + input).replace(/\D/g, '');

        // Aplicar a máscara: XXXX XXXX XXXX XXXX
        const match = cleaned.match(/^(\d{0,4})(\d{0,4})(\d{0,4})(\d{0,4})$/);
        
        if (match) {
            const formatted = !match[2] ? match[1] : match[1] + ' ' + match[2] + (match[3] ? ' ' + match[3] : '') + (match[4] ? ' ' + match[4] : '');
            setValue(formatted);
        }
    };

    const formatDate = (input) => {
        // Limpar todos os caracteres que não sejam números
        const cleaned = ('' + input).replace(/\D/g, '');
        
        // Aplicar a máscara: DD/MM/AAAA
        const match = cleaned.match(/^(\d{0,2})(\d{0,2})(\d{0,4})$/);
        
        if (match) {
            const formatted = !match[2] ? match[1] : (match[1] + '/' + match[2] + (match[3] ? '/' + match[3] : ''));
            setValue(formatted);
        }
    };

    const formatTime = (input) => {
        // Limpar todos os caracteres que não sejam números
        const cleaned = ('' + input).replace(/\D/g, '');
        
        // Aplicar a máscara: HH:MM
        const match = cleaned.match(/^(\d{0,2})(\d{0,2})$/);
        
        if (match) {
            const formatted = !match[2] ? match[1] : (match[1] + ':' + match[2]);
            setValue(formatted);
        }
    };

    const formatVerificationCode = (input) => {
        // Limpar todos os caracteres que não sejam alfanuméricos
        const cleaned = ('' + input).replace(/[^a-zA-Z0-9]/g, '');

        // Limitar o comprimento do código de verificação para 6 caracteres
        const formatted = cleaned.slice(0, 6).toUpperCase();
        setValue(formatted);
    };

    const formatNumberText = (input) => {
        // Limpar todos os caracteres que não sejam alfanuméricos
        const cleaned = ('' + input).replace(/[^a-zA-Z0-9.]/g, '');
        const formatted = cleaned.toUpperCase();
        setValue(formatted);
    }

    const formatVerificationCodeNumber = (input) => {
        // Limpar todos os caracteres que não sejam alfanuméricos
        const cleaned = ('' + input).replace(/[^0-9]/g, '');

        // Limitar o comprimento do código de verificação para 6 caracteres
        const formatted = cleaned.slice(0, 6).toUpperCase();
        setValue(formatted);
    }
 
    const formatCvcCode = (input) => {
        // Limpar todos os caracteres que não sejam alfanuméricos
        const cleaned = ('' + input).replace(/[^0-9]/g, '');

        // Limitar o comprimento do código de verificação para 6 caracteres
        const formatted = cleaned.slice(0, 3).toUpperCase();
        setValue(formatted);
    }

    const formatName = (input) => {
        // Remover caracteres que não são letras
        const formatted = input.replace(/[^a-zA-Z]/g, '');
        setValue(formatted);
    };

    useEffect(() => {   
        if(value){
            setFocus(false);
        }
    }, [value])

    const alphaNumericsTypes = [
        "celular",
        "moeda",
        "cpf",
        "cnpj",
    ]

    return (
        <div className="input-box" style={{...style, margin: hideInputBoxMargin ? '0px' : undefined}}>
            <label className="input-label">{label}</label>
            {type == "textarea" ? (
                <textarea 
                    className={`input-1`} 
                    onFocus={() => setFocus(true)} 
                    onBlur={() => setFocus(false)}
                    value={value}
                    onChange={handleChange}
                    disabled={disabled}
                    style={{resize: 'none', height: 'auto'}}
                    rows={3}
                />
            ) : (
                !hidden ? (
                    <input 
                        type={alphaNumericsTypes.includes(type) ? "tel" : type} 
                        className={`input-1`} 
                        onFocus={() => setFocus(true)} 
                        onBlur={() => setFocus(false)}
                        value={value}
                        onChange={handleChange}
                        ref={ref}
                        disabled={disabled}
                        style={style}
                        readOnly={readOnly ? readOnly : false}
                    />
                ) : (
                    <input 
                        id={id}
                        type={type} 
                        onChange={onChange}
                        accept={accept}
                        capture={capture}
                        maxLength={maxLegth}
                        hidden
                    />
                )
            )}
        </div>
    );
};

export default Input;