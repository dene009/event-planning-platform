# syntax=docker/dockerfile:1

# Use a Node.js image
FROM node:18.0.0-alpine AS base

# Set the working directory
WORKDIR /usr/src/app

# Copy package.json and package-lock.json
COPY package.json package-lock.json ./

# Install dependencies, including concurrently
RUN npm install

# If concurrently is a global dependency
RUN npm install -g concurrently

# Copy the rest of the application
COPY . .

# Install dependencies for frontend
WORKDIR /usr/src/app/eventbridge
RUN npm install

# Install dependencies for backend
WORKDIR /usr/src/app/backend
RUN npm install

# Expose the required ports
EXPOSE 5173 5001

# Start the application
CMD ["npm", "start"]

FROM base as prod
RUN --mount=type=bind,source=package.json,target=package.json \
    --mount=type=bind,source=package-lock.json,target=package-lock.json \
    --mount=type=cache,target=/root/.npm \
    npm ci --omit=dev
USER node
COPY . .
CMD node src/index.js

# Define the test stage
FROM base as test
ENV NODE_ENV=test
RUN --mount=type=bind,source=package.json,target=package.json \
    --mount=type=bind,source=package-lock.json,target=package-lock.json \
    --mount=type=cache,target=/root/.npm \
    npm ci --include=dev
USER node
COPY . .
CMD ["npm", "run", "test"]