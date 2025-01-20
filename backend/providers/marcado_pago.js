const { MercadoPagoConfig, Payment } = require('mercadopago');

const payPixMercadoPago = async ({valor, description, email, operadoraAccessToken}) => {
    const client = new MercadoPagoConfig({
        accessToken: operadoraAccessToken, 
        options: {
            timeout: 5000,
        }
    });
    
    const payment = new Payment(client);    

    const body = {
        transaction_amount: valor,
        description: description,
        payment_method_id: "pix",
        payer: {
            email: email
        }
    }
    return await payment.create({body, requestOptions: undefined});
}

module.exports = { payPixMercadoPago }

