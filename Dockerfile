FROM node:14 as build
WORKDIR /app
COPY . ./

RUN yarn
RUN yarn build

FROM nginx:alpine
COPY nginx/default.conf /etc/nginx/conf.d/configfile.template
COPY --from=build /app/packages/client/dist /app/dist

ENV PORT 8080
ENV HOST 0.0.0.0
EXPOSE 8080
CMD sh -c "envsubst '\$PORT' < /etc/nginx/conf.d/configfile.template > /etc/nginx/conf.d/default.conf && nginx -g 'daemon off;'"

