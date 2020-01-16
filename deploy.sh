echo "pulling from github..."
git pull origin master
echo "pull successful!"
echo "rebuilding vue app..."
npm install
npm run build
echo "build successful!"
echo "restarting server..."
pm2 start backend/server.js --name cherwell-api-service
echo "server restart successful!"