import React, { useEffect, useState } from "react";
import AddToCart from "../components/Buttons/AddToCart.jsx";
import Layout from "../components/Layout/Layout.jsx";
import { useDetail } from "../context/ProductDetail.jsx";
import { useParams, Link } from "react-router-dom";
import axios from "axios";
import Loading from "../components/Loading.jsx";
import SeeMore from "../components/Buttons/SeeMore.jsx";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import toast from "react-hot-toast";

function SingleProductDetail() {
  const [detail, setDetail] = useDetail();
  const [loading, setLoading] = useState(false);
  const [similarProducts, setSimilarProducts] = useState([]);
  const { pId, cId } = useParams();

  const getProduct = async () => {
    setLoading(true);
    const { data } = await axios.get(
      `${import.meta.env.VITE_APP_API_KEY}/api/v1/product/get-product/${pId}`
    );
    setLoading(false);
    setDetail(data?.product);
  };

  const similarProduct = async (cId) => {
    try {
      const { data } = await axios.get(
        `${
          import.meta.env.VITE_APP_API_KEY
        }/api/v1/product/similar-product/${pId}/${cId}`
      );
      const finalProduct = data.products.filter((p) => p._id !== pId);
      setSimilarProducts(finalProduct);
    } catch (error) {
      toast.error("Request Timeout");
    }
  };

  useEffect(() => {
    getProduct();
    similarProduct(cId);
  }, [pId, cId]);

  var settings = {
    dots: false,
    infinite: false,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    swipeToSlide: true,
    variableWidth: true,
    responsive: [
      {
        breakpoint: 1124,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
          infinite: true,
          dots: false,
        },
      },
      {
        breakpoint: 900,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
          initialSlide: 2,
        },
      },
      {
        breakpoint: 720,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
      {
        breakpoint: 520,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
    ],
  };

  return (
    <Layout>
      {loading ? (
        <Loading />
      ) : (
        <div className="container mx-auto pt-5">
          <div className="flex flex-col lg:flex-row gap-8 px-5">
            <div className="lg:w-1/2">
              <img
                className="w-full rounded-custom"
                src={`${
                  import.meta.env.VITE_APP_API_KEY
                }/api/v1/product/product-photo/${detail._id}`}
                alt="Product Image"
              />
            </div>
            <div className="lg:w-1/2 flex flex-col gap-4 text-dark">
              <h2 className="text-dark font-bold text-2xl">Product Detail</h2>
              <hr className="border-secondary" />
              <h3 className="text-xl font-semibold">{detail?.name}</h3>
              <p className="text-base">{detail?.description}</p>
              <p className="text-base">
                <b>Category: {detail?.category?.name}</b>
              </p>
              <p>
                <b className="text-success text-xl">Price: </b>
                <span className="text-success text-xl font-bold">
                  &#8377;{detail?.price}
                </span>
              </p>
              {detail.quantity < 10 ? (
                <p className="text-error">
                  <b>{detail?.quantity} Items left</b>
                </p>
              ) : (
                <p className="text-success">
                  <b>{detail?.quantity} Items left</b>
                </p>
              )}
              <AddToCart product={detail} width={5} height={3} />
            </div>
          </div>

          <div className="mt-10">
            <h4 className="text-center text-accent font-bold text-xl mb-5">
              Similar Products
            </h4>
            {similarProducts.length <= 0 ? (
              <div className="text-center text-accent font-bold">
                Oops! No Similar Products Found
              </div>
            ) : (
              <div className="px-5">
                <Slider {...settings}>
                  {similarProducts.map((s) => (
                    <Link
                      to={`/dashboard/admin/product/${s._id}`}
                      className="bg-secondary p-2 rounded-custom text-dark mx-2 w-64 min-h-96 flex flex-col justify-between shadow-lg"
                      key={s._id}
                    >
                      <img
                        className="w-full h-72 object-cover rounded-md"
                        src={`${
                          import.meta.env.VITE_APP_API_KEY
                        }/api/v1/product/product-photo/${s._id}`}
                        alt="Similar Product"
                      />
                      <div className="w-full bg-primary">
                        <h5 className="font-semibold text-lg">{s.name}</h5>
                        <p className="text-sm">
                          {s.description.substring(0, 25)}...
                        </p>
                      </div>
                      <div className="text-sm font-semibold text-dark bg-primary p-2 w-full">
                        &#8377;{s.price} | Stock {s.quantity} items
                      </div>
                      <div className="flex justify-evenly w-full bg-primary">
                        <AddToCart product={s} width={2} height={1} />
                        <SeeMore pId={s._id} cId={s.category} />
                      </div>
                    </Link>
                  ))}
                </Slider>
              </div>
            )}
          </div>
        </div>
      )}
    </Layout>
  );
}

export default SingleProductDetail;
