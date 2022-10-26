# Weathernow

<img src="public/favicon.svg" width="64" />

![GitHub repo size](https://img.shields.io/github/repo-size/OyewoleOyedeji/weathernow?color=f03a17&label=Project%20size&style=for-the-badge)

A server-side rendered weather application

**This project was powered by [Nuxt 3](https://v3.nuxtjs.org/) and [OpenWeatherMap](https://openweathermap.org)**

### **Hold up 🛑**

Before you continue you need to have a `Weather API Key` which the project will use

You can get one from <https://openweathermap.org> after creating an account

**Note:** After which you'll get your `API key` from <https://home.openweathermap.org/api_keys>

For the project to know your `API Key` rename `config/default.json` to `config/development.json` and fill in the `weatherApiKey` parameter with your `API Key`

## Setup

Make sure to install the dependencies:

```bash
# yarn
yarn install

# npm
npm install

# pnpm
pnpm install --shamefully-hoist
```

## Development Server

Start the development server on <http://localhost:3000>

```bash
npm run dev
```

## Production

Build the application for production:

```bash
weatherApiKey=${KEY} npm run build
```

**Note:** where `KEY` is the value of `weatherApiKey` (you're `API Key`)

Locally preview production build:

```bash
npm run preview
```

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=github.com%2FOyewoleOyedeji%2Fweathernow&env=weatherApiKey&envDescription=API%20Keys%20needed%20for%20request%20to%20weather%20API&envLink=https%3A%2F%2Fhome.openweathermap.org%2Fapi_keys)
