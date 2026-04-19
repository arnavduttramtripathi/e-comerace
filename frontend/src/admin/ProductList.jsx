import { useState, useEffect } from "react";
import api from "../api/api";
import { Link } from "react-router";


export default function ProductList() {
    const [products, setProducts] = useState([]);

   const loadProducts = async () => {
  const response = await api.get("/products");
  setProducts(response.data);
};

    const deletedProduct = async (id) => {
        try {
            await api.delete(`/products/delete/${id}`);
            alert("Product deleted successfully");
            loadProducts();
        } catch (error) {
            console.log(error, "Error deleting product");
        }
    };
    useEffect(() => {
    loadProducts();
    }, []);

        return (
            <div className="max-w-4xl mx-auto mt-10">
                <div className="flex justify-between items-center mb-6">
                    <h2 className="text-2xl font-bold">Product List</h2>
                    <Link to="/admin/products/add" className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600">
                        Add Product
                    </Link>
                </div>
                <table className="w-full table-auto border-collapse border boeder-gray-200">
                    <thead>
                        <tr className="bg-gray-100">
                            <th className="border border-gray-200 px-4 py-2">Title</th>
                            <th className="border border-gray-200 px-4 py-2">Price</th>
                            <th className="border border-gray-200 px-4 py-2">stock</th>
                            <th className="border border-gray-200 px-4 py-2">Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {products.map((product) => (
                            <tr key={product._id}>
                                <td className="border border-gray-200 px-4 py-2">{product.title}</td>
                                <td className="border border-gray-200 px-4 py-2">{product.price}</td>
                                <td className="border border-gray-200 px-4 py-2">{product.stock}</td>
                                <td className="border border-gray-200 px-4 py-2">
                                    <Link to={`/admin/products/edit/${product._id}`} className="text-blue-500 hover:underline">
                                        Edit
                                    </Link>
                                    <button
                                        onClick={() => deletedProduct(product._id)}
                                        className="text-red-500 hover:underline" >
                                        Delete
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        )
    }