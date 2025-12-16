// Fetch live crypto prices from CoinGecko API
async function updateCryptoPrices() {
    try {
        const response = await fetch(
            'https://api.coingecko.com/api/v3/simple/price?ids=bitcoin,ethereum,tether&vs_currencies=usd'
        );
        const data = await response.json();

        // Update BTC price
        const btcElement = document.getElementById('btc-price');
        if (btcElement && data.bitcoin) {
            btcElement.textContent = `$${data.bitcoin.usd.toLocaleString('en-US')}`;
        }

        // Update ETH price
        const ethElement = document.getElementById('eth-price');
        if (ethElement && data.ethereum) {
            ethElement.textContent = `$${data.ethereum.usd.toLocaleString('en-US')}`;
        }

        // Update USDT price
        const usdtElement = document.getElementById('usdt-price');
        if (usdtElement && data.tether) {
            usdtElement.textContent = `$${data.tether.usd.toFixed(2)}`;
        }
    } catch (error) {
        console.error('Error fetching crypto prices:', error);
    }
}

// Update prices on page load
document.addEventListener('DOMContentLoaded', function() {
    updateCryptoPrices();
});

// Update prices every 60 seconds
setInterval(updateCryptoPrices, 60000);
