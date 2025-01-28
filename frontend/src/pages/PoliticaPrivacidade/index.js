import React, { useState } from 'react'
import FragmentView from '../../components/FragmentView'
import SpaceBox from '../../components/SpaceBox';
import { Card } from '../../components';

export default () => {
    return (
        <FragmentView headerMode={"USER"}>
            <SpaceBox space={20} />
            <h1 className={"responsive-margin"}>Política de Privacidade</h1>
            <SpaceBox space={20} />
            <Card className={"responsive-margin"} style={{padding: '20px'}}>
                <h2><strong>1. INTRODUÇÃO</strong></h2>


                <p>
                    1.1. O Ticket Digital está comprometida com a confidencialidade e proteção dos dados pessoais de seus Usuários e transparência em seus valores em relação a seus Usuários, colaboradores, fornecedores e parceiros.
                </p>
                <p>
                    1.2. Esta Política de Privacidade <strong>(“Política de Privacidade”)</strong> aplica-se apenas aos dados pessoais dos Usuários processados pelo Ticket Digital como parte da prestação dos serviços dos Serviços Ticket Digital por meio da Plataforma Ticket Digital.
                </p>
                <p>
                    1.3 Esta Política de Privacidade não abrange as práticas de privacidade e proteção de dados de terceiros. Para políticas aplicáveis aos seus dados pessoais processados por terceiros parceiros dos Serviços Ticket Digital sugerimos que consulte os respetivos sites.
                </p>
                <h2><strong>2. DEFINIÇÕES GERAIS</strong></h2>


                <p>
                    2.1. Ao longo desta Política de Privacidade, o Usuário encontrará uma série de outras palavras ou expressões iniciadas por letra maiúscula. Abaixo, apresentamos os significados dessas palavras/expressões, seja no plural ou no singular, sem prejuízo de outros termos definidos ao longo deste instrumento:
                </p>
                <ul>

                    <li><span style={{textDecoration: 'underline'}}>Usuário</span>: significa a pessoa natural, capaz de praticar atos da vida civil ou devidamente representada ou assistida, conforme o caso, que (i) efetivamente contrate, utilize ou acesse um ou mais Serviços Ticket Digital (seja para si mesmo ou para sua pessoa jurídica);</li>

                    <li><span style={{textDecoration: 'underline'}}>Anonimização</span>: significa a técnica por meio da qual um dado perde a possibilidade de associação, direta ou indireta, a um indivíduo, de modo que posteriormente é impossível a reidentificação mesmo que por soluções técnicas.</li>

                    <li><span style={{textDecoration: 'underline'}}>Autoridade Nacional de Proteção de Dados Pessoais (ANPD)</span>: significa o órgão da administração pública federal com atribuições relacionadas a proteção de dados pessoais e privacidade, incluindo a fiscalização para o cumprimento da LGPD.</li>

                    <li><span style={{textDecoration: 'underline'}}>Cookies</span>: é um arquivo pequeno que contém uma sequência de caracteres, criado e enviado pelos websites ao seu computador sempre que você os visita. Eles ajudam a lembrar suas preferências e personalizar seu acesso tornando sua navegação mais segura, rápida e agradável. Você consegue configurar seu navegador para não aceitar cookies ou avisar quando um cookie estiver sendo enviado, mas sem eles alguns recursos ou serviços do site podem ficar comprometidos e limitados.</li>

                    <li><span style={{textDecoration: 'underline'}}>Dados Pessoais</span>: significa as informações que identificam ou que podem identificar o Usuário.</li>

                    <li><span style={{textDecoration: 'underline'}}>Dispositivo</span>: significa o aparelho - como computadores, tablets e smartphones - que pode ser usado pelo Usuário para acessar o Ticket Digital.</li>

                    <li><span style={{textDecoration: 'underline'}}>Endereço IP</span>: é o número atribuído a cada Dispositivo conectado ao Ticket Digital, conhecido como endereço de protocolo de Internet (Internet Protocol Address ou IP). Geralmente, esses números são atribuídos em blocos geográficos. Um endereço IP pode ser usado para identificar, por exemplo, de qual local um Dispositivo está se conectando à Internet.</li>

                    <li><span style={{textDecoration: 'underline'}}>LGPD</span>: significa a Lei nº 13.709/2018, Lei Geral de Proteção de Dados Pessoais.</li>

                    <li><span style={{textDecoration: 'underline'}}>Plataforma Ticket Digital</span>: significa a aplicação adaptada e desenvolvida para operação em website, aparelho celular smartphone, tablet ou qualquer outro dispositivo móvel, por meio da qual o Ticket Digital oferece os Serviços Ticket Digital aos Usuários.</li>

                    <li><span style={{textDecoration: 'underline'}}>Serviços Ticket Digital</span>: significa o serviço fornecido pelo Ticket Digital, para buscar e acessar conteúdo do Ticket Digital, incluindo todos os recursos e funcionalidades, recomendações e avaliações, nossos sites e as interfaces do usuário, assim como todo o conteúdo e software associados ao serviço.</li>

                    <li><span style={{textDecoration: 'underline'}}>Titular dos Dados</span>: significa qualquer pessoa física identificada ou identificável a quem se referem os dados pessoais tratados. São, por exemplo, os Usuários, nossos clientes, potenciais clientes, correntistas, colaboradores, terceiros, prestadores de serviços, candidatos a vagas, dentre outros.</li>

                    <li><span style={{textDecoration: 'underline'}}>Tratamento</span>: significa toda operação que pode ser realizada com Dados Pessoais, como as que se referem a coleta, produção, recepção, classificação, utilização, acesso, reprodução, transmissão, distribuição, processamento, arquivamento, armazenamento, eliminação, avaliação ou controle da informação, modificação, comunicação, transferência, difusão ou extração.</li>

                    <li><span style={{textDecoration: 'underline'}}>Sites de Terceiros</span>: significa que o Portal possui links para outros sites e serviços online de terceiros, acessíveis por meio de possui links disponíveis na Plataforma Ticket Digital, e a utilização de tais sites e serviços por você está sujeita a termos de uso e política de privacidade de tais terceiros, especialmente de Anunciantes e Parceiros.</li>
                </ul>
                <p>
                    2.2 Esta Política de Privacidade não trata das práticas de privacidade e proteção de dados realizadas por terceiros. A inclusão de um link em nosso Portal não implica em endosso do Ticket Digital do site de terceiros vinculado na Plataforma Ticket Digital ou de seus produtos e serviços, sendo fornecido apenas para sua conveniência. Se decidir acessar qualquer um dos sites de terceiros vinculados a nosso Portal, estará sujeito aos termos e condições de uso e políticas desses sites de terceiros.
                </p>
                <h2><strong>3. INFORMAÇÕES QUE RECEBEMOS DE VOCÊ</strong></h2>


                <p>
                    3.1. O Ticket Digital coleta informações pessoais suas sempre que você usa nossos serviços. Algumas delas são informações que você nos fornece diretamente quando, por exemplo, registra uma conta ou faz uma compra. Outras informações são coletadas quando você interage conosco, como as conversas on-line que realiza com nossa equipe de suporte ao cliente. Nós também coletamos informações sobre a forma como você acessa, visualiza, compartilha, contribui para e se comunica com e através de nossos serviços, por exemplo quando você faz comentários em nossos canais de redes sociais.
                </p>
                <p>
                    3.2. Os Dados Pessoais coletados são utilizados para as seguintes principais finalidades:
                </p>
                <ul>

                    <li>(i) fornecer os serviços do Ticket Digital e/ou demais benefícios oferecidos por meio da Plataforma Ticket Digital;</li>

                    <li>(ii) aprimorar e desenvolver os Serviços Ticket Digital, e oferecer ao Usuário uma melhor experiência com a Plataforma Ticket Digital;</li>

                    <li>(iii) identificar, autenticar e verificar os requisitos para contratação dos Serviços Ticket Digital;</li>

                    <li>(iv) manter contato com o Usuário no geral, incluindo para atendimento por meio dos Canais de Atendimento e para envio de notificações relativas aos Serviços Ticket Digital;</li>

                    <li>(v) cumprir as obrigações e requisitos legais e/ou exigidos por autoridades competentes;</li>

                    <li>(vi) detectar, prevenir e solucionar de problemas técnicos ou de segurança, fraudes, atos ilícitos, crimes financeiros e crimes relacionados a fim de proteger a segurança de nossos Usuários e a sustentabilidade da Plataforma Ticket Digital;</li>

                    <li>(vii) proteger os direitos de Usuários, terceiros ou do próprio Ticket Digital;</li>

                    <li>(viii) fazer anúncios e contatos publicitários e promocionais;</li>

                    <li>(ix) para notificar o Usuário sobre eventuais alterações nos Serviços Ticket Digital.</li>
                </ul>
                <p>
                    3.3. Informações que recebemos do seu dispositivo:
                </p>
                <ul>

                    <li>(i) coletamos informações dos dispositivos que você usa para receber conteúdo, produtos e serviços do Ticket Digital. Isto inclui, mas não se limita ao seguinte: seu endereço de IP (um número que identifica um dispositivo específico na internet e é necessário para que seu dispositivo se comunique com sites), modelo de hardware, sistema operacional e versão, software, idioma de preferência, números de série, informações de movimento do dispositivo, informações da rede móvel e dados de localização;</li>

                    <li>(ii) nós também coletamos logs de servidores, que incluem informações como data e hora de acesso, funcionalidades ou páginas do aplicativo que você visualizou, falhas no aplicativo e outras atividades do sistema, e o site ou serviço de terceiros que você estava usando imediatamente antes de acessar nosso site.</li>
                </ul>
                <p>
                    3.4. Cookies. Os cookies coletam algumas informações pessoais sobre você sempre que você usar nossos sites. Você pode escolher se deseja aceitar ou rejeitar alguns ou todos os tipos de Cookies, e isto pode ser controlado por meio das configurações do navegador do seu dispositivo. Nós vamos avisar você disso exibindo nosso banner de Cookies quando você aceitar nosso site. <strong>Se você continuar a usar nossos sites sem ajustar as configurações do seu navegador, usaremos todos os Cookies necessários para funcionamento correto da Plataforma Ticket Digital,</strong> portanto, para ajudar você a tomar uma decisão bem-informada, é importante saber por que usamos os diferentes tipos de Cookies e o que isso significa para a sua experiência on-line. Esta seção fornece um resumo dos pontos principais e explica como desabilitar cada um dos diferentes tipos de Cookie afetará sua experiência em nossos sites.
                </p>
                <p>
                    3.5. Dados cadastrais. Tratamos os seguintes Dados Pessoais para realizar o cadastro do Usuário na Plataforma Ticket Digital: Nome completo e endereço de e-mail.
                </p>
                <p>
                    3.6. Dados de Compras. Tratamos os seguintes Dados Pessoais para o Usuário efetuar uma compra de um serviço Ticket Digital na Plataforma Ticket Digital: Nome completo, endereço de e-mail, CPF ou CNPJ, número de telefone e endereço residencial para que possamos verificar se seu cadastro na Plataforma Ticket Digital está ativo (se o Ticket Digital não identificar o Titular dos Dados como usuário ativo, os Dados Pessoais recebidos serão descartados de nosso banco de dados imediatamente).
                </p>
                <p>
                    3.7. Dados de Marketing. Tratamos os seguintes Dados Pessoais para definir a origem do cadastro do Usuário e/ou das compras realizadas na Plataforma Ticket Digital, o que possibilita que o Ticket Digital otimize custos com campanhas, investimentos entre as plataformas oferecidas (Site) e realize marketing direcionado ao Usuário com base em suas características e informações: gênero, data de nascimento, estado civil, profissão, categorias ou produtos comprados, termos buscados no Ticket Digital, data de cadastro no Ticket Digital, data de última visita, última página visitada pelo Usuário antes de entrar no Site, landing URL (URL de entrada no Site), informações do dispositivo, origem de cadastro (site desktop, site mobile, app IOS, app Android etc.), interações com e-mails (se o Usuário abriu nossos e-mails, por exemplo), perfil e comportamento de compra, volume e número de transações em estabelecimentos e por meio de aplicações, dados gerais de navegabilidade, utilização das aplicações, funis de eventos.
                </p>
                <p>
                    3.8. Notificações do Navegador. O Usuário poderá ser convidado a habilitar as notificações do navegador, de forma que passe a receber alertas sobre compras em suas campanhas e ofertas do Ticket Digital no navegador que estiver utilizando. A qualquer momento, o Usuário pode ativar ou desativar as notificações no navegador, por meio das configurações da sua conta.
                </p>
                <h2><strong>4. COM QUEM SEUS DADOS PODEM SER COMPARTILHADOS</strong></h2>


                <p>
                    4.1. O Ticket Digital poderá compartilhar os Dados Pessoais dos Usuários com os terceiros indicados abaixo, somente na medida em que se fizer necessária para que as finalidades aqui previstas sejam atingidas.
                </p>
                <p>
                    4.2. Caso você participe de uma campanha, o(a) administrador(a) desta campanha terá acesso aos seus dados informados.
                </p>
                <p>
                    4.2. Poderemos compartilhar os Dados Pessoais dos Usuários com autoridades competentes e órgãos reguladores para:
                </p>
                <ul>

                    <li>(i) cumprir com decisões judiciais ou administrativas;</li>

                    <li>(ii) exercício regular de direitos do Ticket Digital, inclusive apresentando documento em processos;</li>

                    <li>(iii) cumprimento de obrigação legal ou regulatória.</li>
                </ul>
                <p>
                    4.3. Prestadores de Serviços e Parceiros de Negócios. Para execução dos serviços contratados, incluindo:
                </p>
                <ul>

                    <li>(i) prestadores de serviços técnicos que operam a infraestrutura técnica de que necessitamos para fornecer os Serviços Ticket Digital, em particular fornecedores que alojam, guardam, gerem e mantêm a Plataforma Ticket Digital funcionando;</li>

                    <li>(ii) Instituições Parceiras ou prestadores serviço que auxiliam o Ticket Digital na gestão de antifraude dos Serviços Ticket Digital;</li>

                    <li>(iii) prestadores de serviço que auxiliam o Ticket Digital na pesquisa de satisfação com Usuário;</li>

                    <li>(iv) prestadores de serviço que auxiliam o Ticket Digital na cobrança de dívidas, na proteção ao crédito e na prevenção de fraudes, incluindo instituições financeiras, instituições de pagamento e outros que forem necessários. Os prestadores de serviços que precisem acessar as informações para execução do trabalho em nosso nome estarão obrigados a seguir as mesmas regras dispostas nesta Política de Privacidade.</li>
                </ul>
                <p>
                    4.4. Terceiros. Para viabilizar venda, parcial ou total (inclusive em conexão com falência ou processo semelhante), ou como parte de qualquer reorganização ou reestruturação do negócio, fusão, cisão ou incorporação, de modo que poderemos compartilhar as informações dos Usuários com terceiros que façam parte dos negócios, tomando as medidas necessárias para garantir que os direitos de privacidade dos Usuários sejam sempre respeitados.
                </p>
                <h2><strong>5. SEGURANÇA DAS INFORMAÇÕES</strong></h2>


                <p>
                    5.1. Todos os Dados Pessoais Tratados pelo Ticket Digital são armazenados em um banco de dados reservado e com acesso restrito a alguns funcionários habilitados cujas funções requeiram acesso e utilização nos termos desta Política de Privacidade ou para fins de segurança.
                </p>
                <p>
                    5.2. O Ticket Digital utiliza mecanismos de segurança de acordo com os melhores padrões e práticas adotados pelo mercado, que visam a assegurar a privacidade, autenticidade e inviolabilidade das informações.
                </p>
                <p>
                    5.3. Apesar desse mecanismo garantir a inviolabilidade dos dados coletados, é importante que o Usuário realize procedimentos básicos de segurança em seu celular e/ou computador, por meio da utilização de ferramentas como antivírus, além de não fornecer ou informar sua senha a quaisquer terceiros.
                </p>
                <h2><strong>6. TRANSFERÊNCIA INTERNACIONAL DE DADOS</strong></h2>


                <p>
                    6.1. O Ticket Digital armazena seu banco de dados em sistemas de nuvem hospedados no Brasil e nos Estados Unidos. Dessa forma, o Ticket Digital adotará medidas legais que assegurarão que os Dados Pessoais estejam sujeitos a medidas que assegurem nível de proteção equivalente ao assegurado por esta Política de Privacidade e pela legislação aplicável.
                </p>
                <h2><strong>7. DURAÇÃO DO ARMAZENAMENTO DOS DADOS PESSOAIS</strong></h2>


                <p>
                    7.1. Mantemos os Dados Pessoais enquanto a relação contratual entre você e o Ticket Digital perdurar, inclusive para fins de cumprimento de quaisquer obrigações legais, contratuais, de prestação de contas ou requisição de autoridades competentes.
                </p>
                <p>
                    7.2. Caso determinados que os Dados Pessoais deixem de ser necessários para o alcance de determinada finalidade aos Serviços Ticket Digital, tais dados serão excluídos ou anonimizados.
                </p>
                <h2><strong>8. DISPOSIÇÕES GERAIS</strong></h2>


                <p>
                    8.1. O Ticket Digital compromete-se a, sempre que possível, tentar solucionar amigavelmente eventuais disputas que surgirem junto ao Usuário. Quando tal solução amigável não for bem-sucedida, o foro eleito para a solução da disputa será o da Comarca de São João Batista, Estado de Santa Catarina, com renúncia de todos os outros, por mais privilegiados que sejam.
                </p>
                <p>
                    8.2. Esta Política de Privacidade poderá ser modificada livremente e a qualquer tempo pelo Ticket Digital. O Usuário será notificado pelos Canais de Comunicação Ticket Digital, bem como o Ticket Digital colocará um aviso no Site, sempre que esta Política de Privacidade for atualizada e/ou modificada. Ao continuar a utilizar os Serviços Ticket Digital após uma alteração desta Política de Privacidade, o Usuário estará concordando com as novas condições – mas o Usuário sempre pode manifestar a sua discordância por meio dos nossos Canais de Atendimento, se for o caso.
                </p>
            </Card>
            <SpaceBox space={80} />
        </FragmentView>
    )
}
