# Use an official Node runtime as a parent image
FROM node:20-alpine

# Set the working directory to /app
WORKDIR /app

# Copy package.json and package-lock.json for dependency installation
COPY package*.json ./

# Install project dependencies
RUN npm install --legacy-peer-deps

# Copy the rest of the application code
COPY . .

# Expose the port Vite runs on
EXPOSE 5173

# Start the Vite development server, binding to all interfaces to allow external access
CMD ["npm", "run", "dev"]
