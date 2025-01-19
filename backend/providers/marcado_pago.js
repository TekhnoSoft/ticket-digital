const { MercadoPagoConfig, Payment } = require('mercadopago');


const client = new MercadoPagoConfig({
    accessToken: process.env.MERCADO_PAGO_ACESS_TOKEN, 
    options: {
        timeout: 5000,
    }
});

const payment = new Payment(client);

const payPixMercadoPago = async ({valor, description, email}) => {
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

