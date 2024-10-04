#!/bin/bash

docker build -f apps/api-gateway/Dockerfile -t chutientrong/quiz-app-api .
docker push chutientrong/quiz-app-api
docker build -f apps/background-job/Dockerfile -t chutientrong/quiz-app-background-job .
docker push chutientrong/quiz-app-background-job

