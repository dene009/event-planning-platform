FROM node:18.0.0-alpine

# Set the working directory
WORKDIR /usr/src/app

# Copy package files first for caching purposes
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the rest of the application code
COPY . .

# Expose the frontend port
EXPOSE 5173

# Start the application
CMD ["npm", "start"]

