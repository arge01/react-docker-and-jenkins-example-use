FROM node:18
ENV NODE_ENV development

# Add a work directory
WORKDIR /movies-app

# Cache and Install dependencies
COPY package.json .
COPY yarn.lock .
COPY .husky .
COPY .env .

COPY .eslintrc.cjs .
COPY .prettierrc.json .
COPY tsconfig.json .
COPY tsconfig.node.json .
COPY vite.config.ts .

COPY public/ ./public/
COPY src/ ./src/

RUN yarn install

# Copy app files
COPY . .
# Expose port

RUN yarn build

EXPOSE 3000
# Start the app
CMD [ "npx", "serve", "dist" ]