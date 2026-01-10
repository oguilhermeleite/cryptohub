# 🚀 Quick Start - Sistema de Auto-Atualização

## Como Usar (Simples e Rápido)

### 1. Fazer Mudanças no Código
Edite qualquer arquivo (HTML, CSS, JS, etc.)

### 2. Atualizar Versão

**Opção A - PowerShell (Windows):**
```powershell
# Correção de bug (1.0.0 -> 1.0.1)
.\update-version.ps1 patch "Bug fix description"

# Nova feature (1.0.0 -> 1.1.0)
.\update-version.ps1 minor "New feature description"

# Mudança grande (1.0.0 -> 2.0.0)
.\update-version.ps1 major "Breaking changes"
```

**Opção B - Editar Manualmente:**
Abra `version.json` e mude o número da versão:
```json
{
  "version": "1.0.1",
  "buildDate": "2025-01-10T15:30:00.000Z",
  "changes": ["Bug fixes"]
}
```

### 3. Deploy/Upload
Faça upload dos arquivos para o servidor

### 4. Pronto!
Os usuários verão uma notificação automática:
```
🚀 Nova versão disponível!
Versão 1.0.1 está pronta
[Atualizar Agora]
```

## O Que Foi Implementado

✅ **Detecção automática** de novas versões a cada 60 segundos
✅ **Notificação elegante** no canto superior direito
✅ **Auto-atualização** após 10 segundos (ou imediata se usuário clicar)
✅ **Cache busting** completo - limpa todo cache do navegador
✅ **Service Worker** gerenciado automaticamente
✅ **Funciona em mobile** e desktop

## Arquivos Criados

```
version.json           - Versão atual do site
auto-update.js         - Sistema de detecção e atualização
auto-update.css        - Estilo da notificação
update-version.ps1     - Script PowerShell (Windows)
update-version.js      - Script Node.js (alternativo)
UPDATE_GUIDE.md        - Guia completo (este arquivo)
```

## Exemplo Real de Uso

```powershell
# Você corrigiu um bug no tema claro
.\update-version.ps1 patch "Fixed light theme description visibility"

# Output:
# Version updated successfully!
#    1.0.0 -> 1.0.1
# Changes:
#    - Fixed light theme description visibility

# Agora faça upload para o servidor
# Usuários verão notificação automaticamente!
```

## Benefícios

- ❌ **Antes:** Usuários tinham que fazer Ctrl+Shift+R
- ✅ **Agora:** Notificação automática + atualização suave

- ❌ **Antes:** Cache antigo causava problemas
- ✅ **Agora:** Cache é limpo automaticamente

- ❌ **Antes:** Difícil saber se usuário está na versão mais recente
- ✅ **Agora:** Sistema garante que todos recebem updates

## Dúvidas?

Veja o guia completo em `UPDATE_GUIDE.md`
