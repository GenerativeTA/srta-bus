$WshShell = New-Object -ComObject WScript.Shell
$startupPath = [System.IO.Path]::Combine($env:APPDATA, 'Microsoft\Windows\Start Menu\Programs\Startup\SRTA Bus Server.lnk')
$Shortcut = $WshShell.CreateShortcut($startupPath)
$Shortcut.TargetPath = 'pythonw.exe'
$Shortcut.Arguments = '"G:\My Drive\Agents\SRTA Bus\iphone\serve.pyw"'
$Shortcut.WorkingDirectory = 'G:\My Drive\Agents\SRTA Bus\iphone'
$Shortcut.Save()
Write-Host "Startup shortcut created at: $startupPath"
