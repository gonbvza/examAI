# Use a lightweight Node image
FROM node:alpine

# Set working directory
WORKDIR ./client

# Copy package files first (for better caching)
COPY ./package*.json ./

# Install dependencies
RUN npm install

# Copy the rest of the frontend code
COPY . .

# Start the development server
CMD ["npm", "run", "build"]

