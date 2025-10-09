# -------- Stage 1: Builder --------
FROM node:18-alpine AS builder

# Set working directory
WORKDIR /myapp

# Copy dependency files first (for better caching)
COPY package.json yarn.lock ./

# Install dependencies
RUN yarn install --frozen-lockfile

# Copy rest of the application
COPY . .

# Build Next.js app
RUN yarn build


# -------- Stage 2: Production Runtime --------
FROM node:18-alpine AS runner

# Set working directory
WORKDIR /myapp

# Copy only essential files from builder
COPY --from=builder /myapp/package.json ./
COPY --from=builder /myapp/yarn.lock ./
COPY --from=builder /myapp/.next ./.next
COPY --from=builder /myapp/public ./public
COPY --from=builder /myapp/node_modules ./node_modules
COPY --from=builder /myapp/next.config.js ./

# Expose app port
EXPOSE 5000

# Run the production server
CMD ["yarn", "run", "start"]
