# Use an official Node runtime as the base image
FROM node:18

# Set working directory for backend
WORKDIR /backend

# Copy backend package.json and package-lock.json
COPY package*.json ./

# Install backend dependencies
RUN npm install

# Copy the rest of the application code
COPY . .

# Expose ports (if needed)
EXPOSE 8081

# Command to run your application
CMD ["npm", "start"]
