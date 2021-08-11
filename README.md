# Movie Search
## Start the app with Docker
1. Create `server/.env.production` file 
```
LOG_DIR=./logs
PUBLIC_DIR=./public
REDIS_URL=redis://redis:6379
OMDB_API_KEY=xyz123
USER_CREDENTIALS=username:password
```

2. run `docker-compose up`

3. After the application starts, navigate to http://localhost:8080 in your web browser.

4. Authenticate with the credentials given in `USER_CREDENTIALS`

