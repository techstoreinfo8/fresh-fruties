# React + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react) uses [Oxc](https://oxc.rs)
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react-swc) uses [SWC](https://swc.rs/)

## React Compiler

The React Compiler is not enabled on this template because of its impact on dev & build performances. To add it, see [this documentation](https://react.dev/learn/react-compiler/installation).

## Expanding the ESLint configuration

If you are developing a production application, we recommend using TypeScript with type-aware lint rules enabled. Check out the [TS template](https://github.com/vitejs/vite/tree/main/packages/create-vite/template-react-ts) for information on how to integrate TypeScript and [`typescript-eslint`](https://typescript-eslint.io) in your project.


# Note: Step2

The status is saved back into localStorage, so the customer can see the updated status on the Orders page.

One important note

This version is intentionally database-free. localStorage is useful for developing and demonstrating the portal, 
but it is not suitable for a real multi-user supermarket system because each browser has its own data. 
For production, the next stage would be a Spring Boot REST API + MySQL backend, while keeping this React frontend.



Go to:

Fresh Fruits → Apple → Add to Cart

Then:

Cart → Proceed to Checkout

Fill:

Name
Phone
Email
Address
City
Pincode
Payment

Click:

🛍️ Place Order


You should see:

ORDER ID
ORD-xxxxxxxx

Customer
Order date
Pending

Apple × 2       ₹360
Banana × 1      ₹60

Total: ₹420


Admin
 ├── Products
 ├── Inventory
 └── Orders

In Admin → Orders, change:

Pending
   ↓
Confirmed
   ↓
Packed
   ↓
Out for Delivery
   ↓
Delivered

http://localhost:5173/
http://localhost:5173/orders
http://localhost:5173/admin

# 28092026 ::
# ==============
# added all the backend intigrations.
