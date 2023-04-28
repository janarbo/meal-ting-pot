import React from "react";
import { useSelector } from "react-redux";
import { useGetAllOrdersQuery } from "../../features/orders/orderApi";
import Footer from "../../Footer"

const CustomerOrderList = () => {
    const customerId = useSelector((state) => state.auth.userInfo.id);
    const { data: orders, isLoading, isError } = useGetAllOrdersQuery();

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
            default:
                return "UNKNOWN";
        }
    };


    if (isLoading) {
        return <div>Loading...</div>;
    }

    if (isError) {
        return <div>Error fetching orders</div>;
    }

    const filteredOrders = orders.filter(order => order.customer_id === parseInt(customerId));

    return (
        <div className="space-y-6">
            <h2 className="text-2xl font-bold">My Order History</h2>
            {filteredOrders.map((order) => {
                const totalPrice = order.shopping_cart.reduce(
                (acc, item) => acc + item.price * item.quantity,
                0
                );
                return (
                    <div
                        key={order.order_id}
                        data-theme="garden"
                        className="border rounded-lg shadow-md bg-gray bg-opacity-80 overflow-hidden text-black"
                    >
                        <div className="p-6 space-y-6">
                            <h3 className="text-lg font-bold text-[#b05e5e]">
                                Placed: {order.order_date}
                            </h3>
                            <div className="flex justify-between items-center">
                                <div>
                                    <p className="font-bold text-[#b05e5e]">Order Status:</p>
                                    <p className="font-bold">{getStatus(order.status)}</p>
                                </div>
                                <div>
                                    <p className="font-bold text-[#b05e5e]">Chef Info:</p>
                                    <p>{order.chef_email}</p>
                                    <p>{order.chef_phone}</p>
                                    <p>{order.chef_address}</p>
                                </div>
                            </div>
                            <table className="w-full">
                                <thead>
                                    <tr>
                                        <th className="w-20 text-[#b05e5e]">Image</th>
                                        <th className="w-1/4 text-[#b05e5e]">Item</th>
                                        <th className="w-1/4 text-[#b05e5e]">Quantity</th>
                                        <th className="w-1/4 text-[#b05e5e]">Price</th>
                                    </tr>
                                </thead>
                                <tbody>
                                {order.shopping_cart.map((item) => (
                                    <tr key={item.name}>
                                    <td className="text-center">
                                        <img
                                            src={item.photo}
                                            alt={item.name}
                                            className="object-contain w-full h-32"
                                        />
                                    </td>
                                        <td>{item.name}</td>
                                        <td>{item.quantity}</td>
                                        <td>${item.price}</td>
                                    </tr>
                                ))}
                                </tbody>
                                <tfoot>
                                    <tr>
                                        <td colSpan="3"></td>
                                        <td className="font-bold">
                                        Total: ${totalPrice.toFixed(2)}
                                        </td>
                                    </tr>
                                </tfoot>
                            </table>
                        </div>
                    </div>
            );
        })}
    <div>
        <Footer />
    </div>
    </div>
);
    }
export default CustomerOrderList;
