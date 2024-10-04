Write-Host "Starting all NestJS services..."

Start-Process npm -ArgumentList "run start --prefix apps/api-gateway"
Start-Process npm -ArgumentList "run start --prefix apps/user-service"
Start-Process npm -ArgumentList "run start --prefix apps/quiz-service"
Start-Process npm -ArgumentList "run start --prefix apps/question-service"
Start-Process npm -ArgumentList "run start --prefix apps/game-service"
Start-Process npm -ArgumentList "run start --prefix apps/notification-service"

Write-Host "All services have been started."
