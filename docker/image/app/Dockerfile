# Install dependencies only when needed
FROM node:20-alpine AS deps
# Check https://github.com/nodejs/docker-node/tree/b4117f9333da4138b03a546ec926ef50a31506c3#nodealpine to understand why libc6-compat might be needed.
RUN apk add --no-cache libc6-compat
WORKDIR /app
COPY src/package.json src/yarn.lock ./
RUN yarn install --frozen-lockfile

# Rebuild the source code only when needed
FROM node:20-alpine AS builder
ARG NEXT_PUBLIC_EXT_API_URL
ARG NEXT_PUBLIC_EXT_X_API_HEADER
ARG buildVersion
ARG THEME="novataris"
ENV NEXT_PUBLIC_BUILD_VERSION=$buildVersion
ENV THEME=$THEME
WORKDIR /app
COPY src/. .
# Must add a .gitignore file with node_modules to ensure tailwind doesn't scan node_modules for classNames during build.
RUN echo "node_modules/" >> .gitignore
COPY --from=deps /app/node_modules ./node_modules
RUN yarn build && yarn install --production --ignore-scripts --prefer-offline

# Production image, copy all the files and run next
FROM node:20-alpine AS runner

# add a specific non-root user for executing the application
RUN addgroup -g 1001 -S nodejs
RUN adduser -S nextjs -u 1001

# copy the scripts to a folder on the path
COPY docker/image/app/scripts/. /usr/local/bin/

# You only need to copy next.config.js if you are NOT using the default configuration
WORKDIR /app
COPY --from=builder /app/next.config.js ./
COPY --from=builder /app/next-i18next.config.js ./next-i18next.config.js
COPY --from=builder --chown=nextjs:nodejs /app/public ./public
COPY --from=builder --chown=nextjs:nodejs /app/.next ./.next
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/package.json ./package.json
COPY --from=builder --chown=nextjs:nodejs /app/themes ./themes
RUN touch .env
RUN chown nextjs:nodejs /app/.env
RUN chown nextjs:nodejs /app 


# switch away from root
USER nextjs

ENV NEXT_TELEMETRY_DISABLED 1
ENV NODE_ENV production
EXPOSE 3000
ENTRYPOINT [ "custom-docker-entrypoint.sh" ]
CMD ["yarn", "start"]