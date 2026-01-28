/* ========================================
   CRYPTO AGGREGATOR CHATBOT
   Assistente inteligente com arvore de decisao
   ======================================== */

(function() {
    'use strict';

    // ==========================================
    // CONFIGURACOES
    // ==========================================
    const CONFIG = {
        botName: 'Crypto Aggregator - Suporte',
        dailyMessageLimit: 25,
        typingDelay: 800,
        messageDelay: 400
    };

    // ==========================================
    // BASE DE DADOS DOS PARCEIROS
    // ==========================================
    const PLATFORMS = {
        // DESTAQUE - Sempre prioridade
        featured: {
            neobankless: {
                name: 'Neobankless',
                category: 'Banco Digital',
                description: 'Banco digital com integracao total de servicos cripto. O melhor dos dois mundos!',
                link: 'https://neobankless.com/MQM',
                logo: 'https://logo.clearbit.com/neobankless.com',
                badge: 'PARCEIRO OFICIAL',
                practicality: 95,
                forBeginners: true,
                forAdvanced: true
            }
        },

        // P2P
        p2p: {
            camilap2p: {
                name: 'Camila P2P',
                category: 'P2P',
                description: 'Especialista brasileira com +40 mil negociacoes. Atendimento humanizado!',
                link: 'https://camilap2p.com.br',
                logo: 'https://www.google.com/s2/favicons?domain=camilap2p.com&sz=128',
                practicality: 92,
                forBeginners: true,
                forAdvanced: true
            },
            pagcrypto: {
                name: 'PagCrypto',
                category: 'P2P',
                description: 'Plataforma P2P brasileira com foco em seguranca e facilidade.',
                link: 'https://pagcrypto.finance',
                logo: 'https://logo.clearbit.com/pagcrypto.finance',
                practicality: 88,
                forBeginners: true,
                forAdvanced: true
            },
            comprecripto: {
                name: 'Compre Cripto',
                category: 'P2P',
                description: 'Compra rapida de cripto com PIX. Simples e direto!',
                link: 'https://app.comprecripto.io/register/mqm',
                logo: 'https://logo.clearbit.com/comprecripto.io',
                practicality: 90,
                forBeginners: true,
                forAdvanced: false
            },
            p2pme: {
                name: 'P2P.me',
                category: 'P2P',
                description: 'P2P descentralizado com escrow on-chain. Mais seguranca!',
                link: 'https://br.p2p.me/recommend?address=0xa4884FEA51387224e6039b6903EeeFE24Fab7251&nonce=559537&signature=0x9561591564c21ffb8be3a4d7a8ecf0d1d45cbae59469cb24359cbc70ffa4cde86aa2cb0151e158667a4622af32aba022d5d22427a2b250d8810a334e8a5714401b',
                logo: 'https://logo.clearbit.com/p2p.me',
                practicality: 85,
                forBeginners: false,
                forAdvanced: true
            }
        },

        // EXCHANGES
        exchanges: {
            binance: {
                name: 'Binance',
                category: 'Exchange',
                description: 'Maior exchange do mundo! +500 criptos e taxas baixissimas.',
                link: 'https://www.binance.com/activity/referral-entry/CPA?ref=CPA_0001DCF8M6',
                logo: 'https://logo.clearbit.com/binance.com',
                practicality: 95,
                forBeginners: true,
                forAdvanced: true
            },
            bybit: {
                name: 'Bybit',
                category: 'Exchange',
                description: 'Top para trading de derivativos. Interface profissional!',
                link: 'https://www.bybit.com/invite?ref=YNAGP8',
                logo: 'https://www.google.com/s2/favicons?domain=bybit.com&sz=128',
                practicality: 88,
                forBeginners: false,
                forAdvanced: true
            },
            kraken: {
                name: 'Kraken',
                category: 'Exchange',
                description: 'Uma das mais antigas e confiaveis. Seguranca top!',
                link: 'https://invite.kraken.com/JDNW/de6w7cmj',
                logo: 'https://logo.clearbit.com/kraken.com',
                practicality: 85,
                forBeginners: true,
                forAdvanced: true
            },
            mexc: {
                name: 'MEXC',
                category: 'Exchange',
                description: 'Vasta selecao de altcoins. Perfeita pra quem quer variedade!',
                link: 'https://promote.mexc.com/a/Q26ooE1o',
                logo: 'https://logo.clearbit.com/mexc.com',
                practicality: 82,
                forBeginners: false,
                forAdvanced: true
            },
            coinbase: {
                name: 'Coinbase',
                category: 'Exchange',
                description: 'Mais amigavel para iniciantes. Interface simples e intuitiva!',
                link: 'https://www.coinbase.com/join/COINBASE2024',
                logo: 'https://logo.clearbit.com/coinbase.com',
                practicality: 90,
                forBeginners: true,
                forAdvanced: false
            }
        },

        // BANCOS DIGITAIS
        banks: {
            revolut: {
                name: 'Revolut',
                category: 'Banco Digital',
                description: 'Banco digital global com compra de crypto integrada.',
                link: 'https://revolut.com/referral/?referral-code=waldir3l75!SEP1-25-AR-MDL-ROI&geo-redirect',
                logo: 'https://logo.clearbit.com/revolut.com',
                practicality: 88,
                forBeginners: true,
                forAdvanced: false
            },
            bitybank: {
                name: 'Bitybank',
                category: 'Banco Digital',
                description: 'Banco digital brasileiro focado em cripto. 100% nacional!',
                link: 'https://bity.com.br/mgm/180879',
                logo: 'https://logo.clearbit.com/bity.com.br',
                practicality: 85,
                forBeginners: true,
                forAdvanced: false
            },
            nexo: {
                name: 'Nexo',
                category: 'Banco Digital',
                description: 'Rendimentos em cripto e emprestimos garantidos por cripto.',
                link: 'https://nexo.com',
                logo: 'https://logo.clearbit.com/nexo.com',
                practicality: 80,
                forBeginners: false,
                forAdvanced: true
            }
        },

        // CARTEIRAS HOT
        hotWallets: {
            phantom: {
                name: 'Phantom',
                category: 'Hot Wallet',
                description: 'Melhor carteira para Solana. Lindissima e super facil!',
                link: 'https://phantom.app/download',
                logo: 'https://logo.clearbit.com/phantom.app',
                practicality: 95,
                forBeginners: true,
                forAdvanced: true
            },
            rabby: {
                name: 'Rabby',
                category: 'Hot Wallet',
                description: 'Carteira multi-chain com simulacao de transacoes. Seguranca extra!',
                link: 'https://rabby.io/download',
                logo: 'https://logo.clearbit.com/rabby.io',
                practicality: 90,
                forBeginners: false,
                forAdvanced: true
            },
            metamask: {
                name: 'MetaMask',
                category: 'Hot Wallet',
                description: 'A mais popular do mundo! Compativel com tudo.',
                link: 'https://metamask.io/download/',
                logo: 'https://logo.clearbit.com/metamask.io',
                practicality: 92,
                forBeginners: true,
                forAdvanced: true
            },
            xverse: {
                name: 'Xverse',
                category: 'Hot Wallet',
                description: 'Carteira focada em Bitcoin e Ordinals. Para os BTC maxis!',
                link: 'https://www.xverse.app/download',
                logo: 'https://logo.clearbit.com/xverse.app',
                practicality: 85,
                forBeginners: false,
                forAdvanced: true
            }
        },

        // CARTEIRAS COLD
        coldWallets: {
            ledger: {
                name: 'Ledger',
                category: 'Cold Wallet',
                description: 'Padrao ouro em seguranca! Hardware wallet mais vendida do mundo.',
                link: 'https://shop.ledger.com/?r=9414e4bea285&tracker=MY_TRACKER',
                logo: 'https://logo.clearbit.com/ledger.com',
                practicality: 95,
                forBeginners: true,
                forAdvanced: true
            },
            trezor: {
                name: 'Trezor',
                category: 'Cold Wallet',
                description: 'Pioneira em hardware wallets. Open-source e super segura!',
                link: 'https://trezor.io',
                logo: 'https://logo.clearbit.com/trezor.io',
                practicality: 90,
                forBeginners: true,
                forAdvanced: true
            },
            onekey: {
                name: 'OneKey',
                category: 'Cold Wallet',
                description: 'Hardware wallet moderna com touchscreen. Custo-beneficio top!',
                link: 'https://onekey.so/',
                logo: 'https://logo.clearbit.com/onekey.so',
                practicality: 85,
                forBeginners: true,
                forAdvanced: true
            }
        },

        // CARTOES CRIPTO
        cryptoCards: {
            kast: {
                name: 'Kast Finance',
                category: 'Cartao Cripto',
                description: 'Cartao cripto com cashback em BTC. Gaste cripto no dia a dia!',
                link: 'https://kastfinance.app.link/CLE47K9D',
                logo: 'https://logo.clearbit.com/kast.com',
                practicality: 88,
                forBeginners: true,
                forAdvanced: true
            },
            offramp: {
                name: 'Offramp',
                category: 'Cartao Cripto',
                description: 'Converta cripto para fiat e gaste em qualquer lugar!',
                link: 'https://app.offramp.xyz/login?referralCode=iokost',
                logo: 'https://logo.clearbit.com/offramp.xyz',
                practicality: 85,
                forBeginners: true,
                forAdvanced: true
            },
            etherfi: {
                name: 'Ether.fi',
                category: 'Cartao Cripto',
                description: 'Cartao com staking integrado. Seu ETH rende enquanto voce gasta!',
                link: 'https://www.ether.fi/refer/6ad38ada',
                logo: 'https://logo.clearbit.com/ether.fi',
                practicality: 80,
                forBeginners: false,
                forAdvanced: true
            }
        },

        // DEXs
        dexs: {
            uniswap: {
                name: 'Uniswap',
                category: 'DEX',
                description: 'A DEX mais famosa! Troque tokens direto da sua carteira.',
                link: 'https://app.uniswap.org',
                logo: 'https://logo.clearbit.com/uniswap.org',
                practicality: 90,
                forBeginners: false,
                forAdvanced: true
            },
            jupiter: {
                name: 'Jupiter',
                category: 'DEX',
                description: 'Melhor agregador de DEX na Solana. Melhores precos garantidos!',
                link: 'https://jup.ag/swap',
                logo: 'https://logo.clearbit.com/jup.ag',
                practicality: 92,
                forBeginners: false,
                forAdvanced: true
            },
            pancakeswap: {
                name: 'PancakeSwap',
                category: 'DEX',
                description: 'Principal DEX da BNB Chain. Taxas baixinhas!',
                link: 'https://pancakeswap.finance/swap',
                logo: 'https://logo.clearbit.com/pancakeswap.finance',
                practicality: 88,
                forBeginners: false,
                forAdvanced: true
            },
            meteora: {
                name: 'Meteora',
                category: 'DEX',
                description: 'DEX avancada na Solana com pools de liquidez otimizadas.',
                link: 'https://app.meteora.ag',
                logo: 'https://logo.clearbit.com/meteora.ag',
                practicality: 80,
                forBeginners: false,
                forAdvanced: true
            }
        },

        // BRIDGES
        bridges: {
            sideshift: {
                name: 'SideShift.ai',
                category: 'Bridge',
                description: 'Troque cripto entre blockchains sem cadastro. Anonimo!',
                link: 'https://sideshift.ai',
                logo: 'https://logo.clearbit.com/sideshift.ai',
                practicality: 88,
                forBeginners: false,
                forAdvanced: true
            },
            jumper: {
                name: 'Jumper',
                category: 'Bridge',
                description: 'Agregador de bridges. Encontra a melhor rota automaticamente!',
                link: 'https://jumper.exchange',
                logo: 'https://jumper.exchange/jumper-learn.png',
                practicality: 90,
                forBeginners: false,
                forAdvanced: true
            },
            fixedfloat: {
                name: 'FixedFloat',
                category: 'Bridge',
                description: 'Exchange instantanea entre criptos. Rapido e sem complicacao!',
                link: 'https://ff.io',
                logo: 'https://logo.clearbit.com/ff.io',
                practicality: 85,
                forBeginners: true,
                forAdvanced: true
            },
            layerswap: {
                name: 'Layerswap',
                category: 'Bridge',
                description: 'Transferencias rapidas entre exchanges e L2s. Economiza muito em taxas!',
                link: 'https://layerswap.io',
                logo: 'https://logo.clearbit.com/layerswap.io',
                practicality: 82,
                forBeginners: false,
                forAdvanced: true
            }
        }
    };

    // ==========================================
    // RESPOSTAS E FLUXOS
    // ==========================================
    const RESPONSES = {
        // Saudacao inicial - so pergunta o nivel, nada mais
        greeting: "Opa! Tudo bem? Eu sou o suporte do Crypto Aggregator! To aqui pra te ajudar a entender tudo sobre cripto de um jeito simples e descomplicado. Pode contar comigo!\n\nPrimeiro, me conta: qual seu nivel de conhecimento com criptomoedas?",

        // Respostas por nivel - depois de responder, pergunta o que precisa
        levels: {
            beginner: {
                response: "Massa! Iniciante, ne? Fica tranquilo que eu vou te explicar tudinho de um jeito bem facil, como se a gente tivesse batendo um papo. Sem termos complicados, prometo!\n\nEntao me conta, o que voce quer aprender ou fazer hoje?",
                focus: ['exchanges', 'p2p', 'banks', 'hotWallets']
            },
            intermediate: {
                response: "Legal! Voce ja tem uma base entao. Vou te mostrar opcoes um pouco mais completas pra voce dar o proximo passo!\n\nO que voce precisa hoje?",
                focus: ['exchanges', 'p2p', 'dexs', 'hotWallets', 'coldWallets']
            },
            advanced: {
                response: "Opa, um veterano! Ai sim! Vou direto ao ponto entao.\n\nO que voce ta procurando?",
                focus: ['dexs', 'bridges', 'coldWallets', 'exchanges']
            }
        },

        // Explicacoes completas e amigaveis para cada funcao
        explanations: {
            p2p: {
                title: "🏪 O que e P2P?",
                full: "P2P significa 'pessoa pra pessoa'. Funciona assim:\n\nImagina um Mercado Livre, so que de cripto! Voce encontra alguem que quer vender Bitcoin, combina o preco, faz um PIX pra pessoa, e ela te manda as moedas. Simples assim!\n\n✅ Vantagens:\n- Super rapido (as vezes menos de 5 minutos)\n- Paga via PIX, facil demais\n- Nao precisa de cadastro complicado\n- Geralmente tem atendimento humano\n\n⚠️ Importante: Sempre use plataformas confiaveis que a gente recomenda aqui, pra garantir que a transacao seja segura!",
                tip: "Dica de amigo: P2P e perfeito pra quem quer comprar rapido sem burocracia. E tipo pedir um delivery de cripto!"
            },
            exchange: {
                title: "🏦 O que e Exchange?",
                full: "Exchange e tipo uma corretora de acoes, so que pra cripto!\n\nFunciona assim: voce cria uma conta (tipo abrir conta no banco), deposita reais via PIX ou TED, e ai pode comprar varias criptomoedas la dentro. Da pra ver graficos, precos ao vivo, e ate fazer trade se quiser.\n\n✅ Vantagens:\n- Varias moedas disponiveis (Bitcoin, Ethereum, etc)\n- Graficos e ferramentas pra acompanhar\n- Bom pra quem quer comprar e segurar\n- Taxas geralmente baixas\n\n⚠️ Importante: Depois de comprar, e bom transferir pra sua propria carteira. Deixar na exchange e tipo deixar dinheiro na corretora - funciona, mas nao e seu 100%.",
                tip: "Dica de amigo: Exchange e otima pra comecar e ver como funciona o mercado. A Binance e a maior do mundo!"
            },
            wallet: {
                title: "👛 O que e Carteira (Wallet)?",
                full: "Carteira e onde voce GUARDA suas criptos. E tipo o app do banco no seu celular, so que pra moedas digitais!\n\nExistem dois tipos principais:\n\n📱 HOT WALLET (Carteira Quente)\n- E um app no celular ou extensao no navegador\n- Pratica e sempre com voce\n- Otima pro dia a dia e valores menores\n- Exemplos: MetaMask, Phantom\n\n🔐 COLD WALLET (Carteira Fria)\n- E um dispositivo fisico, tipo um pendrive especial\n- Fica offline, super segura\n- Ideal pra guardar valores maiores\n- Exemplos: Ledger, Trezor\n\n⚠️ Importante: Sua carteira tem uma 'frase secreta' (seed phrase) de 12 ou 24 palavras. NUNCA compartilhe isso com ninguem! E tipo a senha do cofre.",
                tip: "Dica de amigo: Comeca com uma Hot Wallet no celular. Quando tiver mais grana em cripto, ai pensa numa Cold Wallet pra mais seguranca!"
            },
            hotWallet: {
                title: "📱 O que e Hot Wallet?",
                full: "Hot Wallet e uma carteira digital que fica no seu celular ou computador. Chamam de 'quente' porque ta sempre conectada na internet!\n\nPensa assim: e tipo o app do seu banco. Voce abre, ve seu saldo, e pode enviar ou receber cripto rapidinho.\n\n✅ Vantagens:\n- Gratis pra baixar e usar\n- Super pratica pro dia a dia\n- Facil de configurar (menos de 5 minutos)\n- Funciona em qualquer lugar\n\n📱 As mais usadas:\n- Phantom (otima pra Solana)\n- MetaMask (a mais famosa, funciona com Ethereum)\n- Rabby (mostra simulacao antes de assinar)\n\n⚠️ Importante: Anota a frase secreta num papel e guarda em lugar seguro. Se perder o celular e nao tiver isso, perde tudo!",
                tip: "Dica de amigo: Baixa a Phantom ou MetaMask, leva 5 minutos. E de graca!"
            },
            coldWallet: {
                title: "🔐 O que e Cold Wallet?",
                full: "Cold Wallet e tipo um cofre fisico pras suas criptos! E um dispositivo (parece um pendrive bonito) que guarda suas moedas OFFLINE.\n\nPor que 'fria'? Porque nao ta conectada na internet. Isso significa que hackers nao conseguem acessar de jeito nenhum!\n\n✅ Vantagens:\n- Seguranca maxima (padrao ouro)\n- Seus cripto ficam 100% offline\n- Protege contra hackers e virus\n- Dura anos e anos\n\n🔐 As melhores:\n- Ledger (a mais vendida do mundo)\n- Trezor (pioneira, muito segura)\n- OneKey (boa e mais barata)\n\n💰 Custa entre R$300-800, mas vale cada centavo se voce tem valores maiores em cripto.",
                tip: "Dica de amigo: Se voce tem mais de R$5.000 em cripto, vale muito investir numa Ledger. E o seguro das suas moedas!"
            },
            bank: {
                title: "🏦 O que e Banco Cripto?",
                full: "Banco cripto e o melhor dos dois mundos! E um banco digital normal (tipo Nubank), mas que ja vem com cripto integrado.\n\nVoce pode:\n- Ter conta em reais normal\n- Comprar cripto direto no app\n- Pagar boletos e fazer PIX\n- Receber seu salario\n- Ter cartao de debito/credito\n- Investir em cripto\n\nTudo no mesmo lugar! Nao precisa ficar transferindo entre banco e exchange.\n\n⭐ Destaque: Neobankless\nE nosso parceiro oficial! Une banco tradicional + cripto de forma perfeita. Super recomendado pra quem quer praticidade!",
                tip: "Dica de amigo: Se voce quer simplicidade maxima, banco cripto e a melhor pedida. Faz tudo num app so!"
            },
            card: {
                title: "💳 O que e Cartao Cripto?",
                full: "Cartao cripto e MUITO legal! E um cartao de debito/credito que voce carrega com suas criptomoedas.\n\nFunciona assim: voce tem Bitcoin na conta, vai no mercado, passa o cartao, e a maquininha recebe em reais! A conversao e automatica.\n\n✅ Vantagens:\n- Gasta cripto em qualquer lugar\n- Funciona em maquininhas normais\n- Alguns dao cashback em Bitcoin!\n- Pratico demais\n\n💳 Opcoes tops:\n- Kast Finance (cashback em BTC)\n- Offramp (converte cripto facil)\n- Bitybank (brasileiro)\n\nImagina: voce comprou Bitcoin ha 2 anos, valorizou, e agora usa pra pagar o almoco. Isso e liberdade financeira!",
                tip: "Dica de amigo: Cartao com cashback em Bitcoin e genial. Voce gasta e ainda acumula mais cripto!"
            },
            dex: {
                title: "🔄 O que e DEX?",
                full: "DEX significa 'Exchange Descentralizada'. E uma exchange sem dono, sem empresa por tras!\n\nFunciona assim: voce conecta sua carteira (tipo MetaMask) e troca moedas direto, sem intermediario. Ninguem controla, e tudo automatico por 'contratos inteligentes'.\n\n✅ Vantagens:\n- Sem cadastro ou KYC\n- Voce controla seu dinheiro 100%\n- Mais privacidade\n- Tokens que nao tem em exchange normal\n\n⚠️ Mas atenção:\n- Precisa ja ter cripto na carteira\n- Um pouco mais complexo\n- Taxas de rede (gas) podem ser altas\n\n🔄 Principais:\n- Uniswap (Ethereum)\n- Jupiter (Solana - taxas baixas)\n- PancakeSwap (BNB Chain)",
                tip: "Dica de amigo: DEX e mais pra quem ja tem experiencia. Comeca com exchange normal primeiro!"
            },
            bridge: {
                title: "🌉 O que e Bridge?",
                full: "Bridge e uma 'ponte' entre blockchains diferentes!\n\nDeixa eu explicar: existem varias redes de cripto (Ethereum, Solana, BNB Chain...). Cada uma e tipo um 'pais' diferente. Suas moedas ficam numa rede especifica.\n\nE se voce tem ETH na Ethereum mas quer usar na Solana? A bridge faz essa transferencia!\n\n✅ Pra que serve:\n- Mover cripto entre redes\n- Aproveitar taxas mais baixas\n- Usar apps de outras redes\n\n⚠️ Importante:\n- E um conceito mais avancado\n- Tem taxas de transferencia\n- Precisa entender qual rede e qual\n\n🌉 Bridges confiaveis:\n- Jumper (encontra melhor rota)\n- LayerSwap (rapido)\n- SideShift (sem cadastro)",
                tip: "Dica de amigo: Se voce ta comecando, nao precisa se preocupar com bridge agora. Isso e mais pra frente!"
            },
            site: {
                title: "🌐 O que e o Crypto Aggregator?",
                full: "O Crypto Aggregator e tipo um shopping de cripto! A gente reuniu todas as melhores plataformas num lugar so.\n\nSabe quando voce quer comprar cripto e nao sabe por onde comecar? Ou fica perdido com tanta opcao? A gente resolve isso!\n\n✅ O que voce encontra aqui:\n- P2P pra comprar cripto rapido\n- Exchanges pra trading\n- Carteiras pra guardar seguro\n- Bancos digitais com cripto\n- Cartoes pra gastar no dia a dia\n- E muito mais!\n\nTodas as plataformas sao verificadas e confiaveis. A gente ja fez a pesquisa pra voce, e so escolher e usar!\n\n⭐ Nosso destaque: Neobankless - parceiro oficial que une banco + cripto!"
            }
        },

        // Respostas por categoria com explicacao primeiro
        categories: {
            buy: {
                keywords: ['comprar', 'compra', 'buy', 'adquirir', 'pix', 'reais'],
                needsExplanation: true,
                question: "Boa! Voce quer comprar cripto. Antes de te mostrar onde, deixa eu te explicar as opcoes:\n\nExistem duas formas principais:\n\n🏪 P2P - Compra direto de outra pessoa\n🏦 Exchange - Compra numa corretora\n\nQuer que eu explique melhor cada uma? Ou ja sabe qual prefere?",
                platforms: ['p2p', 'exchanges']
            },
            trade: {
                keywords: ['trade', 'trading', 'trocar', 'converter', 'swap'],
                needsExplanation: true,
                question: "Quer fazer trade! Isso e comprar e vender cripto pra lucrar com a variacao de preco.\n\n📈 Tipo: compra Bitcoin a R$200.000, vende quando chegar a R$250.000.\n\nPra isso voce precisa de uma Exchange ou DEX. Quer que eu explique a diferenca?",
                platforms: ['exchanges', 'dexs']
            },
            store: {
                keywords: ['guardar', 'armazenar', 'carteira', 'wallet', 'seguro', 'seguranca'],
                needsExplanation: true,
                question: "Guardar cripto com seguranca! Isso e super importante.\n\nExistem dois tipos de carteira:\n\n📱 Hot Wallet - App no celular\n🔐 Cold Wallet - Dispositivo fisico\n\nQuer que eu explique a diferenca? Ou ja sabe qual precisa?",
                platforms: ['coldWallets', 'hotWallets']
            },
            bank: {
                keywords: ['banco', 'bank', 'conta', 'digital', 'fiat'],
                needsExplanation: true,
                question: "Banco com cripto! Isso e muito pratico.\n\nSao bancos digitais que ja vem com cripto integrado. Voce tem conta normal + pode investir em cripto no mesmo app!\n\nQuer que eu explique melhor como funciona?",
                platforms: ['banks']
            },
            card: {
                keywords: ['cartao', 'card', 'gastar', 'pagar', 'cashback'],
                needsExplanation: true,
                question: "Cartao cripto! Da pra gastar suas moedas no dia a dia.\n\nVoce carrega o cartao com Bitcoin ou outra cripto, e gasta em qualquer lugar! A maquininha recebe em reais.\n\nQuer saber mais como funciona?",
                platforms: ['cryptoCards']
            },
            dex: {
                keywords: ['dex', 'descentralizada', 'defi', 'liquidity', 'pool'],
                needsExplanation: true,
                question: "DEX - Exchange Descentralizada!\n\n⚠️ Isso e um pouco mais avancado. E uma exchange sem intermediario, voce troca moedas direto da sua carteira.\n\nQuer que eu explique direito como funciona?",
                platforms: ['dexs']
            },
            bridge: {
                keywords: ['bridge', 'transferir', 'rede', 'chain', 'layer'],
                needsExplanation: true,
                question: "Bridge - Ponte entre blockchains!\n\n⚠️ Isso e bem avancado. Serve pra mover cripto entre redes diferentes.\n\nSe voce ta comecando, provavelmente nao precisa disso agora. Quer que eu explique mesmo assim?",
                platforms: ['bridges']
            },
            start: {
                keywords: ['comecar', 'inicio', 'primeiro', 'iniciante', 'aprender'],
                needsExplanation: true,
                question: "Quer comecar no mundo cripto! Vou te dar o caminho das pedras.\n\nBasicamente voce precisa de 2 coisas:\n\n1️⃣ Um lugar pra COMPRAR cripto\n2️⃣ Um lugar pra GUARDAR cripto\n\nPor qual voce quer comecar?",
                platforms: []
            }
        },

        fallback: [
            "Hmm, nao entendi muito bem. Pode falar de outro jeito? Ou usa os botoes ai embaixo que fica mais facil!",
            "Essa eu nao peguei, desculpa! Tenta usar os botoes ou me pergunta de outra forma.",
            "Nao captei, mas relaxa! Me conta com outras palavras ou escolhe uma opcao ai."
        ],

        limitReached: "Eita! A gente ja conversou bastante hoje (25 mensagens). Volta amanha que continuo te ajudando com o maior prazer!",

        platformIntro: "Essa plataforma e muito boa! Deixa eu te contar sobre ela:",

        siteInfo: {
            about: "O Crypto Aggregator e tipo um shopping de cripto! A gente reuniu as melhores plataformas - exchanges, carteiras, bancos, tudo! - num lugar so pra facilitar sua vida.",
            mission: "A ideia e simples: voce nao precisa ficar pesquisando em mil lugares. A gente ja fez isso e trouxe so o que presta!",
            partner: "Nossas plataformas sao verificadas e confiaveis. Destaque pro Neobankless, nosso parceiro oficial - um banco que junta tradicional + cripto!"
        }
    };

    // ==========================================
    // ESTADO DO CHATBOT
    // ==========================================
    let state = {
        isOpen: false,
        userLevel: null,
        messageCount: 0,
        conversationContext: null
    };

    // ==========================================
    // FUNCOES AUXILIARES
    // ==========================================

    function getRandomItem(array) {
        return array[Math.floor(Math.random() * array.length)];
    }

    function checkDailyLimit() {
        const today = new Date().toDateString();
        const stored = localStorage.getItem('chatbot_limit');

        if (stored) {
            const data = JSON.parse(stored);
            if (data.date === today) {
                state.messageCount = data.count;
                return data.count < CONFIG.dailyMessageLimit;
            }
        }

        // Novo dia, reseta contador
        state.messageCount = 0;
        localStorage.setItem('chatbot_limit', JSON.stringify({ date: today, count: 0 }));
        return true;
    }

    function incrementMessageCount() {
        state.messageCount++;
        const today = new Date().toDateString();
        localStorage.setItem('chatbot_limit', JSON.stringify({ date: today, count: state.messageCount }));
    }

    function getRemainingMessages() {
        return CONFIG.dailyMessageLimit - state.messageCount;
    }

    function detectIntent(message) {
        const lowerMsg = message.toLowerCase();

        // Verifica saudacoes
        if (/^(oi|ola|hey|hi|hello|eai|e ai|fala|salve|bom dia|boa tarde|boa noite)/.test(lowerMsg)) {
            return { type: 'greeting' };
        }

        // Verifica perguntas sobre o site
        if (/(sobre o site|o que e isso|como funciona o site|missao|objetivo)/.test(lowerMsg)) {
            return { type: 'siteInfo', subtype: 'about' };
        }

        if (/(parceiro|destaque|recomendado|melhor opcao)/.test(lowerMsg)) {
            return { type: 'featured' };
        }

        // Verifica escolhas especificas de subcategorias (para iniciantes)
        if (/(usar p2p|quero p2p|p2p pra mim)/.test(lowerMsg)) {
            return { type: 'showSubcategory', subcategory: 'p2p' };
        }
        if (/(usar exchange|quero exchange|exchange pra mim)/.test(lowerMsg)) {
            return { type: 'showSubcategory', subcategory: 'exchange' };
        }
        if (/(hot wallet|carteira no celular|carteira digital)/.test(lowerMsg)) {
            return { type: 'showSubcategory', subcategory: 'hotWallet' };
        }
        if (/(cold wallet|carteira fisica|ledger|trezor|cofre)/.test(lowerMsg)) {
            return { type: 'showSubcategory', subcategory: 'coldWallet' };
        }

        // Verifica pedidos de explicacao (o que e X?)
        if (/(o que e p2p|oque e p2p|explica p2p|explica o p2p)/.test(lowerMsg)) {
            return { type: 'explain', topic: 'p2p' };
        }
        if (/(o que e exchange|oque e exchange|explica exchange)/.test(lowerMsg)) {
            return { type: 'explain', topic: 'exchange' };
        }
        if (/(o que e hot wallet|oque e hot|explica hot wallet|carteira quente)/.test(lowerMsg)) {
            return { type: 'explain', topic: 'hotWallet' };
        }
        if (/(o que e cold wallet|oque e cold|explica cold wallet|carteira fria)/.test(lowerMsg)) {
            return { type: 'explain', topic: 'coldWallet' };
        }
        if (/(o que e carteira|oque e carteira|o que e wallet|explica carteira)/.test(lowerMsg)) {
            return { type: 'explain', topic: 'wallet' };
        }
        if (/(o que e banco|oque e banco|explica banco|banco cripto)/.test(lowerMsg)) {
            return { type: 'explain', topic: 'bank' };
        }
        if (/(o que e cartao|oque e cartao|explica cartao|cartao cripto)/.test(lowerMsg)) {
            return { type: 'explain', topic: 'card' };
        }
        if (/(o que e dex|oque e dex|explica dex|dex completo)/.test(lowerMsg)) {
            return { type: 'explain', topic: 'dex' };
        }
        if (/(o que e bridge|oque e bridge|explica bridge|bridge completo)/.test(lowerMsg)) {
            return { type: 'explain', topic: 'bridge' };
        }
        if (/(o que e o crypto|o que e o site|crypto aggregator)/.test(lowerMsg)) {
            return { type: 'explain', topic: 'site' };
        }

        // Verifica pedidos para MOSTRAR plataformas
        if (/(mostra p2p|ver p2p|opcoes de p2p|plataformas p2p)/.test(lowerMsg)) {
            return { type: 'showPlatforms', showCategory: 'p2p' };
        }
        if (/(mostra exchange|ver exchange|opcoes de exchange|mostra exchanges)/.test(lowerMsg)) {
            return { type: 'showPlatforms', showCategory: 'exchanges' };
        }
        if (/(mostra hot wallet|ver hot wallet|mostra hot wallets)/.test(lowerMsg)) {
            return { type: 'showPlatforms', showCategory: 'hotWallets' };
        }
        if (/(mostra cold wallet|ver cold wallet|mostra cold wallets)/.test(lowerMsg)) {
            return { type: 'showPlatforms', showCategory: 'coldWallets' };
        }
        if (/(mostra carteira|ver carteira|mostra carteiras|mostra wallets)/.test(lowerMsg)) {
            return { type: 'showPlatforms', showCategory: 'wallets' };
        }
        if (/(mostra banco|ver banco|mostra bancos)/.test(lowerMsg)) {
            return { type: 'showPlatforms', showCategory: 'banks' };
        }
        if (/(mostra cartao|ver cartao|mostra cartoes)/.test(lowerMsg)) {
            return { type: 'showPlatforms', showCategory: 'cards' };
        }
        if (/(mostra dex|ver dex|mostra dexs)/.test(lowerMsg)) {
            return { type: 'showPlatforms', showCategory: 'dexs' };
        }
        if (/(mostra bridge|ver bridge|mostra bridges)/.test(lowerMsg)) {
            return { type: 'showPlatforms', showCategory: 'bridges' };
        }
        if (/(mostra onde comprar|onde comprar)/.test(lowerMsg)) {
            return { type: 'showPlatforms', showCategory: 'buy' };
        }
        if (/(mostra onde fazer trade|onde fazer trade)/.test(lowerMsg)) {
            return { type: 'showPlatforms', showCategory: 'trade' };
        }

        // Verifica categorias
        for (const [catKey, catData] of Object.entries(RESPONSES.categories)) {
            for (const keyword of catData.keywords) {
                if (lowerMsg.includes(keyword)) {
                    return { type: 'category', category: catKey };
                }
            }
        }

        // Verifica nivel
        if (/(iniciante|comecando|novo|nunca|primeiro)/.test(lowerMsg)) {
            return { type: 'setLevel', level: 'beginner' };
        }
        if (/(intermediario|medio|ja sei|alguma experiencia)/.test(lowerMsg)) {
            return { type: 'setLevel', level: 'intermediate' };
        }
        if (/(avancado|experiente|profissional|veterano|muito tempo)/.test(lowerMsg)) {
            return { type: 'setLevel', level: 'advanced' };
        }

        // Verifica plataformas especificas
        for (const category of Object.values(PLATFORMS)) {
            for (const [key, platform] of Object.entries(category)) {
                if (lowerMsg.includes(platform.name.toLowerCase())) {
                    return { type: 'platform', platform: platform };
                }
            }
        }

        return { type: 'unknown' };
    }

    function getPlatformsForCategory(categoryKeys) {
        let platforms = [];

        for (const catKey of categoryKeys) {
            const category = PLATFORMS[catKey];
            if (category) {
                platforms = platforms.concat(Object.values(category));
            }
        }

        // Filtra por nivel se definido
        if (state.userLevel) {
            const levelData = RESPONSES.levels[state.userLevel];
            platforms = platforms.filter(p => {
                if (state.userLevel === 'beginner') return p.forBeginners;
                if (state.userLevel === 'advanced') return p.forAdvanced;
                return true;
            });
        }

        // Ordena por praticidade
        platforms.sort((a, b) => b.practicality - a.practicality);

        return platforms.slice(0, 3); // Retorna top 3
    }

    function createPlatformCard(platform, isFeatured = false) {
        return `
            <div class="chatbot-platform-card ${isFeatured ? 'featured' : ''}">
                <div class="platform-header">
                    <img src="${platform.logo}" alt="${platform.name}" class="platform-logo" onerror="this.style.display='none'">
                    <span class="platform-name">${platform.name}</span>
                    ${platform.badge ? `<span class="platform-badge">${platform.badge}</span>` : ''}
                </div>
                <p class="platform-desc">${platform.description}</p>
                <div class="platform-stats">
                    <span class="stat">Praticidade: <span class="stat-value">${platform.practicality}%</span></span>
                    <span class="stat">${platform.category}</span>
                </div>
                <a href="${platform.link}" target="_blank" rel="noopener noreferrer" class="platform-link" onclick="trackChatbotClick('${platform.name}')">
                    Acessar ${platform.name} →
                </a>
            </div>
        `;
    }

    function processMessage(userMessage) {
        if (!checkDailyLimit()) {
            return { text: RESPONSES.limitReached, quickReplies: [] };
        }

        incrementMessageCount();
        const intent = detectIntent(userMessage);

        switch (intent.type) {
            case 'greeting':
                // Primeiro: so pergunta o nivel, nada mais
                return {
                    text: RESPONSES.greeting,
                    quickReplies: [
                        { text: 'Iniciante', value: 'sou iniciante' },
                        { text: 'Intermediario', value: 'tenho experiencia media' },
                        { text: 'Avancado', value: 'sou avancado' }
                    ]
                };

            case 'setLevel':
                // Segundo: depois de responder o nivel, pergunta o que precisa
                state.userLevel = intent.level;
                const levelData = RESPONSES.levels[intent.level];

                const quickRepliesForLevel = intent.level === 'beginner'
                    ? [
                        { text: 'Comprar Cripto', value: 'quero comprar cripto' },
                        { text: 'Guardar Cripto', value: 'preciso guardar cripto' },
                        { text: 'Banco com Cripto', value: 'quero banco cripto' },
                        { text: 'O que e o site?', value: 'o que e o crypto aggregator' }
                    ]
                    : intent.level === 'intermediate'
                    ? [
                        { text: 'Comprar Cripto', value: 'quero comprar cripto' },
                        { text: 'Carteiras', value: 'preciso guardar cripto' },
                        { text: 'Fazer Trade', value: 'quero fazer trade' },
                        { text: 'DEX', value: 'quero usar dex' }
                    ]
                    : [
                        { text: 'DEX', value: 'quero usar dex' },
                        { text: 'Bridges', value: 'preciso de bridge' },
                        { text: 'Cold Wallets', value: 'quero cold wallet' },
                        { text: 'Exchanges', value: 'quero usar exchange' }
                    ];

                return {
                    text: levelData.response,
                    quickReplies: quickRepliesForLevel
                };

            case 'featured':
                const featured = PLATFORMS.featured.neobankless;
                const featuredExplanation = RESPONSES.explanations.bank;
                return {
                    text: "Esse e nosso parceiro oficial! Deixa eu te explicar:\n\n" + featuredExplanation.full,
                    html: createPlatformCard(featured, true),
                    quickReplies: [
                        { text: 'Ver outras opcoes', value: 'quero ver outras opcoes' },
                        { text: 'Voltar ao inicio', value: 'oi' }
                    ]
                };

            case 'category':
                const catData = RESPONSES.categories[intent.category];

                // Sempre pergunta se quer explicacao primeiro
                return {
                    text: catData.question,
                    quickReplies: intent.category === 'buy'
                        ? [
                            { text: 'Explica P2P', value: 'o que e p2p' },
                            { text: 'Explica Exchange', value: 'o que e exchange' },
                            { text: 'Mostra opcoes', value: 'mostra onde comprar' }
                        ]
                        : intent.category === 'store'
                        ? [
                            { text: 'Explica Hot Wallet', value: 'o que e hot wallet' },
                            { text: 'Explica Cold Wallet', value: 'o que e cold wallet' },
                            { text: 'Mostra opcoes', value: 'mostra carteiras' }
                        ]
                        : intent.category === 'trade'
                        ? [
                            { text: 'Explica Exchange', value: 'o que e exchange' },
                            { text: 'Explica DEX', value: 'o que e dex' },
                            { text: 'Mostra opcoes', value: 'mostra onde fazer trade' }
                        ]
                        : intent.category === 'bank'
                        ? [
                            { text: 'Sim, explica!', value: 'o que e banco cripto' },
                            { text: 'Mostra opcoes', value: 'mostra bancos cripto' }
                        ]
                        : intent.category === 'card'
                        ? [
                            { text: 'Sim, explica!', value: 'o que e cartao cripto' },
                            { text: 'Mostra opcoes', value: 'mostra cartoes cripto' }
                        ]
                        : intent.category === 'dex'
                        ? [
                            { text: 'Sim, explica!', value: 'o que e dex completo' },
                            { text: 'Mostra opcoes', value: 'mostra dex' }
                        ]
                        : intent.category === 'bridge'
                        ? [
                            { text: 'Sim, explica!', value: 'o que e bridge completo' },
                            { text: 'Mostra opcoes', value: 'mostra bridges' }
                        ]
                        : intent.category === 'start'
                        ? [
                            { text: 'Comprar primeiro', value: 'quero comprar cripto' },
                            { text: 'Guardar primeiro', value: 'preciso guardar cripto' }
                        ]
                        : [
                            { text: 'Sim, explica!', value: 'explica isso' },
                            { text: 'Mostra opcoes', value: 'mostra opcoes' }
                        ]
                };

            case 'showSubcategory':
                // Mostra plataformas de uma subcategoria especifica com explicacao
                const subCatMap = {
                    'p2p': { platforms: ['p2p'], intro: RESPONSES.explanations.p2p.simple + '\n\n' + RESPONSES.explanations.p2p.tip + '\n\nAqui as melhores opcoes:' },
                    'exchange': { platforms: ['exchanges'], intro: RESPONSES.explanations.exchange.simple + '\n\n' + RESPONSES.explanations.exchange.tip + '\n\nAqui as melhores:' },
                    'hotWallet': { platforms: ['hotWallets'], intro: RESPONSES.explanations.hotWallet.simple + '\n\n' + RESPONSES.explanations.hotWallet.tip + '\n\nMinhas recomendacoes:' },
                    'coldWallet': { platforms: ['coldWallets'], intro: RESPONSES.explanations.coldWallet.simple + '\n\n' + RESPONSES.explanations.coldWallet.tip + '\n\nAs melhores do mercado:' }
                };

                const subCatData = subCatMap[intent.subcategory];
                const subPlatforms = getPlatformsForCategory(subCatData.platforms);

                let subHtml = '';
                // Para P2P e banco, mostra destaque primeiro
                if (['p2p'].includes(intent.subcategory)) {
                    subHtml += createPlatformCard(PLATFORMS.featured.neobankless, true);
                }

                subPlatforms.slice(0, 2).forEach(p => {
                    if (p.name !== 'Neobankless') {
                        subHtml += createPlatformCard(p);
                    }
                });

                return {
                    text: subCatData.intro,
                    html: subHtml,
                    quickReplies: [
                        { text: 'Ver mais opcoes', value: 'quero ver outras opcoes' },
                        { text: 'Voltar ao inicio', value: 'oi' }
                    ]
                };

            case 'explain':
                // Explicacoes COMPLETAS e detalhadas
                const explanation = RESPONSES.explanations[intent.topic];
                if (!explanation) {
                    return {
                        text: "Hmm, nao encontrei explicacao pra isso. Me pergunta de outro jeito!",
                        quickReplies: [
                            { text: 'Voltar ao inicio', value: 'oi' }
                        ]
                    };
                }

                // Monta resposta com explicacao completa + dica
                const explainText = explanation.title + "\n\n" + explanation.full + "\n\n💡 " + explanation.tip;

                // Quick replies dependem do topico
                const explainReplies = {
                    'p2p': [
                        { text: 'Ver opcoes de P2P', value: 'mostra p2p' },
                        { text: 'Explica Exchange', value: 'o que e exchange' }
                    ],
                    'exchange': [
                        { text: 'Ver Exchanges', value: 'mostra exchanges' },
                        { text: 'Explica P2P', value: 'o que e p2p' }
                    ],
                    'hotWallet': [
                        { text: 'Ver Hot Wallets', value: 'mostra hot wallets' },
                        { text: 'Explica Cold Wallet', value: 'o que e cold wallet' }
                    ],
                    'coldWallet': [
                        { text: 'Ver Cold Wallets', value: 'mostra cold wallets' },
                        { text: 'Explica Hot Wallet', value: 'o que e hot wallet' }
                    ],
                    'wallet': [
                        { text: 'Ver Carteiras', value: 'mostra carteiras' },
                        { text: 'Voltar', value: 'oi' }
                    ],
                    'bank': [
                        { text: 'Ver Bancos', value: 'mostra bancos cripto' },
                        { text: 'Ver Destaque', value: 'qual o parceiro destaque' }
                    ],
                    'card': [
                        { text: 'Ver Cartoes', value: 'mostra cartoes cripto' },
                        { text: 'Voltar', value: 'oi' }
                    ],
                    'dex': [
                        { text: 'Ver DEXs', value: 'mostra dex' },
                        { text: 'Voltar ao basico', value: 'oi' }
                    ],
                    'bridge': [
                        { text: 'Ver Bridges', value: 'mostra bridges' },
                        { text: 'Voltar', value: 'oi' }
                    ],
                    'site': [
                        { text: 'Ver Destaque', value: 'qual o parceiro destaque' },
                        { text: 'Como comecar', value: 'quero comprar cripto' }
                    ]
                };

                return {
                    text: explainText,
                    quickReplies: explainReplies[intent.topic] || [{ text: 'Voltar', value: 'oi' }]
                };

            case 'showPlatforms':
                // Mostra plataformas de uma categoria COM explicacao resumida primeiro
                const showCatMap = {
                    'p2p': { platforms: ['p2p'], explanation: 'p2p' },
                    'exchanges': { platforms: ['exchanges'], explanation: 'exchange' },
                    'hotWallets': { platforms: ['hotWallets'], explanation: 'hotWallet' },
                    'coldWallets': { platforms: ['coldWallets'], explanation: 'coldWallet' },
                    'wallets': { platforms: ['hotWallets', 'coldWallets'], explanation: 'wallet' },
                    'banks': { platforms: ['banks'], explanation: 'bank' },
                    'cards': { platforms: ['cryptoCards'], explanation: 'card' },
                    'dexs': { platforms: ['dexs'], explanation: 'dex' },
                    'bridges': { platforms: ['bridges'], explanation: 'bridge' },
                    'buy': { platforms: ['p2p', 'exchanges'], explanation: null },
                    'trade': { platforms: ['exchanges', 'dexs'], explanation: null }
                };

                const showData = showCatMap[intent.showCategory];
                if (!showData) {
                    return {
                        text: "Nao encontrei essa categoria. Tenta de novo!",
                        quickReplies: [{ text: 'Voltar', value: 'oi' }]
                    };
                }

                const showPlatforms = getPlatformsForCategory(showData.platforms);
                let showHtml = '';

                // Sempre mostra destaque primeiro para certas categorias
                if (['p2p', 'banks', 'buy'].includes(intent.showCategory)) {
                    showHtml += createPlatformCard(PLATFORMS.featured.neobankless, true);
                }

                showPlatforms.slice(0, 3).forEach(p => {
                    if (p.name !== 'Neobankless') {
                        showHtml += createPlatformCard(p);
                    }
                });

                const showIntro = showData.explanation
                    ? "Aqui estao as melhores opcoes! Qualquer duvida e so perguntar:"
                    : "Beleza! Aqui estao as melhores opcoes pra voce:";

                return {
                    text: showIntro,
                    html: showHtml,
                    quickReplies: [
                        { text: 'Me explica mais', value: showData.explanation ? `o que e ${showData.explanation}` : 'oi' },
                        { text: 'Voltar ao inicio', value: 'oi' }
                    ]
                };

            case 'platform':
                return {
                    text: RESPONSES.platformIntro,
                    html: createPlatformCard(intent.platform),
                    quickReplies: [
                        { text: 'Ver similares', value: `quero ver mais ${intent.platform.category.toLowerCase()}` },
                        { text: 'Outra categoria', value: 'quero ver outras categorias' }
                    ]
                };

            case 'siteInfo':
                return {
                    text: RESPONSES.siteInfo.about,
                    quickReplies: [
                        { text: 'Ver Destaque', value: 'qual o parceiro destaque' },
                        { text: 'Comprar Cripto', value: 'quero comprar cripto' },
                        { text: 'Como comecar', value: 'sou iniciante' }
                    ]
                };

            default:
                return {
                    text: getRandomItem(RESPONSES.fallback),
                    quickReplies: [
                        { text: 'Comprar Cripto', value: 'quero comprar cripto' },
                        { text: 'Fazer Trade', value: 'quero fazer trade' },
                        { text: 'Guardar Seguro', value: 'preciso guardar cripto' },
                        { text: 'Ver Destaque', value: 'qual o parceiro destaque' }
                    ]
                };
        }
    }

    // ==========================================
    // UI DO CHATBOT
    // ==========================================

    function createChatbotHTML() {
        return `
            <!-- Chatbot Toggle Button -->
            <button class="chatbot-toggle" id="chatbotToggle" aria-label="Abrir chat">
                <span class="chatbot-toggle-icon">💬</span>
                <span class="chatbot-badge" id="chatbotBadge">1</span>
            </button>

            <!-- Chatbot Window -->
            <div class="chatbot-window" id="chatbotWindow">
                <div class="chatbot-header">
                    <div class="chatbot-avatar">🤖</div>
                    <div class="chatbot-info">
                        <h3 class="chatbot-name">${CONFIG.botName}</h3>
                        <span class="chatbot-status">Online</span>
                    </div>
                    <button class="chatbot-close" id="chatbotClose" aria-label="Fechar chat">×</button>
                </div>

                <div class="chatbot-messages" id="chatbotMessages">
                    <!-- Messages will be inserted here -->
                </div>

                <div class="chatbot-input-area">
                    <div class="chatbot-input-container">
                        <input type="text" class="chatbot-input" id="chatbotInput" placeholder="Digite sua mensagem..." maxlength="200">
                        <button class="chatbot-send" id="chatbotSend" aria-label="Enviar">
                            <svg viewBox="0 0 24 24"><path d="M2.01 21L23 12 2.01 3 2 10l15 2-15 2z"/></svg>
                        </button>
                    </div>
                </div>
            </div>
        `;
    }

    function addMessage(content, isBot = true) {
        const messagesContainer = document.getElementById('chatbotMessages');
        if (!messagesContainer) return;

        const messageDiv = document.createElement('div');
        messageDiv.className = `chatbot-message ${isBot ? 'bot' : 'user'}`;
        messageDiv.textContent = content;

        messagesContainer.appendChild(messageDiv);
        messagesContainer.scrollTop = messagesContainer.scrollHeight;
    }

    function addBotMessage(response) {
        const messagesContainer = document.getElementById('chatbotMessages');
        if (!messagesContainer) return;

        // Adiciona texto
        if (response.text) {
            const messageDiv = document.createElement('div');
            messageDiv.className = 'chatbot-message bot';
            messageDiv.textContent = response.text;
            messagesContainer.appendChild(messageDiv);
        }

        // Adiciona HTML (cards de plataforma)
        if (response.html) {
            const htmlDiv = document.createElement('div');
            htmlDiv.className = 'chatbot-message bot';
            htmlDiv.innerHTML = response.html;
            messagesContainer.appendChild(htmlDiv);
        }

        // Adiciona quick replies
        if (response.quickReplies && response.quickReplies.length > 0) {
            const repliesDiv = document.createElement('div');
            repliesDiv.className = 'chatbot-quick-replies';

            response.quickReplies.forEach(reply => {
                const btn = document.createElement('button');
                btn.className = 'chatbot-quick-reply';
                btn.textContent = reply.text;
                btn.onclick = () => handleUserInput(reply.value);
                repliesDiv.appendChild(btn);
            });

            messagesContainer.appendChild(repliesDiv);
        }

        messagesContainer.scrollTop = messagesContainer.scrollHeight;

        // Handle follow-up messages
        if (response.followUp) {
            setTimeout(() => {
                addBotMessage({
                    text: response.followUp.text,
                    quickReplies: response.followUp.quickReplies
                });
            }, response.followUp.delay);
        }
    }

    function showTypingIndicator() {
        const messagesContainer = document.getElementById('chatbotMessages');
        if (!messagesContainer) return;

        const typingDiv = document.createElement('div');
        typingDiv.className = 'chatbot-typing';
        typingDiv.id = 'typingIndicator';
        typingDiv.innerHTML = '<span></span><span></span><span></span>';
        messagesContainer.appendChild(typingDiv);
        messagesContainer.scrollTop = messagesContainer.scrollHeight;
    }

    function hideTypingIndicator() {
        const typing = document.getElementById('typingIndicator');
        if (typing) typing.remove();
    }

    function handleUserInput(message) {
        if (!message || message.trim() === '') return;

        // Remove quick replies anteriores
        const oldReplies = document.querySelectorAll('.chatbot-quick-replies');
        oldReplies.forEach(r => r.remove());

        // Adiciona mensagem do usuario
        addMessage(message, false);

        // Mostra typing
        showTypingIndicator();

        // Processa e responde
        setTimeout(() => {
            hideTypingIndicator();
            const response = processMessage(message);
            addBotMessage(response);
        }, CONFIG.typingDelay);

        // Limpa input
        const input = document.getElementById('chatbotInput');
        if (input) input.value = '';
    }

    function toggleChatbot() {
        const window = document.getElementById('chatbotWindow');
        const toggle = document.getElementById('chatbotToggle');
        const badge = document.getElementById('chatbotBadge');

        state.isOpen = !state.isOpen;

        if (state.isOpen) {
            window.classList.add('active');
            toggle.classList.add('active');
            badge.style.display = 'none';

            // Mensagem inicial se for primeira abertura
            const messagesContainer = document.getElementById('chatbotMessages');
            if (messagesContainer && messagesContainer.children.length === 0) {
                setTimeout(() => {
                    const greeting = processMessage('oi');
                    addBotMessage(greeting);
                }, 500);
            }

            // Foca no input
            setTimeout(() => {
                const input = document.getElementById('chatbotInput');
                if (input) input.focus();
            }, 300);
        } else {
            window.classList.remove('active');
            toggle.classList.remove('active');
        }
    }

    function initChatbot() {
        // Verifica limite diario
        checkDailyLimit();

        // HTML ja esta no index.html, apenas configura event listeners
        const toggleBtn = document.getElementById('chatbotToggle');
        const closeBtn = document.getElementById('chatbotClose');
        const sendBtn = document.getElementById('chatbotSend');
        const input = document.getElementById('chatbotInput');

        if (toggleBtn) toggleBtn.addEventListener('click', toggleChatbot);
        if (closeBtn) closeBtn.addEventListener('click', toggleChatbot);

        if (sendBtn) {
            sendBtn.addEventListener('click', () => {
                const msg = input?.value;
                if (msg) handleUserInput(msg);
            });
        }

        if (input) {
            input.addEventListener('keypress', (e) => {
                if (e.key === 'Enter') {
                    handleUserInput(input.value);
                }
            });
        }

        console.log('[Chatbot] Initialized successfully');
    }

    // Funcao global para tracking
    window.trackChatbotClick = function(platformName) {
        console.log('[Chatbot] Platform click:', platformName);
        if (typeof gtag === 'function') {
            gtag('event', 'chatbot_platform_click', {
                'platform': platformName,
                'timestamp': new Date().toISOString()
            });
        }
    };

    // Inicializa quando DOM estiver pronto
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', initChatbot);
    } else {
        initChatbot();
    }

})();
