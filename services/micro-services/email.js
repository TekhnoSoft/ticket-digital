const cron = require('node-cron');
const nodemailer = require('nodemailer');
const EmailFila = require('../models/email_fila');
require('dotenv').config();

const emailThread = () => {
    // A cada 60 segundos, enviar email que está na fila.
    cron.schedule('*/60 * * * * *', async () => {
        try {
            // Busca os e-mails na fila que ainda não foram enviados
            const emails = await EmailFila.findAll({
                where: {
                    sended: false,
                },
            });

            // Para cada e-mail encontrado
            for (const email of emails) {




                const transporter = nodemailer.createTransport({
                    host: 'smtp.gmail.com',
                    port: 587,
                    pool: true, // Use o agrupamento SMTP para manter a conexão aberta para vários emails
                    auth: {
                        user: process.env.TICKET_DIGITAL_EMAIL_ADDRESS,
                        pass: process.env.TICKET_DIGITAL_EMAIL_PASS,
                    },
                    maxMessages: Infinity, // Permitir um número ilimitado de mensagens por conexão
                    maxConnections: 5 // Limitar o número de conexões simultâneas
                });



                // Template do e-mail (HTML)
                const emailTemplate = `
                    <html>
                        <head>
                            <style>
                                body {
                                    font-family: Arial, sans-serif;
                                    background-color: #f5f5f5;
                                    margin: 0;
                                    padding: 0;
                                    color: #333;
                                }
                                .container {
                                    max-width: 600px;
                                    margin: 0 auto;
                                    background-color: #ffffff;
                                    padding: 20px;
                                    border-radius: 8px;
                                    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
                                }
                                .logo {
                                    display: flex;
                                    justify-content: flex-start;
                                    margin-bottom: 20px;
                                }
                                .logo img {
                                    max-width: 150px;
                                }
                                .content {
                                    font-size: 16px;
                                    line-height: 1.5;
                                    margin-bottom: 20px;
                                }
                                .footer {
                                    text-align: center;
                                    font-size: 12px;
                                    color: #888;
                                    margin-top: 30px;
                                }
                                .footer a {
                                    color: #888;
                                    text-decoration: none;
                                }
                            </style>
                        </head>
                        <body>
                            <div class="container">
                                <!-- Logo -->
                                <div class="logo">
                                    <img src="https://ticketdigital.app.br/Logo.png" alt="Logo">
                                </div>
                                
                                <!-- Corpo do E-mail -->
                                <div class="content">
                                    <p>${email.content}</p>
                                </div>

                                <!-- Rodapé -->
                                <div class="footer">
                                    <p>&copy; ${new Date().getFullYear()} Todos os direitos reservados.</p>
                                    <p><a href="mailto:noreply@ticketdigital.app.br">não responda este e-mail</a></p>
                                </div>
                            </div>
                        </body>
                    </html>
                `;

                // Definir as opções do e-mail
                const mailOptions = {
                    from: "Ticket Digital", // Remetente
                    to: email.to, // Destinatário
                    subject: email.subject, // Assunto
                    text: email.content, // Conteúdo em texto simples
                    html: emailTemplate, // Corpo do e-mail em HTML (template)
                };

                try {
                    // Enviar o e-mail
                    const info = await transporter.sendMail(mailOptions);
                    console.log(`E-mail enviado para ${email.to}: ${info.response}`);

                    // Atualizar o status do e-mail na fila para "enviado"
                    await email.update({
                        sended: true,
                    });

                } catch (emailError) {
                    console.error(`Erro ao enviar e-mail para ${email.to}:`, emailError);
                }
            }
        } catch (error) {
            console.error('Erro ao executar tarefa cron:', error);
        }
    });
};

module.exports = emailThread;
