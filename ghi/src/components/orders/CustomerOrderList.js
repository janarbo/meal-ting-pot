import React from "react";
import { useGetAllOrdersQuery } from "../../features/orders/orderApi";

const CustomerOrderList = () => {
    const { data: orders, isLoading, isError } = useGetAllOrdersQuery();

    if (isLoading) return <div>Loading...</div>;
    if (isError) return <div>Error fetching orders</div>;

    const getStatus = (status) => {
        switch (status) {
        case 1:
            return "SUBMITTED";
        case 2:
            return "CONFIRMED";
        case 3:
            return "READY_FOR_PICKUP";
        case 4:
            return "COMPLETED";
        case 5:
            return "DECLINED";
        }
    };

return (
    <div>
        <h2>My Order History</h2>
        {orders.map((order) => (
        <div key={order.order_id}>
            <div className="flex justify-between items-center">
            <h3>Placed: {order.order_date}</h3>
            <div>
                <p>Chef Email: {order.chef_email}</p>
                <p>Chef Phone: {order.chef_phone}</p>
                <p>Chef Address: {order.chef_address}</p>
            </div>
            </div>
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
                {order.shopping_cart.map((item) => (
                <tr key={item.name}>
                    <td>
                    <img
                        src={item.photo}
                        alt={item.name}
                        className="object-contain w-full h-64"
                    />
                    </td>
                    <td>{item.name}</td>
                    <td>${item.price}</td>
                    <td>{item.quantity}</td>
                    <td>{getStatus(order.status)}</td>
                </tr>
                ))}
            </tbody>
            <tfoot>
                <tr>
                <td colSpan="4">Total:</td>
                <td>${order.total_price}</td>
                </tr>
            </tfoot>
            </table>
        </div>
        ))}
    </div>
);
};

export default CustomerOrderList;
