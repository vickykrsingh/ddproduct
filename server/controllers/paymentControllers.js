import { instance } from "../api/index.js";
import crypto from "crypto";
import OrderModel from "../models/orderModel.js";
import cartModel from "../models/cartModel.js";
import productModel from "../models/productModel.js";

export const checkoutController = async (req, res) => {
  var options = {
    amount: Number(req.body.amount * 100), // amount in the smallest currency unit
    currency: "INR",
  };
  const order = await instance.orders.create(options);
  res.status(200).send({
    success: true,
    order,
  });
};

export const paymentVerification = async (req, res) => {
  console.log("hello world");
  console.log(req.body);
  const { payment_id, order_id, signature, cart, tot, address } = req.body;
  console.log(payment_id,order_id,signature,cart,tot,address)
  console.log(address);

  const body = order_id + "|" + payment_id;

  const userId = req.user._id;

  const expectedSignature = crypto
    .createHmac("sha256", process.env.RAZORPAY_KEY_SECRET)
    .update(body.toString())
    .digest("hex");

  const orderController = async () => {
    try {
      const userOrder = await new OrderModel({
        products: cart,
        payment_id: payment_id,
        order_id: order_id,
        signature: signature,
        totalPrice: tot,
        buyer: userId,
        address: {
          country: address.country,
          postcode: address.postcode,
          road: address.road,
          state: address.state,
          village: address.village,
          state_district: address.state_district,
        },
      }).save();
      console.log('user order is ',userOrder)
      await cartModel.deleteMany({});
      return userOrder;
    } catch (error) {
      error;
      console.log(error)
    }
  };
  if (signature === expectedSignature) {
    const userOrder = orderController();
    res.status(200).send({
      success: true,
      userOrder,
    });
  } else {
    res.status(205).send({
      success: false,
      message: "Unauthorized Order",
    });
  }
};

export const userOrderController = async (req, res) => {
  try {
    const orders = await OrderModel.find({ buyer: req.user._id });
    res.status(200).send({
      success: true,
      message: "Your all orders",
      orders,
    });
  } catch (error) {
    res.status(205).send({
      success: false,
      message: "Error while fetching Your all orders",
      error,
    });
  }
};
export const adminAllOrder = async (req, res) => {
  try {
    const orders = await OrderModel.find({}).sort({ createdAt: -1 });
    res.status(200).send({
      success: true,
      message: "Your all orders",
      orders,
    });
  } catch (error) {
    res.status(205).send({
      success: false,
      message: "Error while fetching Your all orders",
      error,
    });
  }
};

export const orderStatusUpdate = async (req, res) => {
  try {
    const { orderId } = req.params;
    const { status,shippedAddress } = req.body;

    const order = await OrderModel.findByIdAndUpdate(
      orderId,
      { status: status,shippedAddress:status=='Cancel'?'':shippedAddress },
      { new: true }
    );
    res.status(200).send({
      success: true,
      message: "Status Update Successfully",
      order,
    });
  } catch (error) {
    res.status(205).send({
      success: false,
      message: "Error while updating Status",
      error,
    });
  }
};

export const searchAdminOrder = async (req, res) => {
  try {
    const { searchKey, searchValue } = req.body;
    const order = await OrderModel.find({ [searchKey]: searchValue });
    res.status(200).send({
      success: true,
      message: "Status Update Successfully",
      order,
    });
  } catch (error) {
    res.status(205).send({
      success: false,
      message: "Error while updating Status",
      error,
    });
  }
};


export const deleteOder = async (req,res) => {
  try {
    const order = await productModel.find()
    console.log(req)
  } catch (error) {
    // TODO
    console.log(error)
  }
}

export const updateShippedAddress = async (req,res) => {
  const {order_id,shippedAddress} = req.body;

  try {
    const resp = await OrderModel.findByIdAndUpdate(order_id,{shippedAddress:shippedAddress})
    console.log(resp)
    return res.status(200).send({
      success:true,
      message:"Shipped status update successfuly",
      data:resp
    })
  } catch (error) {
    res.status(205).json({
      success: false,
      message: "Error while updating Shipped Address",
      error,
    });
  }
}