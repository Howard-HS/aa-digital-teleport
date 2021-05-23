FROM node:14 as build
WORKDIR /app
COPY . ./

ENV NUXT_ENV_OPEN_WEATHER_API_KEY $_OPEN_WEATHER_API_KEY

RUN yarn
RUN yarn build

FROM nginx:alpine
COPY nginx/default.conf /etc/nginx/conf.d/default.conf
COPY --from=build /app/packages/client/dist /app/dist
EXPOSE 8080
