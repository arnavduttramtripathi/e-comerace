import { useEffect, useState } from "react";
import api from "../api/api";
import { Link } from "react-router";

export default function Home() {
    const [product, setProducts] = useState([]);
    const [search, setsearch] = useState("");
    const [category, setcategory] = useState("");

    const loadProducts = async () => {
        const response = await api.get(`/products?search=${search}&category=${category}`);
        setProducts(response.data);
    };

    useEffect(() => {
        loadProducts();
    }, [search, category]);

    const addToCart = async (productId) => {
        const userId = localStorage.getItem("userId");
        if (!userId) {
            alert("Please login to add items to cart");
            return;
        }
        const res = await api.post("/cart/add", { userId, productId});
        const total = res.data.items.reduce(
            (sum, item) => sum + item.productId.price*item.quantity, 0
        );
        localStorage.setItem("cartCount", total);
        window.dispatchEvent(new Event("cartUpdated"));
    }

    return (
        <div className="p-6">
            {/* search */}
            <div className="mb-4 flex gap-3 ">
                <input
                    placeholder="Search products..."
                    value={search}
                    onChange={(e) => setsearch(e.target.value)}
                    className="border px-3 py-2 rounded w-1/2"
                />
                {/* category Filter */}
                <select
                value={category}
                    onChange={(e) => setcategory(e.target.value)}
                    className="boarder px-3 py-2 rounded"
                >
                    <option value="">All Categories</option>
                    <option value="Laptops" >Laptops</option>
                    <option value="Mobiles">Mobiles</option>
                    <option value="Tablets">Tablets</option>
                </select>
            </div>
            {/* products grid */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-5">
                {product.map((product) => (
                    <div key={product._id}
                    className="border p-3 rounded shadow">
                <Link
                        to={`/product/${product._id}`}
                        className="border p-3 rounded shadow hover:shadow-lg transition">
                        <img src={product.image}
                            alt={product.title}
                            className="w-full h-48 object-contain bg-white rounded" />
                        <h2 className="mt-2 font-semibold">{product.title}</h2>
                        <p className="text-blue-500 font-bold">${product.price}</p>
                        </Link>
                         <button onClick={() => addToCart(product._id)}
                className="mt-2 w-full bg-blue-500 text-white px-3 py-2 rounded hover:bg-blue-500">Add to Cart</button>
                        </div>
                ))}
               
            </div>
        </div>
    )
}