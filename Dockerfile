# Stage 1: Build Angular app
FROM node:18 AS build

WORKDIR /app

# Copy package.json and package-lock.json
COPY package*.json ./

# Install npm dependencies properly
RUN npm install --legacy-peer-deps

# Install Angular CLI (if needed)
RUN npm install -g @angular/cli

# Copy the Angular source code
COPY . .

# Ensure dependencies are installed inside the container
RUN npm ci --legacy-peer-deps

# Build the Angular app
RUN npm run build --configuration=production

# Stage 2: Serve Angular app using Nginx
# FROM nginx:alpine
FROM nginxinc/nginx-unprivileged

# Remove default Nginx config
# RUN rm -rf /usr/share/nginx/html/*

RUN rm /etc/nginx/conf.d/default.conf
COPY docker/nginx/default.conf /etc/nginx/conf.d/
COPY docker/nginx/405.html /usr/share/nginx/html

# Copy built Angular files from previous stage
COPY --from=build /app/dist/rihal-codestacker-fe/browser /usr/share/nginx/html

# Expose port 4100
EXPOSE 4100

# Start Nginx server
CMD ["nginx", "-g", "daemon off;"]