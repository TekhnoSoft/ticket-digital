const DEVELOPMENT_MODE = true;

const Environment = {
    API_BASE: (DEVELOPMENT_MODE) ? "http://localhost:3001" : "https://api.ticketdigital.app.br",
    HEADERS: { 
        headers: { 
            TICKETDIGITAL_ACCESS_TOKEN : localStorage.getItem("TICKETDIGITAL_ACCESS_TOKEN")
        } 
    },
}

export default Environment;