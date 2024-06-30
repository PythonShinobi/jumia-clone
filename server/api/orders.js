// server/api/orders.js
import { Router } from "express";

import db from "./db.js";

const router = Router()

router.get("/orders", async (req, res) => {
  try {
    // SQL query to get product_name, quantity, and price from the order_items table.
    const orderItemsQuery = `
      SELECT user_id, product_name, quantity, price 
      FROM order_items;
    `;

    // Execute the SQL query.
    const result = await db.query(orderItemsQuery);
    // console.log(result.rows);

    // Send the result back to the frontend.
    res.status(200).json({ orders: result.rows });
  } catch (error) {
    console.error("Error fetching orders:", error);
    res.status(500).json({ message: "Error fetching orders", error });
  }
});

export default router;
