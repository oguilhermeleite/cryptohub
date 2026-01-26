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
        botName: 'CryptoBot',
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
                link: 'https://neobankless.com',
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
        greetings: [
            "E ai! Sou o CryptoBot, seu guia no mundo cripto. Como posso te ajudar hoje?",
            "Opa! Bem-vindo ao Crypto Aggregator! To aqui pra te ajudar a navegar nesse universo. Bora?",
            "Fala! Sou o assistente do Crypto Aggregator. Quer conhecer as melhores plataformas de cripto? Chega mais!"
        ],

        levelQuestion: "Massa! Pra te ajudar melhor, me conta: qual seu nivel de experiencia com cripto?",

        levels: {
            beginner: {
                response: "Show! Iniciante, ne? Sem stress, todo mundo comeca de algum lugar. Vou te indicar as opcoes mais faceis e seguras!",
                focus: ['exchanges', 'p2p', 'banks', 'hotWallets']
            },
            intermediate: {
                response: "Beleza! Ja tem uma nocao boa entao. Posso te mostrar opcoes mais completas com funcionalidades avancadas!",
                focus: ['exchanges', 'p2p', 'dexs', 'hotWallets', 'coldWallets']
            },
            advanced: {
                response: "Ah, um veterano! Ai sim! Vou te mostrar as ferramentas mais poderosas do mercado. Bora pro proximo nivel?",
                focus: ['dexs', 'bridges', 'coldWallets', 'exchanges']
            }
        },

        categories: {
            buy: {
                keywords: ['comprar', 'compra', 'buy', 'adquirir', 'pix', 'reais'],
                response: "Quer comprar cripto? Boa escolha! Deixa eu te mostrar as melhores opcoes:",
                platforms: ['p2p', 'exchanges']
            },
            trade: {
                keywords: ['trade', 'trading', 'trocar', 'converter', 'swap'],
                response: "Bora fazer trade! Aqui estao as melhores plataformas pra isso:",
                platforms: ['exchanges', 'dexs']
            },
            store: {
                keywords: ['guardar', 'armazenar', 'carteira', 'wallet', 'seguro', 'seguranca'],
                response: "Seguranca em primeiro lugar! Olha as melhores opcoes pra guardar suas cripto:",
                platforms: ['coldWallets', 'hotWallets']
            },
            bank: {
                keywords: ['banco', 'bank', 'conta', 'digital', 'fiat'],
                response: "Quer um banco que entende cripto? Tenho otimas opcoes:",
                platforms: ['banks']
            },
            card: {
                keywords: ['cartao', 'card', 'gastar', 'pagar', 'cashback'],
                response: "Cartao cripto e vida! Gaste suas moedas no dia a dia:",
                platforms: ['cryptoCards']
            },
            dex: {
                keywords: ['dex', 'descentralizada', 'defi', 'liquidity', 'pool'],
                response: "DEX e pra quem gosta de autonomia! Confere essas:",
                platforms: ['dexs']
            },
            bridge: {
                keywords: ['bridge', 'transferir', 'rede', 'chain', 'layer'],
                response: "Precisa mover cripto entre redes? Essas bridges resolvem:",
                platforms: ['bridges']
            }
        },

        fallback: [
            "Hmm, nao entendi muito bem. Pode reformular? Ou escolhe uma das opcoes ai embaixo!",
            "Opa, essa eu nao peguei. Tenta de novo ou usa os botoes ai!",
            "Desculpa, nao captei. Que tal escolher uma das categorias?"
        ],

        limitReached: "Eita! Voce atingiu o limite de mensagens por hoje (25). Volta amanha que to aqui te esperando!",

        platformIntro: "Deixa eu te apresentar essa plataforma incrivel:",

        siteInfo: {
            about: "O Crypto Aggregator e o seu hub de cripto! Reunimos as melhores plataformas de P2P, exchanges, carteiras, cartoes e muito mais. Tudo num lugar so, com links verificados e recomendacoes da comunidade!",
            mission: "Nossa missao e simplificar o mundo cripto pra voce. Nada de perder tempo pesquisando - a gente ja fez isso! So escolher e usar.",
            partner: "Nossas plataformas parceiras sao verificadas e confiáveis. O destaque vai pro Neobankless, nosso parceiro oficial que oferece o melhor dos dois mundos: banco tradicional + cripto!"
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
        if (/(sobre o site|o que e|como funciona|missao|objetivo)/.test(lowerMsg)) {
            return { type: 'siteInfo', subtype: 'about' };
        }

        if (/(parceiro|destaque|recomendado|melhor opcao)/.test(lowerMsg)) {
            return { type: 'featured' };
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
                return {
                    text: getRandomItem(RESPONSES.greetings),
                    quickReplies: [
                        { text: 'Comprar Cripto', value: 'quero comprar cripto' },
                        { text: 'Guardar Seguro', value: 'como guardar cripto seguro' },
                        { text: 'Sobre o Site', value: 'sobre o site' }
                    ],
                    followUp: {
                        delay: 1500,
                        text: RESPONSES.levelQuestion,
                        quickReplies: [
                            { text: 'Iniciante', value: 'sou iniciante' },
                            { text: 'Intermediario', value: 'sou intermediario' },
                            { text: 'Avancado', value: 'sou avancado' }
                        ]
                    }
                };

            case 'setLevel':
                state.userLevel = intent.level;
                const levelData = RESPONSES.levels[intent.level];
                return {
                    text: levelData.response,
                    quickReplies: [
                        { text: 'Comprar Cripto', value: 'quero comprar cripto' },
                        { text: 'Fazer Trade', value: 'quero fazer trade' },
                        { text: 'Carteira Segura', value: 'preciso de uma carteira' },
                        { text: 'Banco Cripto', value: 'quero um banco com cripto' }
                    ]
                };

            case 'featured':
                const featured = PLATFORMS.featured.neobankless;
                return {
                    text: "Esse e nosso parceiro oficial e minha recomendacao numero 1!",
                    html: createPlatformCard(featured, true),
                    quickReplies: [
                        { text: 'Ver mais opcoes', value: 'quero ver outras opcoes' },
                        { text: 'Como comecar?', value: 'como comecar com cripto' }
                    ]
                };

            case 'category':
                const catData = RESPONSES.categories[intent.category];
                const platforms = getPlatformsForCategory(catData.platforms);

                // Sempre mostra o destaque primeiro se relevante
                let html = '';
                if (['buy', 'bank'].includes(intent.category)) {
                    html += createPlatformCard(PLATFORMS.featured.neobankless, true);
                }

                platforms.forEach(p => {
                    if (p.name !== 'Neobankless') {
                        html += createPlatformCard(p);
                    }
                });

                return {
                    text: catData.response,
                    html: html,
                    quickReplies: [
                        { text: 'Ver Destaque', value: 'qual o parceiro destaque' },
                        { text: 'Outra categoria', value: 'quero ver outras categorias' }
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

        // Insere HTML
        const container = document.createElement('div');
        container.id = 'chatbot-container';
        container.innerHTML = createChatbotHTML();
        document.body.appendChild(container);

        // Event listeners
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
