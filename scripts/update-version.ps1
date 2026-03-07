# SCRIPT POWERSHELL DE ATUALIZAÇÃO DE VERSÃO
#
# Este script atualiza automaticamente o version.json sempre que você faz deploy
#
# USO:
# .\update-version.ps1 [major|minor|patch]
#
# Exemplos:
# .\update-version.ps1 patch  -> 1.0.10 → 1.0.11
# .\update-version.ps1 minor  -> 1.0.10 → 1.1.0
# .\update-version.ps1 major  -> 1.0.10 → 2.0.0

param(
    [Parameter(Position=0)]
    [ValidateSet('major', 'minor', 'patch')]
    [string]$UpdateType = 'patch'
)

$versionFile = Join-Path $PSScriptRoot "version.json"

# Lê o arquivo version.json
try {
    $versionData = Get-Content $versionFile -Raw | ConvertFrom-Json
} catch {
    Write-Error "Erro ao ler version.json: $_"
    exit 1
}

# Parse da versão atual
$currentVersion = $versionData.version
$versionParts = $currentVersion -split '\.'
$major = [int]$versionParts[0]
$minor = [int]$versionParts[1]
$patch = [int]$versionParts[2]

# Calcula nova versão
switch ($UpdateType) {
    'major' {
        $newVersion = "$($major + 1).0.0"
    }
    'minor' {
        $newVersion = "$major.$($minor + 1).0"
    }
    'patch' {
        $newVersion = "$major.$minor.$($patch + 1)"
    }
}

# Pega o hash do último commit
try {
    $gitHash = git rev-parse --short HEAD
} catch {
    $gitHash = "unknown"
}

# Atualiza os dados
$versionData.version = $newVersion
$versionData.buildDate = (Get-Date).ToUniversalTime().ToString("yyyy-MM-ddTHH:mm:ssZ")
$versionData.hash = $gitHash.Trim()
$versionData.forceUpdate = $true

# Salva o arquivo
try {
    $versionData | ConvertTo-Json | Set-Content $versionFile -Encoding UTF8

    Write-Host "Versao atualizada com sucesso!" -ForegroundColor Green
    Write-Host "   Versao anterior: $currentVersion" -ForegroundColor Gray
    Write-Host "   Nova versao: $newVersion" -ForegroundColor Cyan
    Write-Host "   Hash: $($gitHash.Trim())" -ForegroundColor Gray
    Write-Host "   Data: $($versionData.buildDate)" -ForegroundColor Gray
} catch {
    Write-Error "Erro ao salvar version.json: $_"
    exit 1
}
