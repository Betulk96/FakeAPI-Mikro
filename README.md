Next.js Multi-Zone Example (with Tailwind)
==========================================

- `home/` → runs at http://localhost:3000/
- `cart/` → runs at http://localhost:3001/cart (basePath set to /cart)

How it works:
- `home/next.config.js` has a `rewrites` entry that forwards `/cart/*` paths to the cart app on port 3001.
- So when you go to http://localhost:3000/cart you are actually served from the cart app.
- Both apps have their own `tailwind.config.js`, `postcss.config.js`, and `globals.css`.

Run:
```sh
cd home && npm install && npm run dev
# in another terminal
cd cart && npm install && npm run dev
```
Then open http://localhost:3000/ and navigate to /cart.
