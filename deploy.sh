PACKAGE_VERSION=$(cat ./package.json \
  | grep version \
  | head -1 \
  | awk -F: '{ print $2 }' \
  | sed 's/[",]//g' \
  | tr -d '[[:space:]]')

docker container kill gql-api

docker build --rm -f "Dockerfile" -t arasksgl/gql-api:$PACKAGE_VERSION .
docker run --rm -d -p 9000:9000/tcp --name=gql-api arasksgl/gql-api:$PACKAGE_VERSION