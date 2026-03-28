## PROJECT DESCRIPTION:
CRUD with authentication, BFF pattern. See ```blog.fortunate.works```

## ENV
ADMIN_PASSWORD must be set
NEXTAUTH_URL=http://localhost:3000
NEXTAUTH_SECRET={any string}

## CURLs
curl localhost:3000/books 

curl -s -c cookies.txt localhost:3000/api/auth/csrf

curl -s -X POST -c cookies.txt -b cookies.txt \
-H "Content-Type: application/x-www-form-urlencoded" \
-d "csrfToken={TOKEN_FROM_ABOVE}&login=admin&password={PW}&redirect=false&json=true" \
"localhost:3000/api/auth/callback/credentials"

-- checking
curl -b cookies.txt localhost:3000/api/auth/session

curl -s -X POST -b cookies.txt \
-H "Content-Type: application/json" \
-d '{"title":"Curl Test Book","year":2024,"isbn":"978-3-16-148419-9","price":101}' \
"localhost:3000/api/trpc/createBook"

curl -s -X POST -b cookies.txt \
-H "Content-Type: application/json" \
-d '{"id":13}' \
"localhost:3000/api/trpc/deleteBook"