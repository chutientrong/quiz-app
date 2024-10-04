#!/bin/bash
echo "Starting all NestJS services..."

npm run start --prefix apps/api-gateway &
npm run start --prefix apps/user-service &
npm run start --prefix apps/quiz-service &
npm run start --prefix apps/question-service &
npm run start --prefix apps/game-service &
npm run start --prefix apps/notification-service &

wait # Wait for all background processes to finish
echo "All services have been started."
