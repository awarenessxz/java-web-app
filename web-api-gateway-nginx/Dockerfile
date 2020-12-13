# Get nginx base image
FROM nginx:latest

# Set Environment
ENV APP_PORT=9090

# Delete default config files and copy our config files
RUN rm /etc/nginx/nginx.conf
COPY reverse_proxy/config/nginx.conf /etc/nginx/nginx.conf

# Add Health Check
HEALTHCHECK --interval=30s --timeout=3s --start-period=5s --retries=3 \
    CMD curl -s -f http://localhost:${APP_PORT}/health || exit 1

# Expose port
EXPOSE ${APP_PORT}
