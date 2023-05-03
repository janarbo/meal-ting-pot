import React from "react";
import { useSelector } from "react-redux";
import { useGetAllOrdersQuery } from "../../features/orders/orderApi";
import Footer from "../../Footer"
import Lottie from "lottie-react";
import orderCheck from "../../images/styling/orderCheck.json";

const CustomerOrderList = () => {
    const customerId = useSelector((state) => state.auth.userInfo.id);
    const { data: orders, isLoading, isError } = useGetAllOrdersQuery();

        const getStatusClassName = (status) => {
        switch (status) {
            case 1:
                return "text-green-500";
            case 2:
                return "text-green-500";
            case 3:
                return "text-yellow-500";
            case 4:
                return "text-green-500";
            case 5:
                return "text-red-500";
            default:
                return "text-white-500";
        }
    };

    const getStatus = (status) => {
        switch (status) {
            case 1:
                return "SUBMITTED";
            case 2:
                return "CONFIRMED";
            case 3:
                return "READY FOR PICKUP";
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
        <div className="overflow-x-auto font-sans">
            <h1 className="text-2xl font-medium flex justify-center pt-5">My Order History</h1>
            <div className="flex justify-center">
                <Lottie
                    animationData={orderCheck}
                    style={{ width: "200px", height: "200px" }}
                />
            </div>
            {filteredOrders.map((order, index) => {
            const totalPrice = order.shopping_cart.reduce(
                (acc, item) => acc + item.price * item.quantity,
                0
            );
            return (
                <div
                key={order.order_id}
                data-theme="garden"
                className="border rounded-lg shadow-md bg-gray bg-opacity-10 overflow-hidden text-black py-5"
                >
                    <div className="p-6 space-y-6">
                        <h3 className="text-bold text-lg">Order {index + 1} | Placed: {order.order_date}</h3>
                        <div className="flex justify-between items-center">
                        <div className="chat-bubble">
                            <p className="font-bold">Order Status:</p>
                            <p className={`font-bold ${getStatusClassName(order.status)}`}>{getStatus(order.status)}</p>
                        </div>
                        <div className="dropdown">
                            <label tabIndex={0} className="btn m-1 pl-20 pr-20">Chef Info ▼</label>
                            <ul tabIndex={0} className="dropdown-content menu p-2 shadow bg-base-100 rounded-box w-52">
                                <p>{order.chef_email}</p>
                                <p>{order.chef_phone}</p>
                                <p>{order.chef_address}</p>
                            </ul>
                        </div>
                        </div>
                        <table className="table w-full hover">
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
                            <tr className="hover" key={item.name}>
                                <td>
                                    <div className="avatar">
                                        <div className="w-24 rounded">
                                            <img
                                                src={item.photo}
                                                alt={item.name}
                                                className="object-contain w-full h-32"
                                            />
                                        </div>
                                    </div>
                                </td>
                                <td className="capitalize">{item.name}</td>
                                <td>{item.quantity}</td>
                                <td>${item.price}</td>
                            </tr>
                            ))}
                        </tbody>
                        <tfoot>
                            <tr>
                                <td colSpan="3"></td>
                                <td className="font-bold text-lg">
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
