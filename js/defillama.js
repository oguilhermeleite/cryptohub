// DeFiLlama Integration for DEX Cards
// Fetches TVL data and displays it on DEX platform cards

(function() {
    'use strict';

    console.log('DeFiLlama integration loaded');

    // Mapping of platform names to DeFiLlama protocol slugs
    const DEFI_PROTOCOLS = {
        'uniswap': 'uniswap',
        'jupiter': 'jupiter-aggregator-v6',
        'meteora': 'meteora',
        'pancakeswap': 'pancakeswap'
    };

    // Cache duration: 5 minutes
    const CACHE_DURATION = 5 * 60 * 1000;
    const CACHE_KEY_PREFIX = 'defillama_';

    /**
     * Format number to human-readable format (B, M, K)
     */
    function formatNumber(num) {
        if (num >= 1e9) {
            return '$' + (num / 1e9).toFixed(2) + 'B';
        } else if (num >= 1e6) {
            return '$' + (num / 1e6).toFixed(1) + 'M';
        } else if (num >= 1e3) {
            return '$' + (num / 1e3).toFixed(0) + 'K';
        }
        return '$' + num.toFixed(0);
    }

    /**
     * Get cached data if available and not expired
     */
    function getCachedData(key) {
        try {
            const cached = localStorage.getItem(CACHE_KEY_PREFIX + key);
            if (cached) {
                const data = JSON.parse(cached);
                if (Date.now() - data.timestamp < CACHE_DURATION) {
                    console.log(`Using cached data for ${key}`);
                    return data.value;
                }
            }
        } catch (e) {
            console.error('Cache read error:', e);
        }
        return null;
    }

    /**
     * Set cache data
     */
    function setCachedData(key, value) {
        try {
            const data = {
                value: value,
                timestamp: Date.now()
            };
            localStorage.setItem(CACHE_KEY_PREFIX + key, JSON.stringify(data));
        } catch (e) {
            console.error('Cache write error:', e);
        }
    }

    /**
     * Fetch protocol data from DeFiLlama API
     */
    async function fetchProtocolData(slug) {
        // Check cache first
        const cached = getCachedData(slug);
        if (cached) {
            return cached;
        }

        console.log(`Fetching data for ${slug}...`);

        try {
            const response = await fetch(`https://api.llama.fi/protocol/${slug}`);
            if (!response.ok) {
                throw new Error(`API error: ${response.status}`);
            }
            const data = await response.json();

            console.log(`Data received for ${slug}:`, data);

            // Calculate TVL from currentChainTvls
            let tvl = 0;
            if (data.currentChainTvls) {
                tvl = Object.values(data.currentChainTvls).reduce((sum, val) => {
                    // Skip 'staking' entries
                    return typeof val === 'number' ? sum + val : sum;
                }, 0);
            }

            // Extract relevant data
            const protocolData = {
                tvl: tvl || data.tvl || 0,
                change24h: data.change_1d || 0
            };

            console.log(`Processed data for ${slug}:`, protocolData);

            // Cache the data
            setCachedData(slug, protocolData);

            return protocolData;
        } catch (error) {
            console.error(`Error fetching ${slug}:`, error);
            return null;
        }
    }

    /**
     * Update DEX card with DeFiLlama data
     */
    function updateDexCard(platformName, data) {
        if (!data) {
            console.warn(`No data for ${platformName}`);
            return;
        }

        console.log(`Updating card for ${platformName}`);

        const card = document.querySelector(`[data-platform="${platformName}"] .card-front .card-content`);
        if (!card) {
            console.error(`Card not found for ${platformName}`);
            return;
        }

        console.log(`Card found for ${platformName}`, card);

        // Check if stats already exist
        let statsContainer = card.querySelector('.defi-stats');
        if (!statsContainer) {
            statsContainer = document.createElement('div');
            statsContainer.className = 'defi-stats';
            card.appendChild(statsContainer);
        }

        // Update stats content
        const change24hClass = data.change24h >= 0 ? 'positive' : 'negative';
        const change24hSymbol = data.change24h >= 0 ? '+' : '';

        statsContainer.innerHTML = `
            <div class="stat-item">
                <span class="stat-label">TVL</span>
                <span class="stat-value">${formatNumber(data.tvl)}</span>
            </div>
            <div class="stat-item">
                <span class="stat-label">24h</span>
                <span class="stat-value ${change24hClass}">${change24hSymbol}${data.change24h.toFixed(2)}%</span>
            </div>
        `;

        console.log(`Card updated for ${platformName}`);
    }

    /**
     * Initialize DeFiLlama integration for all DEX cards
     */
    async function initDeFiLlamaData() {
        console.log('Initializing DeFiLlama data...');

        // Wait for DOM to be ready
        if (document.readyState === 'loading') {
            console.log('DOM still loading, waiting...');
            document.addEventListener('DOMContentLoaded', initDeFiLlamaData);
            return;
        }

        console.log('DOM ready, fetching data...');

        // Fetch data for all DEXs
        for (const [platformName, slug] of Object.entries(DEFI_PROTOCOLS)) {
            try {
                const data = await fetchProtocolData(slug);
                if (data) {
                    updateDexCard(platformName, data);
                }
            } catch (error) {
                console.error(`Error updating ${platformName}:`, error);
            }
        }

        console.log('DeFiLlama integration complete');
    }

    // Initialize when DOM is ready
    initDeFiLlamaData();

})();
