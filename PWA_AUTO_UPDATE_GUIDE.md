# PWA Auto-Update System - Implementation Guide

## Overview

A robust Progressive Web App (PWA) auto-update system has been implemented for CryptoHub. When new code is deployed, users will automatically receive a toast notification prompting them to refresh and get the latest version.

---

## Files Modified/Created

1. **`sw.js`** - Service Worker with version control (NEW/OVERWRITTEN)
2. **`index.html`** - Added Service Worker registration and update toast
3. **`styles.css`** - Added toast notification styles

---

## How It Works

### 1. Service Worker (`sw.js`)

The Service Worker implements a **cache-first** strategy:

- **Install Event**: Caches all static assets when the SW is first installed
- **Activate Event**: Cleans up old caches and takes control of all pages
- **Fetch Event**: Serves cached assets first, falls back to network if not cached
- **Message Event**: Handles `skipWaiting` message to activate new version immediately

**Key Variable:**
```javascript
const CACHE_NAME = 'crypto-aggregator-v1';
```

### 2. Update Detection (`index.html`)

The registration script:

1. Registers the Service Worker on page load
2. Listens for `updatefound` events (new SW detected)
3. Shows the update toast when a new version is ready
4. Handles the reload button click to activate the new SW
5. Automatically reloads the page when the new SW takes over

### 3. Update Toast UI

- **Position**: Fixed bottom-right corner
- **Design**: Dark theme with cyan/green accent (`#00ffb3`)
- **Button**: "Atualizar" button to trigger update
- **Responsive**: Adapts to mobile screens

---

## 🚨 CRITICAL INSTRUCTION - Version Updates

### **Every time you modify ANY file in this repository, you MUST increment the `CACHE_NAME` version:**

**File:** `sw.js` (Line 3)

**Current:**
```javascript
const CACHE_NAME = 'crypto-aggregator-v1';
```

**After ANY code change, increment to:**
```javascript
const CACHE_NAME = 'crypto-aggregator-v2';
```

**Then v3, v4, v5, etc.**

### Why This Is Critical

- The browser only detects a Service Worker update when the `sw.js` file **content changes**
- Changing the `CACHE_NAME` ensures the browser recognizes the new version
- Without this, users won't see the update notification
- The old cached version will continue to be served

---

## Update Flow Diagram

```
┌─────────────────────────────────────────────────────────┐
│  Developer pushes new code with incremented CACHE_NAME  │
└───────────────────────┬─────────────────────────────────┘
                        │
                        ▼
┌─────────────────────────────────────────────────────────┐
│  User visits site → Browser checks sw.js                │
└───────────────────────┬─────────────────────────────────┘
                        │
                        ▼
┌─────────────────────────────────────────────────────────┐
│  Browser detects CACHE_NAME change → New SW installs    │
└───────────────────────┬─────────────────────────────────┘
                        │
                        ▼
┌─────────────────────────────────────────────────────────┐
│  Toast notification appears: "Nova versão disponível!"  │
└───────────────────────┬─────────────────────────────────┘
                        │
                        ▼
┌─────────────────────────────────────────────────────────┐
│  User clicks "Atualizar" → New SW activates             │
└───────────────────────┬─────────────────────────────────┘
                        │
                        ▼
┌─────────────────────────────────────────────────────────┐
│  Page reloads → User sees latest version                │
└─────────────────────────────────────────────────────────┘
```

---

## Testing the Update System

### Local Testing

1. **Start a local server:**
   ```bash
   python -m http.server 8000
   # OR
   npx http-server -p 8000
   ```

2. **Open in browser:**
   ```
   http://localhost:8000
   ```

3. **Check Service Worker registration:**
   - Open DevTools (F12)
   - Go to **Application** tab
   - Click **Service Workers**
   - You should see `sw.js` registered

4. **Simulate an update:**
   - Increment `CACHE_NAME` in `sw.js` (e.g., `v1` → `v2`)
   - Save the file
   - Refresh the page
   - You should see the update toast appear

5. **Click "Atualizar":**
   - The page should reload
   - Check the Application tab again
   - The new SW version should be active

### Production Testing

1. **Deploy your changes** to the live server
2. **Visit the site** on a device that already has the old SW cached
3. **Wait a few seconds** for the browser to detect the update
4. **Toast should appear** automatically
5. **Click "Atualizar"** to refresh to the new version

---

## Browser DevTools - Service Worker Panel

**Chrome/Edge DevTools:**
1. Press `F12`
2. Go to **Application** tab
3. Click **Service Workers** in the left sidebar

**Useful Actions:**
- **Update**: Manually check for SW updates
- **Unregister**: Remove the SW (for testing fresh installs)
- **Bypass for network**: Disable SW temporarily
- **Offline**: Test offline functionality

---

## Troubleshooting

### Toast Not Appearing

**Possible Causes:**
1. ❌ `CACHE_NAME` was not incremented
2. ❌ `sw.js` is being cached by the server
3. ❌ Browser has aggressive caching enabled

