# VERSION UPDATE UTILITY - PowerShell Version
# Automatically updates version.json

param(
    [Parameter(Mandatory=$false)]
    [string]$VersionType = "",

    [Parameter(ValueFromRemainingArguments=$true)]
    [string[]]$Changes = @()
)

function Write-ColorOutput {
    param([string]$Message, [string]$Color = "White")
    Write-Host $Message -ForegroundColor $Color
}

function Get-IncrementedVersion {
    param([string]$CurrentVersion, [string]$Type)

    $parts = $CurrentVersion.Split('.') | ForEach-Object { [int]$_ }

    switch ($Type) {
        "major" { return "$($parts[0] + 1).0.0" }
        "minor" { return "$($parts[0]).$($parts[1] + 1).0" }
        "patch" { return "$($parts[0]).$($parts[1]).$($parts[2] + 1)" }
        default { return $Type }
    }
}

# Read current version
$versionFile = Join-Path $PSScriptRoot "version.json"

if (-not (Test-Path $versionFile)) {
    Write-ColorOutput "Error: version.json not found!" "Red"
    exit 1
}

$versionData = Get-Content $versionFile -Raw | ConvertFrom-Json

# Show current version if no arguments
if ([string]::IsNullOrEmpty($VersionType)) {
    Write-ColorOutput "`nCurrent version: $($versionData.version)" "Cyan"
    Write-ColorOutput "`nUsage:" "Yellow"
    Write-ColorOutput "  .\update-version.ps1 [version] [changes...]" "White"
    Write-ColorOutput "`nExamples:" "Yellow"
    Write-ColorOutput "  .\update-version.ps1 patch 'Bug fixes'" "White"
    Write-ColorOutput "  .\update-version.ps1 minor 'New features'" "White"
    Write-ColorOutput "  .\update-version.ps1 major 'Breaking changes'" "White"
    Write-ColorOutput "  .\update-version.ps1 1.2.3 'Custom version'`n" "White"
    exit 0
}

# Calculate new version
$newVersion = Get-IncrementedVersion -CurrentVersion $versionData.version -Type $VersionType

# Prepare changes
$changesList = if ($Changes.Count -gt 0) { $Changes } else { @("Version updated") }

# Create updated data
$updatedData = @{
    version = $newVersion
    buildDate = (Get-Date).ToUniversalTime().ToString("yyyy-MM-ddTHH:mm:ss.fffZ")
    changes = $changesList
}

# Write to file
try {
    $updatedData | ConvertTo-Json -Depth 10 | Set-Content -Path $versionFile -Encoding UTF8

    Write-ColorOutput "`nVersion updated successfully!" "Green"
    Write-ColorOutput "   $($versionData.version) -> $newVersion" "White"
    Write-ColorOutput "`nChanges:" "Cyan"
    foreach ($change in $changesList) {
        Write-ColorOutput "   - $change" "White"
    }
    Write-ColorOutput ""
} catch {
    Write-ColorOutput "Error writing version.json" "Red"
    Write-Error $_
    exit 1
}
