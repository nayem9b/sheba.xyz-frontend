# -------- Stage 1: Builder --------
FROM node:18-alpine AS builder

ENV NODE_ENV=production

WORKDIR /myapp

# Only copy lock + manifest files to leverage build cache
COPY package.json yarn.lock ./

# Install dependencies (frozen, silent, no cache)
RUN yarn install --frozen-lockfile --non-interactive --no-progress --prefer-offline

# Copy only required app files for build
COPY . .

# Build static production assets
RUN yarn build && yarn install --production --ignore-scripts --prefer-offline --non-interactive


# -------- Stage 2: Runtime (Distilled) --------
FROM node:18-alpine AS runner

# Create and use a non-root user
RUN addgroup -S nodejs && adduser -S nodejs -G nodejs
USER nodejs

WORKDIR /myapp
ENV NODE_ENV=production

# Copy only minimal runtime artifacts
COPY --from=builder /myapp/.next ./.next
COPY --from=builder /myapp/public ./public
COPY --from=builder /myapp/package.json ./package.json
COPY --from=builder /myapp/node_modules ./node_modules

# Optional: aggressively strip unnecessary data
RUN rm -rf \
    node_modules/**/*.md \
    node_modules/**/docs \
    node_modules/**/test \
    node_modules/**/tests \
    node_modules/**/example* \
    node_modules/**/benchmark* \
    && yarn cache clean --mirror \
    && find . -type f -name "*.map" -delete

EXPOSE 5000

CMD ["yarn", "start"]
