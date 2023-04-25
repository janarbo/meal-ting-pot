import { useSelector } from "react-redux"
import { useGetAllOrdersQuery, useUpdateOrderMutation } from "./features/orders/orderApi"
import React, { useState } from "react";

function ChefOrderList() {
    const chefId = useSelector((state) => state.auth.userInfo.id);


    const [selectedOrder, setSelectedOrder] = useState(null);



    const { data: orders, isLoading } = useGetAllOrdersQuery(chefId);
    const [order, setOrders] = useState(null)
    console.log(orders)

    const [updateOrder, { data: status, isLoading: isLoadingStatus }] = useUpdateOrderMutation();
    const canSave=!isLoading

    if(isLoading||isLoadingStatus){
        return <p>Loading...</p>
    }

    const getStatus = (status) => {
        switch (status) {
        case 1:
            return "SUBMITTED"
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



    const handleUpdateOrder = async (order, value) => {
        if (canSave) {
            try {

                    const items = order.shopping_cart.map(item => {
                        return {
                            photo: item.photo,
                            name: item.name,
                            price: item.price,
                            quantity: item.quantity
                        }
                    });

                    const updatedOrder = {
                        order_id: order.order_id,
                        order_date: order.order_date,
                        status: value,
                        shopping_cart: items
                    }
                    const result = await updateOrder(updatedOrder).unwrap();
                    console.log(result);

            } catch (error) {
                console.log(error);
            };
        }
    };


    const handleButtonClick = (order, value) => {
        setSelectedOrder(order);
        handleUpdateOrder(order, value);
    };

    return (
  <div>
    <h1>Your Order List</h1>
    <div className="row">
      <div className="col-sm">
        <table className="table table-striped">
          <thead>
            <tr>
              <th>Photo</th>
              <th>Name</th>
              <th>Quantity</th>
              <th>Price</th>
              <th>Date</th>
              <th>Status</th>
              <th>Action</th>
            </tr>
          </thead>
          {orders ? (
            <tbody>
              {orders
                .filter((order) => getStatus(order.status) !== "DECLINED")
                .sort((a, b) => {
                  if (a.status !== b.status) {
                    return a.status - b.status;
                  }
                  return new Date(a.order_date) - new Date(b.order_date);
                })
                .map((order) => (
                  <tr
                    key={order.order_id}
                    className={
                      selectedOrder && selectedOrder.order_id === order.order_id
                        ? "table-info"
                        : ""
                    }
                  >
                    {order.shopping_cart.map((item) => (
                      <React.Fragment key={item.name}>
                        <td>
                          <img src={item.photo} alt="Menu Item Photo" />
                        </td>
                        <td>{item.name}</td>
                        <td>{item.quantity}</td>
                        <td>{item.price}</td>
                      </React.Fragment>
                    ))}
                    <td>{order.order_date}</td>
                    <td>{getStatus(order.status)}</td>
                    <td>
                      {getStatus(order.status) === "SUBMITTED" && (
                        <>
                          <button
                            className="btn btn-primary"
                            onClick={() => handleButtonClick(order, 2)}
                          >
                            Confirm
                          </button>
                          <button
                            className="btn btn-danger"
                            onClick={() => handleButtonClick(order, 5)}
                          >
                            Decline
                          </button>
                        </>
                      )}
                      {getStatus(order.status) === "CONFIRMED" && (
                        <>
                          <button
                            className="btn btn-secondary"
                            onClick={() => handleButtonClick(order, 3)}
                          >
                            Ready for pickup
                          </button>
                          <button
                            className="btn btn-primary"
                            onClick={() => handleButtonClick(order, 4)}
                          >
                            Complete
                          </button>
                        </>
                      )}
                      {getStatus(order.status) === "READY_FOR_PICKUP" && (
                        <>
                          <button
                            className="btn btn-primary"
                            onClick={() => handleButtonClick(order, 4)}
                          >
                            Complete
                          </button>
                        </>
                      )}
                    </td>
                  </tr>
                ))}
            </tbody>
          ) : (
            <tr>
              <td>Loading...</td>
            </tr>
          )}
        </table>
      </div>
    </div>
  </div>
);







}

export default ChefOrderList
