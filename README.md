# Weather on the Map

## Технологии

- **Next.js** — современный фреймворк для React, обеспечивающий серверный рендеринг и удобную структуру проекта.
- **React** — библиотека для построения пользовательских интерфейсов.
- **Leaflet** — популярная библиотека для работы с интерактивными картами.
- **OpenWeatherMap API** — сервис для получения данных о погоде.
- **OpenStreetMap Nominatim** — сервис для обратного геокодирования (определения названия города по координатам).

A web application that allows users to click on a map and instantly get the current weather for any location. Built with Next.js, React, and Leaflet, it uses OpenWeatherMap for weather data and OpenStreetMap Nominatim for reverse geocoding.

## Features
- Interactive map: click anywhere to get weather info
- Weather details: temperature, description, feels like, icon
- City name detection via reverse geocoding

## How to Run (English)

1. **Install dependencies:**
   ```bash
   npm install
   ```
2. **Set up environment variables:**
   - Create a `.env.local` file in the root directory.
   - Add your OpenWeatherMap API key:
     ```env
     OPENWEATHER_API_KEY=your_api_key_here
     ```
3. **Start the development server:**
   ```bash
   npm run dev
   ```
4. **Open your browser:**
   - Go to [http://localhost:3000](http://localhost:3000)

---

# Погода на карте

Веб-приложение, позволяющее пользователям кликать по карте и мгновенно получать текущую погоду в любой точке мира. Построено на Next.js, React и Leaflet, использует OpenWeatherMap для данных о погоде и Nominatim OpenStreetMap для обратного геокодирования.

## Возможности
- Интерактивная карта: кликните в любую точку, чтобы узнать погоду
- Детали погоды: температура, описание, ощущается как, иконка
- Определение города через обратное геокодирование

## Как запустить (на русском)

1. **Установите зависимости:**
   ```bash
   npm install
   ```
2. **Настройте переменные окружения:**
   - Создайте файл `.env.local` в корне проекта.
   - Добавьте ваш API-ключ OpenWeatherMap:
     ```env
     OPENWEATHER_API_KEY=ваш_api_ключ_здесь
     ```
3. **Запустите сервер разработки:**
   ```bash
   npm run dev
   ```
4. **Откройте браузер:**
   - Перейдите по адресу [http://localhost:3000](http://localhost:3000)
