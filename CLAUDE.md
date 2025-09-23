# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

This is a Brazilian cryptocurrency investment advisor web application called "Finance Crypto" or "Consultor Financeiro Crypto". It's a Progressive Web App (PWA) built with vanilla HTML, CSS, and JavaScript that provides personalized cryptocurrency portfolio recommendations based on user risk tolerance and investment objectives.

## Architecture

### Core Structure
- **Frontend-only application**: No backend server required, runs entirely in the browser
- **Progressive Web App**: Full PWA implementation with service worker, manifest, and offline capabilities
- **Modular JavaScript**: ES6+ modules with feature-based organization
- **Real-time data**: CoinGecko API integration for live crypto prices
- **Local storage**: Uses localStorage and IndexedDB for persistence

### Key Components
1. **Questionnaire System**: 9 profile combinations (3 objectives × 3 risk levels)
2. **Portfolio Algorithm**: Generates personalized crypto allocations
3. **Real-time Pricing**: Live Bitcoin/crypto price displays
4. **Analytics System**: Comprehensive user behavior tracking
5. **A/B Testing Framework**: Built-in experimentation capabilities
6. **PWA Features**: Installable with offline support

## File Structure

```
/
├── index.html              # Main landing page
├── main.js                 # Core application logic
├── styles.css              # Primary styling
├── manifest.json           # PWA manifest
├── sw.js                   # Service worker
├── js/                     # JavaScript modules
│   ├── api.js              # CoinGecko API integration
│   ├── calculator.js       # Portfolio calculations
│   ├── analytics.js        # Event tracking
│   ├── notifications.js    # Push notifications
│   └── ab-testing.js       # A/B testing framework
└── css/                    # Additional stylesheets
```

## Development Commands

This is a static web application with no build process. Development commands:

### Local Development
```bash
# Serve locally (any HTTP server)
python -m http.server 8000
# OR
npx live-server
```

### Testing
- No automated test suite
- Manual testing across browsers and devices required
- Use browser dev tools for PWA validation

## Key Technical Features

### Portfolio Algorithm
- **9 Profile Types**: Conservative, Moderate, Aggressive across 3 time horizons
- **Dynamic Allocations**: BTC, ETH, BNB, SOL, XRP, PENDLE percentages
- **Risk Adjustments**: Automatic allocation shifts based on user responses

### Real-time Integration
- **CoinGecko API**: Live crypto price feeds with 1-minute caching
- **Smart Polling**: Efficient background updates with exponential backoff
- **Offline Fallbacks**: Cached prices when API unavailable

### PWA Implementation
- **Service Worker**: Advanced caching strategies (cache-first, network-first, stale-while-revalidate)
- **Manifest**: Complete app manifest with shortcuts and icons
- **Installable**: Add to homescreen on mobile/desktop
- **Background Sync**: Analytics and notifications when offline

## Data Flow

1. **User Input** → Questionnaire completion
2. **Profile Analysis** → Algorithm determines investor type
3. **Portfolio Generation** → Crypto allocation percentages
4. **Real-time Pricing** → Live portfolio value calculation
5. **Results Display** → 5-card result layout with sharing options

## API Integration

### CoinGecko API
- **Endpoint**: `https://api.coingecko.com/api/v3/simple/price`
- **Rate Limiting**: 1-minute caching, exponential backoff on failures
- **Supported Coins**: BTC, ETH, BNB, SOL, XRP, PENDLE
- **Currencies**: USD and BRL pricing

## Analytics & Privacy

### Event Tracking
- **Local Analytics**: No external services, data stays in browser
- **IndexedDB Storage**: Persistent local analytics database
- **Privacy-First**: No cookies, no external tracking
- **Events**: Page views, form completions, shares, errors

### A/B Testing
- **Portfolio Variants**: Test different allocation strategies
- **UI Tests**: Button text, layouts, color schemes
- **Statistical Analysis**: Built-in significance testing

## Common Development Tasks

### Adding New Cryptocurrencies
1. Update `CRYPTO_IDS` in `js/api.js`
2. Add allocation logic in portfolio calculation functions
3. Update result display templates

### Modifying Portfolio Algorithms
- Edit allocation percentages in profile calculation functions in `main.js`
- Ensure total allocations equal 100%
- Test across all 9 profile combinations

### PWA Updates
- Increment version in `sw.js` for cache invalidation
- Update manifest for new features/shortcuts
- Test installation flow on target devices

## Browser Support

- **Chrome/Chromium**: Full feature support including PWA
- **Firefox**: Core features, limited PWA capabilities
- **Safari**: Basic functionality, some PWA limitations
- **Mobile**: Full PWA support on Android, limited on iOS

## Performance Considerations

- **Critical CSS**: Inline critical styles in HTML head
- **Lazy Loading**: Load non-critical JavaScript modules on demand
- **Image Optimization**: Use SVG icons, optimize any raster images
- **API Efficiency**: Batch requests, implement proper caching

## Security Notes

- **No Sensitive Data**: No personal information permanently stored
- **Input Sanitization**: Validate all user inputs
- **API Security**: Use public endpoints only, no API keys required
- **CSP Ready**: Content Security Policy compatible

## Troubleshooting

### Common Issues
- **PWA Installation**: Check manifest validation in Chrome DevTools
- **API Failures**: Verify CoinGecko API status and rate limits
- **Offline Mode**: Test service worker caching in DevTools
- **Analytics**: Monitor console for IndexedDB operations

### Debugging Tools
- Chrome DevTools → Application tab for PWA features
- Network tab for API monitoring
- Console for analytics and error tracking
- Lighthouse for performance auditing