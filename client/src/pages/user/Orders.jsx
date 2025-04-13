import React, { useState, useEffect } from "react";
import Layout from "../../components/Layout/Layout.jsx";
import UserMenu from "./UserMenu.jsx";
import axios from "axios";
import toast from "react-hot-toast";
import { useAuth } from "../../context/AuthContext.jsx";
import Loading from "../../components/Loading.jsx";
import moment from "moment";
import { useNavigate } from "react-router-dom";
import OrderTrackingStepProgressBar from "../../components/OrderTrackingStepProgress.jsx";

function Orders() {
  const [order, setOrder] = useState([]);
  const [loading, setLoading] = useState(false);
  const [auth] = useAuth();
  const navigate = useNavigate();

  const getAllOrder = async () => {
    try {
      setLoading(true);
      const { data } = await axios.get(
        `${import.meta.env.VITE_APP_API_KEY}/api/v1/payment/all-order`
      );
      if (data?.success) {
        setOrder(data?.orders);
        setLoading(false);
      }
    } catch (error) {
      toast.error("Error while fetching your orders");
    }
  };

  useEffect(() => {
    if (auth?.token) {
      getAllOrder();
    }
  }, [auth?.token]);

  return (
    <Layout title="Your Orders">
      <div className="container mx-auto py-8 text-dark">
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Sidebar */}
          <div className="lg:w-1/4">
            <UserMenu />
          </div>

          {/* Orders Content */}
          <div className="lg:w-3/4 bg-dark p-6 rounded-lg shadow-lg text-white">
            <h2 className="text-2xl font-semibold text-primary mb-4">Your Orders</h2>
            {loading ? (
              <Loading />
            ) : (
              order.length>0 ? <div className="space-y-6">
              {order.map((o, i) => (
                <div key={o._id} className="border-b border-secondary pb-4 mb-4">
                  <div className={`${o.shippedAddress=='Shipped'?'text-secondary':'text-green-600'} font-medium`}>
                    Order #{i + 1}
                  </div>
                  <p className="mt-1">
                    <b>Order ID:</b> {o.order_id}
                  </p>
                  <p>
                    <b>Items Count:</b> {o.products.length}
                  </p>
                  <p>
                    <b>Total Price:</b> ₹{o.totalPrice}
                  </p>
                  <p>
                    <b>Time:</b> {moment(o.createdAt).fromNow()}
                  </p>
                  <p className="">
                    <b>Shipping Status:</b> {o.status}
                  </p>
                  <OrderTrackingStepProgressBar status={o.status} />
                  {o.status=='Shipped' && <p className="text-green-400">
                    <b>{o.shippedAddress}</b>
                  </p>}
                  {o.address && (
                    <details className="mt-2">
                      <summary className="text-primary cursor-pointer">Address</summary>
                      <div className="ml-4 mt-2 text-sm text-secondary space-y-1">
                        <p>PIN: {o?.address?.postcode}</p>
                        <p>State: {o?.address?.state}</p>
                        <p>Country: {o?.address?.country}</p>
                        <p>Road: {o?.address?.road}</p>
                        <p>District: {o.address.state_district}</p>
                        <p>Village: {o?.address?.village}</p>
                      </div>
                    </details>
                  )}

                  {/* Products within the Order */}
                  <div className="mt-4 grid grid-cols-1 gap-4">
                    {o.products.map((p) => (
                      <div
                        key={p._id}
                        className="flex items-center bg-secondary p-3 rounded-lg shadow cursor-pointer hover:bg-secondary-dark transition duration-200"
                        onClick={(e) => {
                          e.preventDefault();
                          navigate(`/product-detail/${p.productId}/${p.categoryId}`);
                        }}
                      >
                        <img
                          src={`${import.meta.env.VITE_APP_API_KEY}/api/v1/product/product-photo/${p.productId}`}
                          alt={p.pName}
                          className="w-20 h-20 object-cover rounded-lg"
                        />
                        <div className="ml-4 text-dark">
                          <h5 className="font-semibold">{p.pName}</h5>
                          <p className="text-sm">{p.pDescription.substring(0, 30)}...</p>
                          <p className="font-bold">Price: ₹{p.pPrice}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div> : <h1>No order found</h1>
            )}
          </div>
        </div>
      </div>
    </Layout>
  );
}

export default Orders;
