'use client'
import React, { useState, useEffect,} from "react";
import { IoIosArrowRoundBack } from "react-icons/io";
import { PiSmileyStickerLight } from "react-icons/pi";
import PaymentPage from "./PaymentPage";
 
export default function Home() {

 

  const [isCurtainUpShop, setIsCurtainUpShop] = useState(true);
  const [showShop, setShowShop] = useState(true);
  const [isCurtainUpPurchase, setIsCurtainUpPurchase] = useState(true);

  const [showPurchase, setShowPurchase] = useState(false);


  {/* ------------------------- Curtain Functions ------------------------- */}
  const toggleCurtainBack = () => {
    setIsCurtainUpShop(false);

    setTimeout(() => {
        setShowShop(false);
        setShowLanding(true);
        setIsCurtainUpShop(true)
    }, 500);
  };

  const toggleCurtainBackPurchase = () => {
    setIsCurtainUpPurchase(false);

    setTimeout(() => {
        setShowPurchase(false);
        setShowShop(true);
        setIsCurtainUpPurchase(true)
    }, 500);
  };

  const toggleCurtainPurchase = () => {
    setIsCurtainUpPurchase(false);
    
    setTimeout(() => {
        setShowPurchase(true);
        setShowShop(false);
        setIsCurtainUpPurchase(true)
    }, 500);
  };


  {/* ------------------------- Product Retrieval ------------------------- */}
  const [products, setProducts] = useState([]);

  useEffect(() => {
      fetch("http://localhost:8000/app/products/", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        } 
      }) 
      .then(response => response.json())
      .then(data => {
        setProducts(data);
      })
      .catch(error => {
        console.error("Error fetching products:", error);
      });
  }, []);

  return (
    <>
      {/* ------------------------- Div Curtain Sections ------------------------- */}
      <div className={`fixed left-0 w-full h-full bg-orange-50 z-10 transition-all duration-500 ease-linear ${isCurtainUpShop ? 'top-[-100%]' : 'top-0'}`}></div>
      <div className={`fixed left-0 w-full h-full bg-orange-50 z-10 transition-all duration-500 ease-linear ${isCurtainUpPurchase ? 'top-[-100%]' : 'top-0'}`}></div>

      {/* ------------------------- Shop Page ------------------------- */}
      {showShop && <section id="shop-page" className="mt-10">
        <main id="product-section">
          <div>
              <ul>
                {/* For now, we just have one item */}
                {products.map(product => ( 
                  <div key={product.id} className="flex flex-col items-center font-bold text-gray-700 mb-12">
                    <div className="flex flex-col w-1/2 h-screen-70 border-2 items-center bg-orange-50">
                      <div className="text-9xl p-5"><PiSmileyStickerLight /></div>
                      <div className="text-4xl p-5">
                        {product.name}
                      </div>
                      <div className="text-2xl p-5">
                        ${product.price}
                      </div>
                      <div className="p-5 border-2 rounded-xl m-3 bg-neutral-50">
                        {product.description}
                      </div>
                      <button className="hover:bg-neutral-50 border-2 rounded-2xl border-gray-700 px-10 py-4 text-2xl font-bold" onClick={ toggleCurtainPurchase }>purchase</button>
                    </div>
                  </div>
                ))}
              </ul>
          </div>
        </main>
      </section>}
      {/* ------------------------- Purchase Page ------------------------- */}
        {showPurchase && (
          <>
          <div className="flex text-4xl text-gray-700 font-bold m-5">
            <span className="my-auto hover:text-neutral-400 cursor-pointer" onClick={toggleCurtainBackPurchase}><IoIosArrowRoundBack /></span>
            <button className="hover:text-neutral-400 rounded-2xl p-2 text-gray-700" onClick={toggleCurtainBackPurchase}>back</button>
          </div>
          <PaymentPage />
          
        </>
        )}
    </>
  );
}

