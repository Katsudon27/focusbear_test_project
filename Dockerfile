FROM node:20-alpine

WORKDIR /usr/src/app

# Install dependencies
COPY package*.json ./
RUN npm ci -f

# Copy source code
COPY . .

# Build the app
RUN npm run build

# Expose the app port (adjust if needed)
EXPOSE 3000

# Start the app
CMD ["npm", "run", "start:prod"]