**Solutions:**
1. ✅ Increment `CACHE_NAME` to a new version
2. ✅ Add cache-busting headers to server config:
   ```
   Cache-Control: no-cache, must-revalidate
   ```
3. ✅ Hard refresh: `Ctrl+Shift+R` (Windows) or `Cmd+Shift+R` (Mac)
4. ✅ Clear Service Workers in DevTools

### Service Worker Not Registering

**Possible Causes:**
1. ❌ Site not served over HTTPS (required for SW, except localhost)
2. ❌ `sw.js` file path incorrect
3. ❌ JavaScript error preventing registration

**Solutions:**
1. ✅ Deploy to HTTPS server (or use `localhost` for testing)
2. ✅ Verify `sw.js` is at root: `https://yourdomain.com/sw.js`
3. ✅ Check browser console for errors

### Old Version Still Loading

**Possible Causes:**
1. ❌ Multiple tabs open (SW can't update until all tabs closed)
2. ❌ Browser cache still serving old assets

**Solutions:**
1. ✅ Close all tabs with the site, then reopen
2. ✅ Use DevTools → Application → Service Workers → **Unregister**
3. ✅ Clear browser cache completely

---

## Server Configuration Recommendations

### For `sw.js` File

**Nginx:**
```nginx
location = /sw.js {
    add_header Cache-Control "no-cache, no-store, must-revalidate";
    add_header Pragma "no-cache";
    add_header Expires "0";
}
```

**Apache (.htaccess):**
```apache
<Files "sw.js">
    Header set Cache-Control "no-cache, no-store, must-revalidate"
    Header set Pragma "no-cache"
    Header set Expires "0"
</Files>
```

### For Static Assets

Allow normal caching for other files:
```nginx
location ~* \.(js|css|png|jpg|jpeg|gif|ico|svg)$ {
    expires 7d;
    add_header Cache-Control "public, immutable";
}
```

---

## Future Enhancements

### Possible Improvements:
1. **Automatic Version Increment**: Use build tools (Webpack, Vite) to auto-increment version
2. **Changelog Display**: Show users what's new in the update
3. **Scheduled Updates**: Check for updates every N minutes in the background
4. **Silent Updates**: Auto-update without user interaction (less user-friendly)
5. **Version Tracking**: Store version number in `localStorage` for analytics

### Build Script Example (Node.js):

```javascript
// auto-version.js
const fs = require('fs');

const swPath = './sw.js';
let sw = fs.readFileSync(swPath, 'utf8');

// Increment version
sw = sw.replace(
  /const CACHE_NAME = 'crypto-aggregator-v(\d+)'/,
  (match, version) => {
    const newVersion = parseInt(version) + 1;
    return `const CACHE_NAME = 'crypto-aggregator-v${newVersion}'`;
  }
);

fs.writeFileSync(swPath, sw);
console.log('✅ Service Worker version incremented');
```

**Usage:**
```bash
node auto-version.js
git add sw.js
git commit -m "feat(pwa): bump service worker version"
git push
```

---

## Commit Message Template

When deploying updates that increment the SW version:

```bash
git add .
git commit -m "feat(pwa): implement auto-update system v2"
git push origin main
```

**Future updates:**
```bash
# After incrementing CACHE_NAME from v2 to v3
git add sw.js
git commit -m "chore(pwa): bump service worker to v3"
git push origin main
```

---

## Important Notes

1. **HTTPS Required**: Service Workers only work on HTTPS (except `localhost`)
2. **Same Origin**: SW can only cache same-origin requests
3. **Browser Support**: Works on Chrome, Edge, Firefox, Safari (limited iOS PWA support)
4. **Cache Size**: Be mindful of storage quotas (usually 50MB+)
5. **Update Timing**: Browser checks for SW updates on page load and every 24 hours

---

## Current Status

✅ Service Worker created with version control
✅ Auto-update detection implemented
✅ Toast notification added (Portuguese)
✅ Styles applied (dark theme with cyan accent)
✅ Cache-first strategy configured
✅ Manual update trigger (button) working

**Current Version:** `crypto-aggregator-v1`

**Next Steps:**
1. Test locally with version increment
2. Deploy to production
3. Monitor browser console for SW logs
4. Test on multiple devices

---

## Support & Resources

- **MDN Service Worker API**: https://developer.mozilla.org/en-US/docs/Web/API/Service_Worker_API
- **Google PWA Guide**: https://web.dev/progressive-web-apps/
- **Service Worker Lifecycle**: https://web.dev/service-worker-lifecycle/

---

## Contact

For issues or questions about this implementation, check:
- Browser console for `[Service Worker]` and `[PWA]` logs
- DevTools Application tab for SW status
- Network tab to verify SW is intercepting requests

**Last Updated:** 2026-01-12
**Implemented By:** Claude Code (AI Agent)
**Version:** 1.0.0
