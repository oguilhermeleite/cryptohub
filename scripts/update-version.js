#!/usr/bin/env node

/**
 * VERSION UPDATE UTILITY
 * Automatically updates version.json with new version number
 *
 * Usage:
 * node update-version.js [version] [changes...]
 *
 * Examples:
 * node update-version.js 1.0.1 "Bug fixes"
 * node update-version.js 1.1.0 "New features added" "Performance improvements"
 * node update-version.js patch "Quick fix"
 * node update-version.js minor "New feature"
 * node update-version.js major "Breaking changes"
 */

const fs = require('fs');
const path = require('path');

// Colors for terminal output
const colors = {
    reset: '\x1b[0m',
    bright: '\x1b[1m',
    green: '\x1b[32m',
    yellow: '\x1b[33m',
    blue: '\x1b[34m',
    red: '\x1b[31m'
};

function log(message, color = 'reset') {
    console.log(`${colors[color]}${message}${colors.reset}`);
}

function incrementVersion(currentVersion, type) {
    const parts = currentVersion.split('.').map(Number);

    switch (type) {
        case 'major':
            return `${parts[0] + 1}.0.0`;
        case 'minor':
            return `${parts[0]}.${parts[1] + 1}.0`;
        case 'patch':
            return `${parts[0]}.${parts[1]}.${parts[2] + 1}`;
        default:
            return type; // Assume it's a full version number
    }
}

function updateVersion() {
    const versionFile = path.join(__dirname, 'version.json');

    // Read current version
    let versionData;
    try {
        const fileContent = fs.readFileSync(versionFile, 'utf8');
        versionData = JSON.parse(fileContent);
    } catch (error) {
        log('❌ Error reading version.json', 'red');
        console.error(error);
        process.exit(1);
    }

    // Get arguments
    const args = process.argv.slice(2);

    if (args.length === 0) {
        log('📦 Current version: ' + versionData.version, 'blue');
        log('\nUsage:', 'yellow');
        log('  node update-version.js [version] [changes...]', 'reset');
        log('\nExamples:', 'yellow');
        log('  node update-version.js patch "Bug fixes"', 'reset');
        log('  node update-version.js minor "New features"', 'reset');
        log('  node update-version.js major "Breaking changes"', 'reset');
        log('  node update-version.js 1.2.3 "Custom version"', 'reset');
        process.exit(0);
    }

    const versionArg = args[0];
    const changes = args.slice(1);

    // Calculate new version
    const newVersion = incrementVersion(versionData.version, versionArg);

    // Update version data
    const updatedData = {
        version: newVersion,
        buildDate: new Date().toISOString(),
        changes: changes.length > 0 ? changes : ['Version updated']
    };

    // Write to file
    try {
        fs.writeFileSync(
            versionFile,
            JSON.stringify(updatedData, null, 2) + '\n',
            'utf8'
        );

        log('\n✅ Version updated successfully!', 'green');
        log(`   ${versionData.version} → ${newVersion}`, 'bright');
        log('\n📝 Changes:', 'blue');
        updatedData.changes.forEach(change => {
            log(`   • ${change}`, 'reset');
        });
        log(''); // Empty line
    } catch (error) {
        log('❌ Error writing version.json', 'red');
        console.error(error);
        process.exit(1);
    }
}

// Run the update
updateVersion();
