import React, { useState, useEffect } from "react";
import Layout from "../../components/Layout/Layout.jsx";
import AdminMenu from "./AdminMenu.jsx";
import axios from "axios";
import toast from "react-hot-toast";
import { useAuth } from "../../context/AuthContext.jsx";
import { useNavigate } from "react-router-dom";
import moment from "moment";
import { Input, Select } from "antd";
import { ImCross } from "react-icons/im";
import OrderTrackingStepProgressBar from "../../components/OrderTrackingStepProgress.jsx";

const { Option } = Select;

function AllOrders() {
  const [order, setOrder] = useState([]);
  const [search, setSearchChange] = useState("");
  const [searchKey, setSearchKey] = useState("order_id");
  const [pincode, setPincode] = useState("");
  const [locationData, setLocationData] = useState(null);
  const [locationModel,setLocationModel] = useState(false)
  const [auth] = useAuth();
  const [status] = useState([
    "Not Process",
    "Processing",
    "Shipped",
    "Delivered",
    "Cancel",
  ]);
  const navigate = useNavigate();

  const getAllOrder = async () => {
    try {
      const { data } = await axios.get(
        `${import.meta.env.VITE_APP_API_KEY}/api/v1/payment/all-admin-order`
      );
      if (data?.success) {
        setOrder(data?.orders);
      }
    } catch (error) {
      toast.error("Error while fetching your all order");
    }
  };

  useEffect(() => {
    if (auth?.token) {
      getAllOrder();
    }
  }, [auth?.token]);

  const handleChangeStatus = async (orderId, value,shippedAddress) => {
    try {
      await axios.put(
        `${
          import.meta.env.VITE_APP_API_KEY
        }/api/v1/payment/order-status/${orderId}`,
        {
          status: value,
          shippedAddress:shippedAddress
        }
      );
      getAllOrder();
    } catch (error) {
      toast.error("Request Timeout");
    }
  };

  const handleSearch = async (e) => {
    e.preventDefault();
    try {
      const { data } = await axios.post(
        `${import.meta.env.VITE_APP_API_KEY}/api/v1/payment/search-order`,
        {
          searchKey: searchKey,
          searchValue: search,
        }
      );
      if (data?.success) {
        setOrder(data?.order);
      } else {
        toast.error("No Data Found");
      }
    } catch (error) {
      toast.error("No Order Found");
    }
  };
  const updateShippedAddress = async (id,shippedAddress) => {
    try {
        const resp = await axios.put(
          `${
            import.meta.env.VITE_APP_API_KEY
          }/api/v1/payment/update-shipped-order`,
          {
            shippedAddress: shippedAddress,
            order_id:id
          }
        );
        setLocationModel(false)
        setPincode("")
        toast.success("Shipped location changed")
        console.log(resp)
    } catch (error) {
      console.log(error);
      toast.error("please try again")
    }
  };

  const fetchLocation = async (id) => {
    try {
      const res = await fetch(
        `https://api.postalpincode.in/pincode/${pincode}`
      );
      const data = await res.json();

      if (data[0].Status === "Success") {
        const postOffice = data[0].PostOffice;
        setLocationData(postOffice);
        setLocationModel(true);
        console.log(locationData);
      } else {
        setLocationData(null);
        alert("Invalid Pincode");
      }
    } catch (error) {
      console.error("Error fetching location:", error);
    }
  };

  return (
    <Layout>
      <div className="container mx-auto px-4 py-8">
        <div className="flex flex-col md:flex-row">
          <AdminMenu />
          <div className="w-full md:w-3/4 bg-white rounded-lg shadow-md p-6">
            <h2 className="text-2xl font-bold text-gray-800 mb-4">
              All Orders
            </h2>
            <form
              className="flex flex-col md:flex-row items-center gap-4 mb-6"
              onSubmit={handleSearch}
            >
              <Select
                className="w-full md:w-1/4 border border-gray-300 rounded-md"
                onChange={(e) => setSearchKey(e.target.value)}
                defaultValue="order_id"
              >
                <Option value="order_id">Order ID</Option>
                <Option value="payment_id">Payment ID</Option>
                <Option value="buyer">User ID</Option>
                <Option value="status">Shipping Status</Option>
              </Select>
              <input
                type="text"
                placeholder="Enter Value"
                className="flex-grow border border-gray-300 p-2 rounded-md text-gray-700"
                value={search}
                onChange={(e) => setSearchChange(e.target.value)}
              />
              <button
                type="submit"
                className="px-4 py-2 bg-dark text-secondary rounded-md"
              >
                Search
              </button>
            </form>

            {order.map((o) => (
              <div
                key={o._id}
                className="border rounded-lg mb-4 p-4 bg-gray-100 relative"
              >
                <div>
                  <div className="flex flex-col md:flex-row justify-between items-start mb-4">
                    <div className="text-gray-800">
                      <p>
                        <strong>Order ID:</strong> {o.order_id}
                      </p>
                      <p>
                        <strong>Payment ID:</strong> {o.payment_id}
                      </p>
                      <p>
                        <strong>User ID:</strong> {o.buyer}
                      </p>
                      <p>
                        <strong>Shipping Address : </strong> {o.shippedAddress}
                      </p>
                      {/* <OrderTrackingStepProgressBar/> */}
                      <p>
                        <strong>Order Time:</strong>{" "}
                        {moment(o.createdAt).fromNow()}
                      </p>
                      {o.status=='Shipped' && <div className="">
                        <div>
                          <Input
                            placeholder="PinCode"
                            className="my-2"
                            disabled={o.status != "Shipped"}
                            value={pincode}
                            onChange={(e) => setPincode(e.target.value)}
                          />
                          <button
                            className="w-full px-4 py-2 bg-dark text-secondary rounded-md disabled:cursor-not-allowed disabled:bg-gray-200 disabled:text-gray-400"
                            disabled={o.status != "Shipped"}
                            onClick={() => fetchLocation(o._id)}
                          >
                            search
                          </button>
                        </div>
                      </div>}
                    </div>
                    <div className="flex gap-2 mt-2 md:mt-0">
                      <Select
                        bordered={false}
                        onChange={(value) => handleChangeStatus(o._id, value,o.shippedAddress)}
                        defaultValue={o.status}
                        className="bg-gray-200 border-none"
                      >
                        {status.map((s, i) => (
                          <Option key={i} value={s}>
                            {s}
                          </Option>
                        ))}
                      </Select>
                    </div>
                  </div>
                  {o.address && (
                    <details className="mb-4">
                      <summary className="text-blue-600 cursor-pointer">
                        Address Details
                      </summary>
                      <div className="pl-4 text-gray-700">
                        <p>
                          <strong>PIN:</strong> {o.address.postcode}
                        </p>
                        <p>
                          <strong>State:</strong> {o.address.state}
                        </p>
                        <p>
                          <strong>Country:</strong> {o.address.country}
                        </p>
                        <p>
                          <strong>Road:</strong> {o.address.road}
                        </p>
                        <p>
                          <strong>State District:</strong>{" "}
                          {o.address.state_district}
                        </p>
                        <p>
                          <strong>Village:</strong> {o.address.village}
                        </p>
                      </div>
                    </details>
                  )}
                  <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                    {o.products.map((p) => (
                      <div
                        key={p._id}
                        onClick={() =>
                          navigate(
                            `/product-detail/${p.productId}/${p.categoryId}`
                          )
                        }
                        className="bg-white p-4 rounded-lg shadow-md cursor-pointer"
                      >
                        <img
                          src={`${
                            import.meta.env.VITE_APP_API_KEY
                          }/api/v1/product/product-photo/${p.productId}`}
                          alt="Product"
                          className="rounded-md w-full h-32 object-cover mb-2"
                        />
                        <h5 className="font-semibold text-gray-800">
                          {p.pName}
                        </h5>
                        <p className="text-gray-600 text-sm">
                          {p.pDescription.substring(0, 30)}...
                        </p>
                        <p className="text-gray-900 font-bold">
                          &#8377; {p.pPrice}
                        </p>
                      </div>
                    ))}
                  </div>
                </div>

                {locationModel && (
                  <div className="w-[400px] h-[300px] z-50 bg-gray-400 rounded-md absolute top-20 right-20">
                    <main className="relative overflow-scroll h-[300px] pin-model ">
                    {
                      locationData.map((l)=>(
                        <div className="px-5 py-2 bg-gray-300 rounded-md cursor-pointer" onClick={()=>updateShippedAddress(o._id,`Your Product is reached at ${l.Name}, ${l.State}`)} >
                          <div>{l.Name}</div>
                          <div>{l.State}</div>
                        </div>
                      ))
                    }
                    </main>
                    <ImCross className="absolute top-5 right-5 cursor-pointer" onClick={()=>setLocationModel(false)} />
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </Layout>
  );
}

export default AllOrders;
