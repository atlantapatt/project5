import { useEffect } from "react";
import ConfirmPopUp from "./ConfrimPopUp";
import WriteReview from "./WriteReview";

function ProductInfo({url, onClick, confirmed, setConfirmed, setCurrentProduct, currentProduct, addToProducts, addWishClick, setWriteReview, writeReview, setRating, setInfo, addToReview, reviews, mappedReviews}) {
    
    
    useEffect(() => {
        fetch(`/products/${url}`).then((response) => {
            if (response.ok) {
                response.json().then((product) => setCurrentProduct(product))
            } 
        })
    },[url])

    return ( 
        <div className="product-div">
            <button onClick={onClick}>BACK</button>
            <div className={`confirm ${confirmed ? 'active' : 'inactive'}`}>
                <ConfirmPopUp setConfirmed={setConfirmed} />
            </div>
            <br></br>
            <div className="product-info">
                <div className="product-image">
                    <img src={currentProduct.image}></img>
                </div>
                <div className="product-text">
                    <h3>{currentProduct.className}</h3>
                    <h4>{currentProduct.brand}</h4>
                    <h5>{currentProduct.category}</h5>
                    <p>{currentProduct.description}</p>
                </div>
                <div className="product-buttons">
                    <button onClick={addToProducts}>Add To My Products</button>
                    <button onClick={addWishClick}>Add to Wishlist</button>
                </div>
            </div>
            
            <div className="product-reviews">
                <button onClick={(() => setWriteReview(!writeReview))}>Write Review</button>
                <br></br>
                {writeReview ? <WriteReview setRating={setRating} setInfo={setInfo} addToReview={addToReview} /> : null}
                {reviews.length == 0 ? "Be the first to review!" : mappedReviews} 
            </div>
        </div>
     );
}

export default ProductInfo;