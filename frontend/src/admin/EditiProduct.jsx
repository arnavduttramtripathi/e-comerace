
import { useEffect, useState } from "react";
import api from "../api/api";
import { useNavigate, useParams } from "react-router";

export default function EditiProduct() {
    const { id } = useParams();
    const [form, setForm] = useState({
        title: "",
        description: "",
        price: "",
        category: "",
        Image: "",
        stock:"",
    });
    const loadProduct = async () => {
        const res = await api.get(`/products/${id}`);
        const product = res.data.find((p) => p.id === parseInt(id));
        setForm(product);
    };
     const navigate = useNavigate();

    const allowedFields = ["title", "description", "price", "category", "Image", "stock"];

    useEffect(() => {
        loadProduct();
    }, []);
    const handleChange = (e) => {
        setForm({
            ...form,
            [e.target.name]: e.target.value,
        });
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        await api.put(`/products/update/${id}`, form);
        alert("Product updated successfully");
         navigate("/admin/products");
    }

    return (
        <div className="max-w-lg mx-auto mt-10 bg-white p-6 shadow rounded">
            <h2 className="text-2xl font-bold mb-6">Edit Product</h2>
            <form onSubmit={handleSubmit} className="space-y-3">
                {allowedFields.map((key) => (
                    <input
                        key={key}
                        name={key}
                        value={form[key] || ""}
                        onChange={handleChange}
                        placeholder={key}
                        className="w-full p-2 border border-gray-300 rounded"
                    />
                ))}
                <button type="submit" className="w-full bg-blue-500 text-white p-2 rounded hover:bg-blue-600">
                    Update Product
                </button>
            </form>
        </div>
    )
}