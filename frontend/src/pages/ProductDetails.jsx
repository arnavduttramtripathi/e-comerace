
import { use, useEffect, useState } from "react";
import api from "../api/api";
import { useParams } from "react-router";

export default function Productdetails() { 
    const { id } = useParams();
    const [product, setProduct] = useState(null);

    const loadProduct = async () => {
        const res = await api.get("/products/");
        const product = res.data.find((item) => item._id === id);
        setProduct(product);
    };

    useEffect(() => {
        loadProduct();
    }, []);

    if (!product) {
        return <div>Loading...</div>;
    }

    return (
        <div className="p-6 max-w-3xl ma-auto">
            <img
                src={product.image}
                alt={product.title}
                className="w-full h-96 object-contain bg-white rounded" />
            <h1 className="text-3xl font-bold mt-4">{product.title}</h1>
            <p className="text-gray-700 mt-2">{product.description}</p>
            <p className="text-blue-500 font-bold mt-2 text-xl">${product.price}</p>

            <button className="mt-4 bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600">
                Add to Cart
            </button>
        </div>
    )
}