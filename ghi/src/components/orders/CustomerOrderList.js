import React from "react";
import { useGetAllOrdersQuery } from "../../features/orders/orderApi";

const CustomerOrderList = () => {
    const { data: orders, isLoading, isError } = useGetAllOrdersQuery();

    if (isLoading) return <div>Loading...</div>;
    if (isError) return <div>Error fetching orders</div>;

    return (
        <div>
        {orders.map((order) => (
            <div key={order.id}>
            <h3>Placed: {order.date}</h3>
            <table>
                <thead>
                <tr>
                    <th>Image</th>
                    <th>Item</th>
                    <th>Price</th>
                    <th>Quantity</th>
                    <th>Status</th>
                </tr>
                </thead>
                <tbody>
                {order.items.map((item) => (
                    <tr key={item.id}>
                    <td>
                        <img src={item.image} alt={item.item} />
                    </td>
                    <td>{item.item}</td>
                    <td>${item.price}</td>
                    <td>{item.quantity}</td>
                    <td>{item.status}</td>
                    </tr>
                ))}
                </tbody>
                <tfoot>
                <tr>
                    <td colSpan="4">Total:</td>
                    <td>${order.totalPrice}</td>
                </tr>
                </tfoot>
            </table>
            </div>
        ))}
        </div>
    );
};

export default CustomerOrderList;
