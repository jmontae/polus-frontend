echo "pulling from github..."
git pull
echo "pull successful!"
echo "rebuilding vue app..."
npm install
npm run build
echo "build successful!"
echo "restarting server..."
pm2 restart cherwell-api-service
echo "server restart successful!"