# PowerShell script to add KYC badges to remaining cards

$file = "index.html"
$content = Get-Content $file -Raw

# Cold Wallets - KYC Free (Ledger, Trezor)
$content = $content -replace '(<!-- Ledger -->.*?<div class="rating-badge">.*?</div>)(\s*<div class="card-content">)', '$1`n                                <div class="kyc-badge kyc-free">SEM KYC</div>$2'
$content = $content -replace '(<!-- Trezor -->.*?<div class="rating-badge">.*?</div>)(\s*<div class="card-content">)', '$1`n                                <div class="kyc-badge kyc-free">SEM KYC</div>$2'

# DEXs - KYC Free (Uniswap, Jupiter, Meteora, PancakeSwap)
$content = $content -replace '(<!-- Uniswap -->.*?<div class="rating-badge">.*?</div>)(\s*<div class="card-content">)', '$1`n                                <div class="kyc-badge kyc-free">SEM KYC</div>$2'
$content = $content -replace '(<!-- Jupiter -->.*?<div class="rating-badge">.*?</div>)(\s*<div class="card-content">)', '$1`n                                <div class="kyc-badge kyc-free">SEM KYC</div>$2'
$content = $content -replace '(<!-- Meteora -->.*?<div class="rating-badge">.*?</div>)(\s*<div class="card-content">)', '$1`n                                <div class="kyc-badge kyc-free">SEM KYC</div>$2'
$content = $content -replace '(<!-- PancakeSwap -->.*?<div class="rating-badge">.*?</div>)(\s*<div class="card-content">)', '$1`n                                <div class="kyc-badge kyc-free">SEM KYC</div>$2'

# Bridges - KYC Free (SideShift, Jumper, FixedFloat, Layerswap)
$content = $content -replace '(<!-- SideShift -->.*?<div class="rating-badge">.*?</div>)(\s*<div class="card-content">)', '$1`n                                <div class="kyc-badge kyc-free">SEM KYC</div>$2'
$content = $content -replace '(<!-- Jumper -->.*?<div class="rating-badge">.*?</div>)(\s*<div class="card-content">)', '$1`n                                <div class="kyc-badge kyc-free">SEM KYC</div>$2'
$content = $content -replace '(<!-- FixedFloat -->.*?<div class="rating-badge">.*?</div>)(\s*<div class="card-content">)', '$1`n                                <div class="kyc-badge kyc-free">SEM KYC</div>$2'
$content = $content -replace '(<!-- Layerswap -->.*?<div class="rating-badge">.*?</div>)(\s*<div class="card-content">)', '$1`n                                <div class="kyc-badge kyc-free">SEM KYC</div>$2'

Set-Content $file $content -NoNewline

Write-Host "KYC badges added successfully!"
