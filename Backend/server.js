import http from 'http';
import dotenv from 'dotenv';
import app from './app.js';
import razorpayRoutes from './routes/razorpay.js';
import productRoutes from './routes/product.routes.js';

dotenv.config();

app.use('/api/razorpay', razorpayRoutes);

// ✅ FIX — mount product routes
app.use('/api/products', productRoutes);

const server = http.createServer(app);

const PORT = process.env.PORT || 3000;

server.listen(PORT, () => {
  console.log(`✅ Server running at http://localhost:${PORT}`);
});

