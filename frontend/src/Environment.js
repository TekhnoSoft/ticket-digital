const DEVELOPMENT_MODE = false;

const Environment = {
    API_BASE: (DEVELOPMENT_MODE) ? "http://localhost:3001" : "https://tekhno-projects-ticket-digital-backend.7richv.easypanel.host/",
    HEADERS: { 
        headers: { 
            TICKETDIGITAL_ACCESS_TOKEN : localStorage.getItem("TICKETDIGITAL_ACCESS_TOKEN")
        } 
    },
}

export default Environment;