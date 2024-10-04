@echo off
echo Starting all NestJS services...

start /B npm run start --prefix apps/api-gateway
start /B npm run start --prefix apps/user-service
start /B npm run start --prefix apps/quiz-service
start /B npm run start --prefix apps/question-service
start /B npm run start --prefix apps/game-service
start /B npm run start --prefix apps/notification-service

echo All services have been started.
pause
