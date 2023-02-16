# currency-converter
A simple currency converter.

## Run

```console
npm install
npm run build
npm start
```

### In docker

```
docker build . -t currency-converter
docker run --rm -p 3001:3001 currency-converter
```

### Development

In development, two servers are started:
- :3001 - server, which will restart on file change
- :5173 - client (Vite) with its requests proxied to the server

```console
npm install
npm run dev
```
