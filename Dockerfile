# Use the latest Node.js Alpine image as the base image
FROM node:alpine

# Set the working directory
WORKDIR /usr/src/app

# Copy package.json and package-lock.json
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the rest of the application code
COPY . .

# Expose the port the app runs on
EXPOSE 4000

# Set environment variables
ENV PORT=4000
ENV DB_CONNECT=mongodb://mongodb:27017/menuManagement
ENV DB_NAME=menuManagement

# Start the application
CMD ["npm", "start"]
