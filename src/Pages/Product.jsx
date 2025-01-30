import { useContext, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { ShopContext } from '../Context/ShopContext';
import { assets } from '../assets/assets';
import RelatedProducts from '../Components/RelatedProducts';

const Product = () => {
  const { productId } = useParams();
  const { products, currency, addToCart } = useContext(ShopContext);
  const [productsData, setProductsData] = useState(false);
  const [image, setImage] = useState('');
  const [size, setSize] = useState('');

  const fetchProductsData = async () => {
    products.map((product) => {
      if (product._id === productId) {
        setProductsData(product);
        setImage(product.image[0]);

        return null;
      }
    });
  };

  useEffect(() => {
    fetchProductsData();
  }, [productId, products]);

  return productsData ? (
    <div className="border-t-2 pt-10 transition-opacity ease-in duration-500 opacity-100">
      {/* ---------------------- Producsts Data ----------------------*/}
      <div className="flex gap-12 sm:gap-12 flex-col sm:flex-row">
        {/* ---------------------- products images ---------------------- */}

        <div className="flex-1 flex flex-col-reverse gap-3 sm:flex-row ">
          {/* ---------------------- List images ----------------------*/}
          <div className="flex sm:flex-col  overflow-x-auto sm:overflow-y-scroll justify-between  sm:justify-normal sm:w-[18.7%] w-full">
            {productsData.image.map((item, index) => (
              <img
                key={index}
                src={item}
                alt="product"
                onClick={() => setImage(item)}
                className="cursor-pointer w-[24%]  sm:w-full sm:mb-3 flex-shrink-0  object-cover"
              />
            ))}
          </div>

          {/*---------------------- main img---------------------- */}
          <div className="w-full sm:w-[80%]">
            <img
              src={image}
              alt="product"
              className="w-full h-auto object-cover"
            />
          </div>
        </div>

        {/* ---------------------- products details ---------------------- */}

        <div className="flex-1">
          <h1 className="font-medium text-2xl mt-2">{productsData.name}</h1>

          <div className="flex items-center gap-1 mt-2">
            <img src={assets.star_icon} alt="" className="w-3 5" />
            <img src={assets.star_icon} alt="" className="w-3 5" />
            <img src={assets.star_icon} alt="" className="w-3 5" />
            <img src={assets.star_icon} alt="" className="w-3 5" />
            <img src={assets.star_dull_icon} alt="" className="w-3 5" />

            <p className="pl-2">(122)</p>
          </div>
          <p className="mt-5 text-3xl font-medium">
            {currency}
            {productsData.price}
          </p>
          <p className="mt-5 text-gray-500 md:w-4/5 ">
            {productsData.description}
          </p>

          <div className="flex flex-col gap-4 my-8">
            <p className="">Select Size</p>
            <div className="flex gap-2">
              {productsData.sizes.map((item, index) => (
                <button
                  key={index}
                  onClick={() => {
                    setSize(item);
                  }}
                  className={`w-8 h-8 border bg-gray-100 flex items-center justify-center cursor-pointer
                  ${item === size ? 'border-orange-500' : ''}
                  `}
                >
                  {item}
                </button>
              ))}
            </div>
          </div>

          <button
            onClick={() => addToCart(productsData._id, size)}
            className="bg-black text-white py-3 px-8 text-sm active:bg-gray-700"
          >
            ADD TO CART
          </button>

          <hr className="mt-8 sm:w-4/5" />

          <div className="flex flex-col gap-1 mt-5 text-sm text-gray-500">
            <p>100% Guaranteed </p>
            <p>Free delivery on Bulk</p>
            <p> Use the integrated chat for further communications  </p>
          </div>
        </div>
      </div>

      {/* ---------------------- Products Description and review section ----------------------*/}

      <div className="mt-10">
        <div className="flex">
          <b className="px-5 py-3 text-sm border">Description</b>
          <p className="px-5 py-3 text-sm border">Info</p>
        </div>

        <div className=" flex flex-col gap-4 border px-6 py-6 text-sm text-gray-500 ">
          <p>
          ScrapLink is an innovative online platform that connects individuals and organizations with available scrap materials to nearby scrap dealers. Acting as a virtual marketplace, it allows users to showcase their scrap materials, interact with potential buyers or sellers, and finalize transactions seamlessly. By eliminating the need for traditional intermediaries, ScrapLink provides a convenient, accessible, and eco-friendly solution for recycling and resource optimization. The platform’s geolocation features, user-friendly design, and secure functionalities make it a valuable tool for fostering a sustainable and circular economy.
          </p>
          <p>
          ScrapLink enables users to list scrap materials with detailed descriptions, including type (e.g., metal, plastic, paper), condition, quantity, and expected price. Each listing is accompanied by relevant images and specifications to provide clarity and transparency. Every scrap material post has its own dedicated page, displaying all necessary details and making it easy for buyers and dealers to assess and make informed decisions.
          </p>
        </div>
      </div>

      {/* ----------------------  Display Products  Products ----------------------*/}

      <RelatedProducts
        category={productsData.category}
        subCategory={productsData.subCategory}
      />
    </div>
  ) : (
    <div className="opacity-0"></div>
  );
};

export default Product;
