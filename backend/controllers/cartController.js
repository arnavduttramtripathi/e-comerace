import Cart from "../models/Cart.js";
import mongoose from "mongoose";


// ✅ ADD TO CART
export const addToCart = async (req, res) => {
  try {
    const { userId, productId } = req.body;

    if (!userId || !productId) {
      return res.status(400).json({
        message: "userId and productId are required",
      });
    }

    let cart = await Cart.findOne({ userId });

    if (!cart) {
      // create new cart
      cart = new Cart({
        userId,
        items: [{ productId, quantity: 1 }],
      });
    } else {
      const item = cart.items.find(
        (i) => i.productId.toString() === productId.toString()
      );

      if (item) {
        item.quantity += 1;
      } else {
        cart.items.push({ productId, quantity: 1 });
      }
    }

    await cart.save();

    res.json({
      message: "Item added to cart",
      cart,
    });

  } catch (error) {
    console.error(error);
    res.status(500).json({
      message: "Server Error",
      error: error.message,
    });
  }
};


// ✅ REMOVE ITEM
export const removeItem = async (req, res) => {
  try {
    const { userId, productId } = req.body;

    const cart = await Cart.findOne({ userId });

    if (!cart) {
      return res.status(404).json({ message: "Cart not found" });
    }

    cart.items = cart.items.filter(
      (i) => i.productId.toString() !== productId.toString()
    );

    await cart.save();

    res.json({
      message: "Item removed from cart",
      cart,
    });

  } catch (error) {
    console.error(error);
    res.status(500).json({
      message: "Server Error",
      error: error.message,
    });
  }
};


// ✅ UPDATE QUANTITY
export const updateQuantity = async (req, res) => {
  try {
    const { userId, productId, quantity } = req.body;

    // ✅ validation
    if (!mongoose.Types.ObjectId.isValid(userId)) {
      return res.status(400).json({ message: "Invalid userId" });
    }

    if (!mongoose.Types.ObjectId.isValid(productId)) {
      return res.status(400).json({ message: "Invalid productId" });
    }

    if (!quantity || quantity < 1) {
      return res.status(400).json({
        message: "Quantity must be greater than 0",
      });
    }

    const cart = await Cart.findOne({ userId });

    if (!cart) {
      return res.status(404).json({ message: "Cart not found" });
    }

    const item = cart.items.find(
      (i) => i.productId.toString() === productId.toString()
    );

    if (!item) {
      return res.status(404).json({
        message: "Item not found in cart",
      });
    }

    item.quantity = quantity;

    await cart.save();

    res.json({
      message: "Cart updated successfully",
      cart,
    });

  } catch (error) {
    console.error("ERROR:", error);
    res.status(500).json({
      message: "Server Error",
      error: error.message,
    });
  }
};


// ✅ GET CART
export const getCart = async (req, res) => {
  try {
    const { userId } = req.params;

    const cart = await Cart.findOne({ userId }).populate("items.productId");

    if (!cart) {
      return res.status(404).json({ message: "Cart not found" });
    }

    res.json(cart);

  } catch (error) {
    console.error(error);
    res.status(500).json({
      message: "Server Error",
      error: error.message,
    });
  }
};