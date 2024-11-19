# Build stage
FROM node:18-alpine as build

WORKDIR /app

RUN pwd

# Copy necessary files for installing dependencies and building
COPY package.json ./
COPY package-lock.json ./ 
COPY tsconfig.json ./
COPY src ./src/
#COPY .env ./

RUN ls -la

# Install dependencies
RUN npm install

# install rimraf
RUN npm install rimraf -g

# Generate Prisma client
#RUN npx prisma generate




# Build the application
RUN npm run build


## Stage two: Run the app
FROM node:18-alpine as production

WORKDIR /app

# Copy built application from the build stage
COPY --from=build /app/build ./build
#COPY --from=build /app/.env ./
#COPY --from=build /app/prisma ./prisma
COPY --from=build /app/package.json ./
COPY --from=build /app/package-lock.json ./

# Copy the generated Prisma client from the build stage
COPY --from=build /app/node_modules ./node_modules

# Install PM2 globally
RUN npm install pm2 -g

# Expose the port your app uses
EXPOSE 5000

# Start the application with PM2
CMD ["pm2-runtime", "./build/index.js"]