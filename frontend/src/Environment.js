const DEVELOPMENT_MODE = false;

const Environment = {
    API_BASE: (DEVELOPMENT_MODE) ? "http://localhost:3001" : "https://api.ebookdasorte.com",
    HEADERS: { 
        headers: { 
            TICKETDIGITAL_ACCESS_TOKEN : localStorage.getItem("TICKETDIGITAL_ACCESS_TOKEN")
        } 
    },
}

export default Environment;