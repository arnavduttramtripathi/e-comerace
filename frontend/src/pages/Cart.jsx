import { useState, useEffect } from "react";
import api from "../api/api";

export default function Cart() {
    const userId = localStorage.getItem("userId");
    const [cart, setCart] = useState(null);

    // load cart data
    const loadCart = async () => {
        try {
            if (!userId) return;
            const res = await api.get(`/cart/user/${userId}`); // ✅ fixed route
            setCart(res.data);
        } catch (error) {
            console.log("Error loading cart", error);
        }
    };

    useEffect(() => {
        loadCart();
    }, []);

    // remove item
    const removeItem = async (productId) => {
        try {
            await api.post(`/cart/remove`, { userId, productId });
            loadCart();
            window.dispatchEvent(new Event("cartUpdated"));
        } catch (error) {
            console.log("Error removing item", error);
        }
    };

    // update item quantity
    const updateQty = async (productId, quantity) => {
        try {
            if (quantity === 0) {
                await removeItem(productId);
                return;
            }

            await api.post(`/cart/update`, { userId, productId, quantity });
            loadCart();
            window.dispatchEvent(new Event("cartUpdated"));
        } catch (error) {
            console.log("Error updating quantity", error);
        }
    };

    // empty cart
    if (!cart || cart.items.length === 0) {
        return <div className="p-6 text-center">Your cart is empty</div>;
    }

    // total price
    const total = cart.items.reduce(
        (sum, item) => sum + item.productId.price * item.quantity,
        0
    );

    return (
        <div className="max-w-4xl mx-auto p-6">
            <h1 className="text-2xl font-bold mb-6">Your Cart</h1>

            <div className="space-y-4">
                {cart.items.map((item) => (
                    <div
                        key={item.productId._id}
                        className="flex items-center justify-between p-4 border rounded"
                    >
                        {/* Product Info */}
                        <div className="flex items-center gap-4">
                            <img
                                src={item.productId.image}
                                alt={item.productId.title}
                                className="w-16 h-16 object-contain"
                            />
                            <div>
                                <h2 className="text-lg font-semibold">
                                    {item.productId.title}
                                </h2>
                                <p className="text-gray-600">
                                    ₹{item.productId.price}
                                </p>
                            </div>
                        </div>

                        {/* Quantity Controls */}
                        <div className="flex items-center gap-2">
                            <button
                                onClick={() =>
                                    updateQty(item.productId._id, item.quantity - 1)
                                }
                                className="px-2 py-1 bg-gray-300 rounded hover:bg-gray-400"
                            >
                                -
                            </button>

                            <span>{item.quantity}</span>

                            <button
                                onClick={() =>
                                    updateQty(item.productId._id, item.quantity + 1)
                                }
                                className="px-2 py-1 bg-gray-300 rounded"
                            >
                                +
                            </button>
                        </div>

                        {/* Price */}
                        <div>
                            <p className="font-semibold">
                                ₹{(item.productId.price * item.quantity).toFixed(2)}
                            </p>
                        </div>

                        {/* Remove */}
                        <button
                            className="text-red-500"
                            onClick={() => removeItem(item.productId._id)}
                        >
                            Remove
                        </button>
                    </div>
                ))}
            </div>

            {/* Total */}
            <div className="text-right mt-6">
                <h2 className="text-xl font-bold">
                    Total: ₹{total.toFixed(2)}
                </h2>
            </div>
        </div>
    );
}