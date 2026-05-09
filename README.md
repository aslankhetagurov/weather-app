# 🌤️ Weathery — погодное приложение

[![React](https://img.shields.io/badge/React-19-61DAFB)](https://reactjs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.7-3178C6)](https://www.typescriptlang.org/)
[![Zustand](https://img.shields.io/badge/Zustand-5.0-764ABC)](https://zustand-demo.pmnd.rs/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind-4.0-06B6D4)](https://tailwindcss.com/)
[![Vite](https://img.shields.io/badge/Vite-6.0-646CFF)](https://vitejs.dev/)

Минималистичное погодное приложение с отображением актуального прогноза по местоположению пользователя. Поддерживает поиск городов, сохранение избранных локаций и динамическую смену фона в зависимости от погоды.

---

## 🎯 Функционал

### 🌡️ Погода и прогноз

- Текущая погода (температура, ощущается как, min/max)
- Почасовая погода на 24 часа
- Прогноз на 7 дней
- Дополнительные показатели: ветер, влажность, давление, УФ-индекс, видимость
- График положения солнца в течение дня

### 📍 Поиск и локации

- Поиск городов с debounce (оптимизация запросов)
- Определение погоды по геолокации пользователя
- Сохранение избранных локаций (Zustand + localStorage)
- Автозагрузка последней выбранной локации

### 🎨 UI и UX

- Адаптивный дизайн (мобильные, планшеты, десктоп)
- Динамическая смена фона в зависимости от погоды (день/ночь, дождь/снег)
- Полная поддержка TypeScript (строгая типизация)
- Обработка ошибок и состояние загрузки

---

## ⚡ Производительность и доступность

### Оптимизации

- Debounce для поиска городов (снижение нагрузки на API)
- Оптимизация размера изображений погоды
- Сохранение последней локации (кеширование)
- Lazy loading компонентов

### Доступность

- Aria-атрибуты для интерактивных элементов
- Семантическая вёрстка
- Клавиатурная навигация

---

## 🛠 Технологии

| Категория        | Технологии                    |
| ---------------- | ----------------------------- |
| Фреймворк        | React 19                      |
| Язык             | TypeScript 5.7                |
| Стейт-менеджмент | Zustand 5.0                   |
| Стилизация       | Tailwind CSS 4.0              |
| Сборка           | Vite 6.0                      |
| API              | OpenWeatherMap / погодный API |
| Деплой           | Vercel                        |

---

## 📁 Структура проекта

src/
├── modules/
│ ├── WeatherInfo/ # Основной блок с погодой
│ │ ├── CurrentDayTemp/ # Текущая температура
│ │ ├── HourlyWeather/ # Почасовой прогноз
│ │ ├── DailyWeather/ # Прогноз на 7 дней
│ │ └── WeatherDetails/ # Детали (ветер, давление, УФ)
│ └── WeatherSidebar/ # Боковая панель
│ ├── LocationSearchField/ # Поиск городов (debounce)
│ ├── SavedLocationsList/ # Сохранённые локации
│ └── CurrentWeatherIcon/ # Иконка текущей погоды
├── components/
│ ├── CurrentWeatherIcon/
│ └── ErrorComp/ # Компонент ошибки
├── store/
│ └── useWeatherData.ts # Zustand store (погода, локации, состояние)
├── helpers/ # Вспомогательные функции
├── types/ # TypeScript интерфейсы
├── consts/ # Константы
├── UI/ # UI компоненты (Spinner и др.)
├── assets/ # Изображения (фоны, иконки)
├── pages/
│ └── MainPage/ # Главная страница
└── App.tsx

text

---

## 🚀 Установка и запуск

```bash
git clone https://github.com/aslankhetagurov/weather-app.git
cd weather-app
npm install
# Добавьте API ключ в .env
npm run dev
```

## 🌐 Деплой

[Vercel](https://weathery-beta.vercel.app)

👨‍💻 Автор
Аслан Хетагуров

- GitHub: [aslankhetagurov](https://github.com/aslankhetagurov)
- Сайт: [aslan-khetagurov.com](https://aslan-khetagurov.com)
