docker-compose build
docker-compose run --rm app sh -c 'cd react-app && rm -rf node_modules && rm package-lock.json && npm install'