# Шаг 1: Сборка приложения
FROM node:18-alpine AS builder

# Установка системных зависимостей для сборки
RUN apk add --no-cache \
    git \
    python3 \
    make \
    g++ \
    pkgconfig \
    cairo-dev \
    pango-dev \
    libjpeg-turbo-dev \
    giflib-dev

# Создание рабочей директории
WORKDIR /app

# Копируем файлы зависимостей
COPY package*.json ./
COPY prisma ./prisma/

# Устанавливаем зависимости (включая dev)
RUN npm ci

# Копируем все файлы проекта
COPY . .

# Собираем приложение
RUN npm run build

# Шаг 2: Продакшен образ
FROM node:18-alpine

WORKDIR /app

# Установка runtime зависимостей
RUN apk add --no-cache \
    cairo \
    pango \
    libjpeg-turbo \
    giflib \
    bash \
    openssl

# Копируем артефакты сборки
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/dist ./dist
COPY --from=builder /app/package*.json ./
COPY --from=builder /app/prisma ./prisma
COPY --from=builder /app/generated ./generated
# Экспонируем порт
EXPOSE 3000

# Команда запуска приложения
CMD ["npm", "run", "start:prod"]