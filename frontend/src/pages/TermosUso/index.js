import React, { useState } from 'react'
import FragmentView from '../../components/FragmentView'
import SpaceBox from '../../components/SpaceBox';
import { Card } from '../../components';

export default () => {
    return (
        <FragmentView headerMode={"USER"}>
            <SpaceBox space={20} />
            <h1 className={"responsive-margin"}>Termos de Uso</h1>
            <SpaceBox space={20} />
            <Card className={"responsive-margin"} style={{ padding: '20px' }}>
                <h2><strong>1. INTRODUÇÃO</strong></h2>


                <p>
                    1.1. Agradecemos o seu interesse em utilizar o serviço oferecido pelo Ticket Digital.
                </p>
                <p>
                    1.2. Estes Termos (<strong>“Termos de Uso”</strong>) estabelecem a relação contratual entre os usuários que utilizam os serviços Ticket Digital por meio da Plataforma Ticket Digital, bem como estabelecem as regras de utilização da Plataforma Ticket Digital pelos Usuários, além de deixar claro quais serão as responsabilidades dos Usuários e do Ticket Digital, em conformidade com a legislação brasileira, incluindo as disposições da Lei nº 12.965/14 e do Decreto nº 8.771/16.
                </p>
                <p>
                    1.3. Para que o Usuário possa utilizar os serviços Ticket Digital, o Usuário deverá ser pessoa natural e ter plena capacidade legal para contratar os serviços Ticket Digital, nos termos da legislação aplicável. Caso o Usuário não seja legalmente capaz, o Usuário não deverá aceitar estes Termos e não deverá acessar os serviços Ticket Digital.
                </p>
                <p>
                    1.4. Estes Termos estão sujeitos a modificações em qualquer momento, mediante a publicação de uma versão atualizada. O acesso ou a utilização contínua dos Serviços Ticket Digital após a entrada em vigor dos Termos atualizados será considerado como uma aceitação dos Termos modificados por parte do usuário. Modificações significativas nestes Termos serão comunicadas aos Usuários por meio de e-mail ou pela divulgação de um aviso através da Plataforma Ticket Digital. A data da última revisão estará disponível na página destes Termos.
                </p>
                <h2><strong>2. PRINCIPAIS DEFINIÇÕES</strong></h2>


                <p>
                    2.1. Ao longo destes Termos, o Usuário encontrará uma série de palavras ou expressões iniciadas por letra maiúscula. Abaixo, apresentamos os significados dessas palavras/expressões, seja no plural ou no singular, sem prejuízo de outros termos definidos ao longo deste instrumento:
                </p>
                <ul>

                    <li><span style={{textDecoration: 'underline'}}>Canais de Comunicação Ticket Digital:</span> significa o espaço de notificações ao Usuário no seu perfil dentro da Plataforma Ticket Digital, e-mails, mensagens “SMS” e/ou o espaço de notificações ao Usuário dentro do Aplicativo, ou qualquer outra forma de comunicação entre Ticket Digital e Usuário, de forma que o Ticket Digital possa manter o Usuário informado sobre quaisquer ocorrências, atualizações, Transações ou possa enviar qualquer notificação de interesse do Usuário;</li>

                    <li><span style={{textDecoration: 'underline'}}>Central de Atendimento:</span> significa os seguintes canais de atendimento disponíveis ao Usuário:</li>
                    <ul>

                        <li>Central de Ajuda através do canal de ajuda com artigos elaborados pela equipe de atendimento do Ticket Digital;</li>

                        <li>Enviar mensagens de texto para esclarecer dúvidas e/ou enviar reclamações no “WhatsApp” através do telefone +55 48 99210-0283. Habitualmente disponível em dias úteis das 9h às 18h, horário de Brasília.</li>
                    </ul>

                    <li><span style={{textDecoration: 'underline'}}>Plataforma Ticket Digital:</span> significa a aplicação adaptada e desenvolvida para operação em website, aparelho celular smartphone, tablet ou qualquer outro dispositivo móvel;</li>

                    <li><span style={{textDecoration: 'underline'}}>Serviços Ticket Digital:</span> significa o serviço fornecido pelo Ticket Digital, para buscar e acessar conteúdo do Ticket Digital, incluindo todos os recursos e funcionalidades, recomendações e avaliações, nossos sites e as interfaces do usuário, assim como todo o conteúdo e software associados ao serviço;</li>

                    <li><span style={{textDecoration: 'underline'}}>Usuário:</span> significa a pessoa natural, capaz de praticar atos da vida civil ou devidamente representada ou assistida, conforme o caso, que (i) efetivamente contrate, utilize ou acesse um ou mais Serviços Ticket Digital (seja para si mesmo ou para sua pessoa jurídica);</li>

                    <li><span style={{textDecoration: 'underline'}}>Organizador:</span> esta designação aplica-se ao Usuário que detém privilégios administrativos sobre uma ou mais Campanhas, quer por ter iniciado uma Campanha por si mesmo, quer por ter recebido direitos de acesso à conta por parte do criador da mesma;</li>

                    <li><span style={{textDecoration: 'underline'}}>Campanhas:</span> são quaisquer ações ou projetos realizados pelos Organizadores cadastrados por meio da Plataforma Ticket Digital, para que Usuários visualizem e colaborem, de acordo com seus interesses.</li>

                    <li><span style={{textDecoration: 'underline'}}>Participantes</span>: aplica-se ao Usuário que participa de uma Campanha criada por um Organizador na Plataforma Ticket Digital.</li>
                </ul>
                <h2><strong>3. SOBRE OS SERVIÇOS</strong></h2>


                <p>
                    3.1. O Ticket Digital é uma plataforma tecnológica desenvolvida para possibilitar a criação de ação entre amigos, Campanhas de arrecadação com fins beneficentes, ou para suportar causas sem fins lucrativos.
                </p>
                <p>
                    3.2. O Ticket Digital não é uma plataforma de jogos. O usuário arrecadador não deve criar campanhas com intenções iguais ou semelhantes a um jogo de azar.
                </p>
                <p>
                    3.3. O Ticket Digital não organiza nem gere campanhas. A responsabilidade pela criação e gestão das campanhas é dos usuários organizadores, não cabendo à plataforma requerer eventuais autorizações que o organizador entender necessárias às especificidades de sua campanha.
                </p>
                <p>
                    3.4. <strong>O Ticket Digital não intermedeia nenhum pagamento realizado em Campanhas, entretanto, é de responsabilidade do(a) Organizador(a) das Campanhas comprometer-se com os pagamentos realizados pelos participantes.</strong>
                </p>
                <p>
                    3.5. <strong>Ao utilizar a Plataforma Ticket Digital, na qualidade de Organizador ou Participante, você atua como contratante dos serviços de intermediação fornecidos pelo Ticket Digital. O Ticket Digital não concebe, elabora, controla, endossa ou disponibiliza qualquer Campanha, sendo de exclusiva responsabilidade dos Organizadores o conteúdo e as informações divulgadas em suas respectivas Campanhas. Ao aceitar os presentes Termos e utilizar a Plataforma Ticket Digital, você o faz de forma voluntária, assumindo integralmente os riscos inerentes a tal uso. Salvo nas hipóteses de responsabilidade previstas em lei, o Ticket Digital não será responsabilizada por quaisquer danos, de qualquer natureza, decorrentes do acesso ou utilização do site ou dos Serviços, sejam eles patrimoniais ou extrapatrimoniais, diretos ou indiretos, incluindo danos emergentes ou lucros cessantes.</strong>
                </p>
                <h2><strong>4. UTILIZAÇÃO DA PLATAFORMA TICKET DIGITAL</strong></h2>


                <p>
                    4.1. Todo o conteúdo disponibilizado pelo Ticket Digital na Plataforma Ticket Digital, bem como toda a tecnologia, todos os códigos e softwares envolvidos no desenvolvimento da Plataforma Ticket Digital, além de quaisquer marcas, logotipos, layouts, modelos, textos, desenhos, sons, imagens, e qualquer outro material disponibilizado pelo Ticket Digital aos Usuários são considerados propriedade única e exclusiva do Ticket Digital, e estão protegidos nos termos da legislação aplicável à propriedade intelectual, bem como não infringem qualquer lei ou norma a que estejam subordinadas, contratos, documentos, acordos ou direitos de terceiros.
                </p>
                <p>
                    4.2. Exceto pelo uso da Plataforma Ticket Digital, conforme aqui previsto, estes Termos e/ou o uso da Plataforma Ticket Digital não concedem ao Usuário qualquer outro direito sobre a Plataforma Ticket Digital ou sobre qualquer outra propriedade intelectual do Ticket Digital ou de terceiros.
                </p>
                <p>
                    4.3. O Usuário concorda em:
                </p>
                <ul>

                    <li>(i) fazer uso adequado e lícito da Plataforma Ticket Digital, com a finalidade para a qual foram disponibilizados pelo Ticket Digital, e de acordo com a lei aplicável, com estes Termos e com a Política de Privacidade;</li>

                    <li>(ii) respeitar os direitos autorais e a propriedade intelectual do Ticket Digital e de terceiros, e não se apropriar de propriedade intelectual ou conteúdo do Ticket Digital e de terceiros, por meio de qualquer mecanismo;</li>

                    <li>(iii) manter atualizados os seus dados e informações fornecidos ao Ticket Digital;</li>

                    <li>(iv) realizar os pagamentos devidos de forma correta, nas datas e condições estipuladas e de forma lícita.</li>
                </ul>
                <p>
                    4.4. É vedado ao Usuário:
                </p>
                <ul>

                    <li>(a) modificar, destruir, danificar, copiar, distribuir, transmitir, exibir, reproduzir, publicar, decompilar, realizar engenharia reversa, desmontar, desfazer a criptografia ou sublicenciar a Plataforma Ticket Digital e/ou criar obras derivadas a partir das informações coletadas na Plataforma Ticket Digital;</li>

                    <li>(b) praticar quaisquer condutas que possam causar danos e/ou interferir no bom funcionamento da Plataforma Ticket Digital, incluindo a inserção de qualquer programa malicioso, vírus ou malware;</li>

                    <li>(c) testar a vulnerabilidade da Plataforma Ticket Digital ou de qualquer sistema do Ticket Digital, bem como violar, ou tentar violar, suas medidas de segurança ou autenticação;</li>

                    <li>(d) utilizar a Plataforma Ticket Digital para qualquer outra finalidade que não seja permitida expressamente por esses Termos ou pelas leis aplicáveis e/ou utilizá-las em benefício de terceiros;</li>

                    <li>(e) tentar se passar por outra pessoa, autorizar terceiros a usarem o seu acesso, falsificar, omitir ou simular endereços IPs, de rede ou de correio eletrônico, na tentativa de ocultar sua identidade ou autoria;</li>

                    <li>(f) coletar qualquer dado ou informação pessoal ou confidencial da Plataforma Ticket Digital ou utilizar os sistemas de comunicação fornecidos para fins de solicitação comercial, envio ou redirecionamento de mensagens;</li>

                    <li>(g) realizar quaisquer atos contrários à moral, à lei e/ou à ordem pública e, incluindo pornografia, corrupção, lavagem de dinheiro, entre outros.</li>
                </ul>
                <p>
                    4.4.1. Sem prejuízo das demais hipóteses previstas nestes Termos, a prática de qualquer dos atos listados acima poderá levar ao bloqueio, suspensão ou cancelamento da conta do Usuário ou da utilização da Plataforma Ticket Digital pelo Usuários, a qualquer momento, a critério do Ticket Digital.
                </p>
                <p>
                    4.5. O Ticket Digital presta seus serviços com o máximo de diligência e técnica, utilizando os mais altos padrões de segurança da informação, mas não presta qualquer garantia de que a Plataforma Ticket Digital não apresentará falhas, erros e que serão 100% seguros ou ininterruptamente utilizáveis. A Plataforma Ticket Digital é fornecida ao Usuário, sem garantia de qualquer natureza, expressa ou tacitamente, incluindo, sem limitação, garantias de ausência de violação, exatidão, desempenho, esforço, garantias de adequação a fim genérico e/ou específico.
                </p>
                <p>
                    4.6. O Ticket Digital se esforça ao máximo para prevenir ataques externos, vírus e outros malwares em seus próprios sistemas, mas não pode garantir a ausência desses ou de outros elementos potencialmente nocivos. Sendo assim, é de responsabilidade do Usuário manter seu sistema protegido contra vírus e outros malwares. Dessa forma, não nos responsabilizamos por danos causados por vírus e malwares em decorrência de acesso, utilização ou navegação no site ou na Plataforma Ticket Digital ou como consequência da transferência de dados, arquivos, imagens, textos ou áudio contidos no site ou na Plataforma Ticket Digital. É de responsabilidade do Usuário a certificação de estar acessando sua conta, seja na Plataforma Ticket Digital, por meio de redes seguras. Não recomendamos utilizar computadores não confiáveis ou redes públicas não protegidas para acessar a Plataforma Ticket Digital ou o site.
                </p>
                <h2><strong>5. À RESPEITO DA CRIAÇÃO DE CAMPANHAS</strong></h2>


                <p>
                    5.1. Ao criar uma campanha no Ticket Digital, você declara que todas as informações fornecidas, incluindo, sem limitação, qualquer tipo de informação de identificação pessoal, informações bancárias e outras informações sensíveis ou confidenciais de sua propriedade ou relacionadas a você (“Informações Pessoais”) são verdadeiras, bem como assume a responsabilidade pela atualização de seus dados objetivando a manutenção da veracidade das informações fornecidas à plataforma.
                </p>
                <p>
                    5.2. Só poderão criar campanhas usuários com 18 anos ou mais. A responsabilidade pelas informações fornecidas na criação da campanha, imagens e vídeos publicados é inteiramente do usuário organizador que a criou.
                </p>
                <p>
                    5.3. <strong>Os serviços oferecidos pelo Ticket Digital não incluem qualquer responsabilidade sobre valores, aportes, contribuições ou outros recursos que você tenha decidido aplicar, mesmo que destinados a contas indicadas por outros usuários. A atuação do Ticket Digital é limitada à disponibilização desta plataforma, oferecendo suporte conforme os termos aqui apresentados. É de sua responsabilidade garantir a legalidade e legitimidade das atividades que realiza.</strong>
                </p>
                <p>
                    5.4. Após a criação da campanha, é possível editar informações da mesma, como por exemplo título, valor por bilhete, adicionar promoções e/ou cupons, e entretanto, editar por exemplo a data de encerramento da campanha, para prorrogá-la ou antecipá-la, desde que isso seja feito antes da data de encerramento.
                </p>
                <p>
                    5.5. Ao criar uma campanha, você declara a obrigação de realizar a entrega dos produtos e/ou serviços na quantidade, modelo e dentro do prazo estabelecido por você, também assumirá toda responsabilidade pela entrega dos produtos e serviços fora dos parâmetros acordados, bem como pela não entrega dos mesmos.
                </p>
                <p>
                    5.6. Procedência e Licitude dos Brindes. Você declara que criará campanhas apenas com produtos ou serviços que tenham origem e natureza lícitas, não violem qualquer direito de terceiros, incluindo direitos de propriedade intelectual, não violem os direitos de qualquer pessoa ou entidade, incluindo, sem limitação, os direitos de publicidade ou privacidade; não violem direitos de menores de idade, não desrespeitem os direitos dos consumidores, nos termos da lei aplicável, não apresentam caráter difamatório, e que sua comercialização é permitida e está em conformidade com a legislação brasileira vigente. Portanto, ao criar qualquer campanha na plataforma Ticket Digital, você concorda, reconhece e assume a responsabilidade por certificar-se da origem, procedência, licitude e validade relacionadas aos produtos ou serviços ofertados assim como de sua compatibilidade com este Termo de Uso.
                </p>
                <p>
                    5.7. Pedidos de Campanhas ou "rifinhas" que estejam com o status "pago" e que estejam reservados há 7 dias ou mais serão bloqueados e não poderão ser removidos da plataforma.
                </p>
                <p>
                    5.8. A responsabilidade pela realização do sorteio, independentemente do método escolhido, cabe exclusivamente ao Organizador da Campanha, que se compromete a divulgar a data do sorteio na página da Campanha e a informar o(s) ganhador(es). O Ticket Digital pode suspender, reverter ou cancelar Campanhas se o Organizador fornecer informações falsas ou não cumprir com as propostas iniciais divulgadas.
                </p>
                <p>
                    5.9. Caso a campanha criada atinja a venda de todos os bilhetes, ou o sorteio da mesma tenha sido realizado, a campanha ficará bloqueada de editar as informações, de criar novas “rifinhas”, e de editar ou remover pedidos.
                </p>
                <p>
                    5.10. O Ticket Digital poderá suspender, reverter, ou cancelar campanhas da conta do(a) criador(a) caso o criador(a) da campanha preste informações falsas ou não entregue eventuais prêmios prometidos na quantidade, modelo e dentro prazo convencionados.
                </p>
                <p>
                    5.11. Caso o(s) prêmio(s) da "rifinha" não sejam uma quantidade de bilhetes para a campanha principal, o Ticket Digital poderá suspender, reverter, ou cancelar campanhas e/ou a "rifinha" da conta do(a) criador(a).
                </p>
                <p>
                    5.12. O Organizador da campanha é responsável por fornecer todo o suporte aos seus clientes (Usuários que participam em sua Campanha). O suporte deverá ser realizado através do número de telefone de contato fornecido pelo Organizador durante a criação da campanha, que deverá ser válido. O Ticket Digital está isento de qualquer responsabilidade em relação ao esclarecimento de dúvidas dos participantes de suas Campanhas.
                </p>
                <p>
                    5.13. O Usuário reconhece que o site e a Plataforma Ticket Digital foram desenvolvidos de forma a permitir a edição apenas de determinados campos e informações. Essa edição deve ser feita exclusivamente através das ferramentas e opções disponibilizadas diretamente na plataforma.
                </p>
                <p>
                    5.14. O usuário se compromete a respeitar as limitações da plataforma no que se refere à edição de conteúdo e informações, entendendo que tais limitações existem para garantir a segurança, a integridade e a correta funcionalidade da plataforma.
                </p>
                <p>
                    5.15. Em caso de solicitação, presença de justificativa plausível, identificação de fraude ou quaisquer outras circunstâncias similares, o Ticket Digital reserva-se o direito de proceder com o cancelamento da(s) campanha(s). Em tais circunstâncias, fica estabelecido que os usuários têm pleno conhecimento de que o cancelamento acarretará, caso possível, a restituição dos montantes angariados através de serviços financeiros, assegurando a proteção de todos os Usuários contra possíveis prejuízos.
                </p>
                <p>
                    5.16. Os serviços prestados pelo Ticket Digital não constituem e não têm a intenção de ser equiparados aos serviços prestados por instituições de pagamento, instituições financeiras ou por entidades administradoras ou emissoras de cartão de crédito. Tais serviços de agência destinam-se exclusivamente a promover a facilitação das transações de pagamento entre os Usuários, cabendo esclarecer que o processamento de pagamentos das transações é realizado sob a responsabilidade e a comando dos próprios Usuários. Ressalta-se que o Ticket Digital não se qualifica como uma instituição financeira e não executa, de maneira direta, atividades de concessão de crédito.
                </p>
                <p>
                    5.17. Serviços de Terceiros: As operações financeiras conduzidas na Plataforma estão limitadas aos recursos financeiros possuídos pelos Usuários. Com o objetivo de auxiliar neste processo, o Ticket Digital pode oferecer opções de meios de pagamento providos por terceiros, facilitando assim a captação de fundos por meio do pagamento de valores ou antecipação de recebíveis oriundos das transações (tais como, mas não limitado a, instituições bancárias, administradoras de cartões de crédito e outras entidades financeiras). Em tais circunstâncias, é possível que se apliquem termos e condições específicos, os quais os Usuários são obrigados a observar e cumprir. Cabe destacar que o Ticket Digital não assume responsabilidade pela disponibilidade ou exatidão dos Serviços de Terceiros providos.
                </p>
                <p>
                    5.18. A responsabilidade pelo pagamento de todos os impostos recai sobre o Organizador. Os participantes das campanhas são exclusivamente responsáveis por definir o tratamento fiscal de seus pagamentos às Campanhas e pela recepção de quaisquer itens (bens tangíveis ou intangíveis fornecidos a um participante pelo Organizador) em termos fiscais.
                </p>
                <p>
                    5.19. Não participamos em controvérsias jurídicas entre Usuários ou entre Usuários e terceiros. Pela aceitação destes Termos, você expressamente concorda em eximir o Ticket Digital, bem como seus sócios, agentes ou representantes legais, de qualquer responsabilidade em litígios, sejam eles judiciais ou extrajudiciais, que você venha a promover contra outros Usuários ou terceiros relacionados ao uso do Site ou dos Serviços.
                </p>
                <p>
                    5.20. Caso o usuário opte por realizar ou receber colaborações diretamente, sem utilizar os serviços intermediários disponíveis na plataforma, deverá confirmar o recebimento do valor, assumindo total responsabilidade e risco.
                </p>
                <p>
                    5.21. Ao utilizar os Serviços ou criar uma Campanha, você poderá receber informações sobre outros Usuários, incluindo dados pessoais. Essas informações são fornecidas exclusivamente para atender aos requisitos da Campanha e outros serviços relacionados, sendo proibido seu uso para quaisquer outros fins, como marketing cruzado, sem o consentimento prévio e verificável do usuário.
                </p>
                <h2><strong>6. À RESPEITO DA PARTICIPAÇÃO DE CAMPANHAS</strong></h2>


                <p>
                    6.1. O Ticket Digital recomenda aos usuários que participem apenas de Campanhas de usuários que ele conheça e tenha uma relação mínima de confiança. O Ticket Digital oferece a plataforma como serviço, mas a criação e gestão das Campanhas são responsabilidade dos organizadores.
                </p>
                <p>
                    6.2. O Ticket Digital não assegura que as contribuições serão empregadas de acordo com o que foi prometido, não garante que os Organizadores cumprirão com a entrega dos itens prometidos, nem que a Campanha alcançará seus objetivos estabelecidos. Ademais, O Ticket Digital não endossa, não garante, nem faz representações ou oferece garantias relativas à qualidade, segurança, moralidade, e legalidade de qualquer Campanha, tampouco quanto à veracidade ou precisão do conteúdo do Usuário veiculado através dos Serviços.
                </p>
                <p>
                    6.3. Responsabilidade pelo pagamento. Você concorda e reconhece que ao comprar bilhetes de alguma Campanha, o pagamento foi realizado de forma livre, consciente e voluntária através do contato direto com o criador(a) da Campanha. Portanto, você é o único responsável pelo referido pagamento, que será efetuado de acordo com as condições e formas de pagamento previstas ou negociadas, sem prejuízo de outras obrigações assumidas com o criador(a) da campanha. Por isso, antes de efetuar uma compra de bilhetes, o usuário deve procurar obter todas as informações junto ao criador(a) da campanha e buscar averiguar a veracidade de tais informações, origem e procedência dos produtos ou serviços, devendo avaliar por sua conta e risco a conveniência de prosseguir com a transação.
                </p>
                <p>
                    6.4. O Ticket Digital não tem obrigação de fornecer nenhum reembolso ou se envolver em qualquer disputa entre um Organizador e um Participante. Na hipótese de uso inadequado da Plataforma, caberá ao Usuário as consequências legais, cíveis e criminais que o caso ensejar. Sendo assim, caberá ao Ticket Digital suspender ou cancelar de maneira imediata qualquer publicação de campanha que viole a legislação vigente, sendo inoportuno e descabido qualquer pedido de reembolso ou reparação.
                </p>
                <p>
                    6.5. O Ticket Digital não garante itens ou reembolsos. Os Organizadores são os únicos responsáveis pela entrega dos itens e pela oferta de reembolsos.
                </p>
                <h2><strong>7. PROIBIÇÕES</strong></h2>


                <p>
                    7.1. Não é permitido aos usuários utilizarem contas fakes/falsas para criar ações com o intuito de ludibriar, enganar ou criar falsas expectativas aos demais usuários.
                </p>
                <p>
                    7.2. Não são permitidas campanhas que prometam oferecer os seguintes itens: explosivos; armas de fogo; medicamentos; produtos químicos de potencial periculosidade; e quaisquer outros que a administração julgue inapropriado, ofensivo ou em contradição com estes termos e as leis vigentes.
                </p>
                <p>
                    7.3. Você se compromete a não transmitir, introduzir, difundir ou colocar à disposição de terceiros qualquer tipo de material ou informação (dados de conteúdos, mensagens, desenhos, arquivos de som e imagem, fotografias, software, etc.) que sejam contrários à legislação vigente, à moral, à ordem pública, e ao presente Termo de Uso.
                </p>
                <p>
                    7.4. Não é permitido aos utilizadores postar informações de cunho preconceituoso, ofensivo, violento nas descrições das campanhas.
                </p>
                <p>
                    7.5. Você se compromete em não divulgar, difamar, transmitir ou colocar à disposição de terceiros qualquer informação pessoal de usuários que participarem de suas campanhas.
                </p>
                <p>
                    7.6. Não é permitido que o(a) administrador(a) de uma campanha arrecade com a mesma, remova todos os pedidos da campanha e inicie uma nova sem pagar o valor cobrado pela Plataforma Ticket Digital para criar uma nova campanha, causando prejuízos a Plataforma Ticket Digital.
                </p>
                <p>
                    7.7. Não será permitido realizar alterações ou modificações que não estejam disponibilizadas para edição na Plataforma Ticket Digital. Toda tentativa de alterar informações ou campos que não foram explicitamente disponibilizados para edição pode resultar na suspensão ou banimento do Usuário, a critério exclusivo do Ticket Digital.
                </p>
                <h2><strong>8. DIREITOS DO TICKET DIGITAL</strong></h2>


                <p>
                    8.1. O Ticket Digital poderá remover, a seu exclusivo critério, as campanhas que não estejam de acordo com este Termo de Uso e as leis vigentes. Não obstante a remoção da campanha, o Ticket Digital se reserva ainda o direito de exclusão ou inabilitação do Usuário infrator.
                </p>
                <p>
                    8.2. No sentido de melhor atender requisitos de transparência e zelar pelo bom funcionamento e segurança das relações entre os usuários da plataforma, o Ticket Digital poderá, a seu critério, verificar a validade de dados de contato fornecidos, como telefone e e-mail. Esta verificação não acarreta em qualquer compromisso, garantia, obrigação ou responsabilidade do Ticket Digital quanto à veracidade destas informações, que continuam sendo de integral responsabilidade do Usuário que as disponibilizou.
                </p>
                <p>
                    8.3. Disponibilidade de informações. O Ticket Digital não se obriga a disponibilizar aos Usuários o backup de campanhas e/ou pedidos cujos prazos de disponibilidade já expiraram ou foram desativados por qualquer motivo, incluindo por ação própria do Usuário.
                </p>
                <p>
                    8.4. Exceto pelo uso da Plataforma Ticket Digital, conforme aqui previsto, estes Termos e/ou o uso da Plataforma Ticket Digital não concedem ao Usuário qualquer outro direito sobre a Plataforma Ticket Digital ou sobre qualquer outra propriedade intelectual do Ticket Digital ou de terceiros.
                </p>
                <h2><strong>9. GARANTIAS E RESPONSABILIDADES DO TICKET DIGITAL</strong></h2>


                <p>
                    9.1. Disponibilidade do serviço. A plataforma depende de muitos fatores alheios ao controle do Ticket Digital, como qualidade da internet do Usuário e configurações do dispositivo utilizado para acessá-la. Dessa forma, o Ticket Digital não garante a disponibilidade ininterrupta do funcionamento da plataforma ou de suas funcionalidades, não sendo responsável por nenhum dano ou prejuízo causado a você durante ou devido ao período de indisponibilidade, tais como doações frustradas e impedimento de sorteio o sorteio manual. Todavia garante que todas as informações recebidas durante o período de disponibilidade, como dados de doações, são preservados por rotinas constantes de backup.
                </p>
                <p>
                    9.2. Desvinculação com os usuários. O Ticket Digital não atua como prestadora de serviços de consultoria ou intermediação entre os usuários da plataforma. O Ticket Digital disponibiliza ferramenta tecnológica para que os usuários criem campanhas de arrecadação. Assim, O Ticket Digital não é responsável por danos e prejuízos oriundos dos negócios entre usuários, sendo estes responsáveis pelas próprias ações ou omissões, bem como por quaisquer imprecisões, erros e fraudes que possam advir das negociações. Anúncios de terceiros que conduzam a plataforma a erro também não são responsabilidade do Ticket Digital, e assim, qualquer reclamação ou ação legal que venha a ser necessária deve ser direcionada ao usuário ou ao terceiro que gerou o dano ou prejuízo.
                </p>
                <p>
                    9.3. Responsabilidade Tributária. Você é responsável pelas obrigações tributárias decorrentes de sua campanha, respondendo o Ticket Digital apenas pelas atividades desenvolvidas por si própria, observados os limites legais.
                </p>
                <p>
                    9.4. O Ticket Digital terá as seguintes responsabilidades:
                </p>
                <ul>

                    <li>(a) oferecer os serviços do Ticket Digital com o máximo de diligência e técnica, segundo parâmetros adotados por serviços similares e sempre observadas as obrigações, condições e limitações previstas nestes Termos;</li>

                    <li>(b) armazenar os seus dados de acordo com a legislação aplicável e com a nossa Política de Privacidade.</li>
                </ul>
                <p>
                    9.5. Não serão de responsabilidade do Ticket Digital, dentre outras hipóteses estabelecidas ao longo destes Termos:
                </p>
                <ul>

                    <li>(a) quaisquer danos incorridos pelos Usuários que tenham sido causados por vírus e/ou malwares em decorrência de acesso, utilização ou navegação da Plataforma Ticket Digital por qualquer meio de acesso ou causados como consequência da transferência de dados, arquivos, imagens, textos ou áudio contidos na Plataforma Ticket Digital;</li>

                    <li>(b) danos de qualquer espécie resultantes de atos ilegais praticados por terceiros por meio da Plataforma Ticket Digital;</li>

                    <li>(c) qualquer decisão de Transação efetuada pelos Usuários a partir de informações, anúncios ou outros materiais veiculados na Plataforma Ticket Digital;</li>

                    <li>(d) quaisquer falhas, atrasos ou interrupções na Plataforma Ticket Digital resultantes de qualquer falha dos sistemas utilizados por terceiros ou falhas técnicas de qualquer tipo, incluindo, falhas no acesso ou na navegação do site decorrentes de falhas na Internet em geral, quedas de energia, mau funcionamento eletrônico e/ou físico de qualquer rede, interrupções ou suspensões de conexão e falhas de software e/ou hardware do Usuário;</li>

                    <li>(e) paralisações programadas para manutenção, atualização e ajustes de configuração das aplicações;</li>

                    <li>(f) caso fortuito ou eventos de força maior, nos termos da lei;</li>

                    <li>(g) falhas, atrasos ou interrupções como resultado de restrições eventualmente impostas por autoridades governamentais, ou que sejam resultantes de qualquer uso indevido da Plataforma Ticket Digital pelo Usuário.</li>
                </ul>
                <h2><strong>10. DISPOSIÇÕES GERAIS</strong></h2>


                <p>
                    10.1. Modificações. Este Termo de Uso rege a relação entre o Ticket Digital e você. O Ticket Digital poderá modificar este Termo de Uso e demais políticas aplicáveis sempre que for necessário refletir alterações da lei ou mudanças em suas ferramentas. Você deverá consultar regularmente o Termo de Uso e demais políticas aplicáveis. A plataforma poderá postar avisos informando a existência de modificações neste Termo de Uso nesta página. Havendo alterações das utilidades, ferramentas e de novas funcionalidades, tais alterações entrarão em vigor imediatamente, sendo responsabilidade do usuário a verificação das condições aplicáveis no momento da utilização da plataforma. Se você não concordar com os termos alterados, você deverá descontinuar o uso da plataforma.
                </p>
                <p>
                    10.2. Direito de exclusão, solicitação de documentos, e cancelamento de campanhas. O Ticket Digital se reserva o direito de recusar ou retirar o acesso à plataforma, inabilitar o cadastro, ou cancelar campanhas, sem necessidade de aviso prévio, daqueles usuários que descumpram este Termo de Uso ou àqueles que o Ticket Digital, por liberalidade própria, resolver recusar ou retirar da plataforma. O Ticket Digital poderá ainda, a seu critério, solicitar documentos e informações complementares quando entender necessário para manutenção da conta de um usuário ou da campanha de arrecadação.
                </p>
                <p>
                    10.3. Duração e Término. A disponibilização das ferramentas e funcionalidades do Ticket Digital na plataforma tem duração indefinida, ressalvadas as disposições em contrário relativas a funcionalidades específicas. Sem prejuízo das disposições anteriores, o Ticket Digital se reserva o direito de decidir sobre o encerramento, suspensão ou interrupção das funcionalidades oferecidas, podendo fazê-lo, unilateralmente e a qualquer momento, sem a obrigatoriedade de prévio aviso aos usuários, salvo se houver contraprestação financeira com relação à funcionalidade alterada/cancelada. Nesta hipótese, o Ticket Digital comunicará os usuários através do endereço eletrônico cadastrado, com a antecedência mínima de 5 (cinco) dias sobre a descontinuidade da ferramenta, de modo a garantir que os usuários estejam cientes do encerramento, suspensão ou interrupção a ser efetuada.
                </p>
                <p>
                    10.4. Estes Termos serão regidos e interpretados exclusivamente segundo as leis do Brasil.
                </p>
                <p>
                    10.5. O Ticket Digital compromete-se a, sempre que possível, tentar solucionar amigavelmente eventuais disputas que surgirem junto ao Usuário. Quando tal solução amigável não for bem-sucedida, o foro eleito para a solução da disputa será o da Comarca de São João Batista, Estado de Santa Catarina, com renúncia de todos os outros, por mais privilegiados que sejam.
                </p>
            </Card>
            <SpaceBox space={80} />
        </FragmentView>
    )
}
