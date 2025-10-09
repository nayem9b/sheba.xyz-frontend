# -------- Stage 1: Builder --------
FROM node:18-alpine AS builder

WORKDIR /myapp

# Copy dependency files
COPY package.json yarn.lock ./

# Install ALL dependencies (including devDeps)
RUN yarn install --frozen-lockfile --non-interactive --no-progress

# Copy source code
COPY . .

# Build the Next.js app
RUN yarn build

# Now prune to production-only modules
RUN yarn install --production --ignore-scripts --prefer-offline --non-interactive && yarn cache clean


# -------- Stage 2: Runtime --------
FROM node:18-alpine AS runner

# Create non-root user
RUN addgroup -S nodejs && adduser -S nodejs -G nodejs
USER nodejs

WORKDIR /myapp
ENV NODE_ENV=production

# Copy minimal runtime artifacts
COPY --from=builder /myapp/.next ./.next
COPY --from=builder /myapp/public ./public
COPY --from=builder /myapp/package.json ./package.json
COPY --from=builder /myapp/node_modules ./node_modules
COPY --from=builder /myapp/next.config.js ./next.config.js

# Optional: aggressively strip unnecessary files
RUN find . -type f -name "*.map" -delete \
    && find node_modules -type d \( -name "test" -o -name "tests" -o -name "docs" -o -name "example*" \) -exec rm -rf {} + || true

EXPOSE 5000

CMD ["yarn", "start"]
