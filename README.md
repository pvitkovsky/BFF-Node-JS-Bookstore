## ENV
ADMIN_PASSWORD must be set
NEXTAUTH_URL=http://localhost:3000
NEXTAUTH_SECRET={any string}

## CURLs

curl localhost:3000/books 

curl -s -c cookies.txt localhost:3000/api/auth/csrf

curl -s -X POST -c cookies.txt -b cookies.txt \
-H "Content-Type: application/x-www-form-urlencoded" \
-d "csrfToken={TOKEN_FROM_ABOVE}}&login=admin&password={PW}&redirect=false&json=true" \
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

## TODOs:
Auto redirect to books. Login redirects to login. On login redirects to books with open admin controls;
Later V CRUD part, refactor
Later book imgs;
ESLint errors - what do they really do?

Later - id handling from the URL. In Next.js, params.id comes in as a string, but DB/Zod expects a number. Watch if the agent correctly uses Number(params.id) or if the Zod schema handles the coercion.
Check what parts of stack were omitted?
Expansion - some one to many rel in the DB (book/author)

## AUTH:
 Cookie-based auth: sign-in is CSRF-protected; the session is a JWT stored in a cookie. The browser sends the cookie automatically. Same-origin and CORS restrict which sites can call our API with credentials.
 Start at /api/auth/signin