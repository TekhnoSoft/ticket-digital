import React, { useEffect, useState } from 'react';

const Countdown = ({ data_sorteio }) => {
  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  });

  useEffect(() => {  
    const padNumber = (num) => (num < 10 ? `0${num}` : num); // Adiciona zero se menor que 10.
  
    const updateCountdown = () => {
      const now = new Date();
      const sorteioDate = new Date(data_sorteio); // Converte a data_sorteio em um objeto Date.
      const difference = sorteioDate - now; // Diferença em milissegundos.
  
      if (difference > 0) {
        const days = Math.floor(difference / (1000 * 60 * 60 * 24));
        const hours = Math.floor((difference / (1000 * 60 * 60)) % 24);
        const minutes = Math.floor((difference / (1000 * 60)) % 60);
        const seconds = Math.floor((difference / 1000) % 60);
  
        setTimeLeft({
          days: padNumber(days),
          hours: padNumber(hours),
          minutes: padNumber(minutes),
          seconds: padNumber(seconds),
        });
      } else {
        setTimeLeft({ days: "00", hours: "00", minutes: "00", seconds: "00" });
      }
    };
  
    updateCountdown();

    const timer = setInterval(updateCountdown, 1000); // Atualiza a cada segundo.
  
    return () => clearInterval(timer); // Limpa o intervalo quando o componente é desmontado.
  }, [data_sorteio]); // Atualiza se a data_sorteio mudar.

  return (
    <div className='countdown-content'>
      <div className="countdown">
        <div className="time-box">
          <div className="time-number">{timeLeft.days}</div>
          <div className="time-label">dias</div>
        </div>
        <div className="time-box">
          <div className="time-number">{timeLeft.hours}</div>
          <div className="time-label">horas</div>
        </div>
        <div className="time-box">
          <div className="time-number">{timeLeft.minutes}</div>
          <div className="time-label">minutos</div>
        </div>
        {/*<div className="time-box">
          <div className="time-number">{timeLeft.seconds}</div>
          <div className="time-label">segundos</div>
        </div>*/}
      </div>
    </div>
  );
};

export default Countdown;
