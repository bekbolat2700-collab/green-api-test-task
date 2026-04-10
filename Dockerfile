# Stage 1: Сборка
FROM alpine:latest as builder
WORKDIR /app
COPY . .

# Stage 2: Финальный образ
FROM nginx:alpine
COPY --from=builder /app /usr/share/nginx/html

EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
