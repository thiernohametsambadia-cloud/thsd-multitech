Write-Host "=== THSD Multitech - Démarrage ===" -ForegroundColor Cyan

Write-Host "[0/3] Démarrage de MySQL (port 3306)..." -ForegroundColor Yellow
$mysql = Start-Process -FilePath "C:\Program Files\MySQL\MySQL Server 8.4\bin\mysqld.exe" -ArgumentList "--datadir=C:\ProgramData\MySQL\MySQL Server 8.4\Data", "--port=3306" -WindowStyle Hidden -PassThru
Start-Sleep -Seconds 3

Write-Host "[1/3] Démarrage du backend (port 5000)..." -ForegroundColor Yellow
$backend = Start-Process -FilePath "node" -WorkingDirectory "$PSScriptRoot\server" -ArgumentList "index.js" -WindowStyle Hidden -PassThru
Start-Sleep -Seconds 3

Write-Host "[2/3] Démarrage du frontend (port 5174)..." -ForegroundColor Yellow
$frontend = Start-Process -FilePath "$PSScriptRoot\client\node_modules\.bin\vite.cmd" -WorkingDirectory "$PSScriptRoot\client" -ArgumentList "--host", "--port", "5174" -WindowStyle Hidden -PassThru

Start-Sleep -Seconds 3

Write-Host ""
Write-Host "=== Services démarrés ===" -ForegroundColor Green
Write-Host "Frontend : http://localhost:5174" -ForegroundColor Cyan
Write-Host "Backend  : http://localhost:5000" -ForegroundColor Cyan
Write-Host "Admin    : http://localhost:5174/login" -ForegroundColor Cyan
Write-Host ""
Write-Host "Identifiants admin :" -ForegroundColor Yellow
Write-Host "  Email    : admin@thsd-multitech.com" -ForegroundColor White
Write-Host "  Mot passe: admin123" -ForegroundColor White
Write-Host ""
Write-Host "Appuyez sur une touche pour arrêter les serveurs..."
$null = $Host.UI.RawUI.ReadKey("NoEcho,IncludeKeyUp")

Write-Host "Arrêt des serveurs..." -ForegroundColor Red
Stop-Process -Id $mysql.Id -Force -ErrorAction SilentlyContinue
Stop-Process -Id $backend.Id -Force -ErrorAction SilentlyContinue
Stop-Process -Id $frontend.Id -Force -ErrorAction SilentlyContinue
Write-Host "Serveurs arrêtés." -ForegroundColor Green
