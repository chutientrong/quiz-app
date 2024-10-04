# Install Stage
FROM node:18-alpine AS install

# Set the working directory
WORKDIR /app

# Copy package.json
COPY package*.json ./

# Install dependencies using Yarn
RUN yarn install --only=production
RUN yarn add sharp --ignore-engines

# Prebuild Stage
FROM node:18-alpine AS prebuild

# Set the working directory
WORKDIR /app

# Copy the installed node_modules from the install stage
COPY --from=install /app/node_modules ./node_modules

# Copy the whole project directory into the container
COPY ../../ ./

RUN cp apps/api-gateway/.env.deployment.example apps/api-gateway/.env
RUN cp apps/user-service/.env.deployment.example apps/user-service/.env
RUN cp apps/quiz-service/.env.deployment.example apps/quiz-service/.env
RUN cp apps/question-service/.env.deployment.example apps/question-service/.env
RUN cp apps/game-service/.env.deployment.example apps/game-service/.env
RUN cp apps/notification-service/.env.deployment.example apps/notification-service/.env
# RUN cp apps/background-job/.env.deployment.example apps/background-job/.env
RUN cp .env.deployment.example .env

# Build the projects
RUN yarn build api-gateway
RUN yarn build user-service
RUN yarn build quiz-service
RUN yarn build question-service
RUN yarn build game-service
RUN yarn build notification-service
# RUN yarn build background-job
RUN yarn build common

# Production Stage
FROM node:18-alpine AS production

# Set the working directory
WORKDIR /app

# Copy the built files from the prebuild stage
COPY --from=prebuild /app/dist ./dist
COPY --from=prebuild /app/node_modules ./node_modules
COPY --from=prebuild /app/package.json ./package.json
COPY --from=prebuild /app/apps/api-gateway/.env ./apps/api-gateway/.env
COPY --from=prebuild /app/apps/user-service/.env ./apps/user-service/.env
COPY --from=prebuild /app/apps/quiz-service/.env ./apps/quiz-service/.env
COPY --from=prebuild /app/apps/question-service/.env ./apps/question-service/.env
COPY --from=prebuild /app/apps/game-service/.env ./apps/game-service/.env
COPY --from=prebuild /app/apps/notification-service/.env ./apps/notification-service/.env

# COPY --from=prebuild /app/apps/background-job/.env ./apps/background-job/.env
COPY --from=prebuild /app/.env ./.env

# Expose port 8080 to be accessible from outside the container
EXPOSE 8080

# Define the command to run the application
CMD ["yarn", "run", "start:prod-api"]
