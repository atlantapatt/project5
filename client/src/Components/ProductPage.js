import { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import './CSS/ProductPage.css'
import ReviewCard from "./ReviewCard";
import WriteReview from "./WriteReview";
import ConfirmPopUp from "./ConfrimPopUp";
import ProductInfo from "./ProductInfo";
import Loading from "./Loading";
import { useParams, useRouteMatch } from "react-router-dom/cjs/react-router-dom.min";

function ProductPage({userId, setUrl, user ,addToMyProducts ,wishlistId, addReviews, addToWishlist, reviews, setReviews, url, currentProduct, setCurrentProduct}) {
    const [writeReview, setWriteReview] = useState(false)
    const [rating, setRating] = useState()
    const [info, setInfo] = useState('')
    const [confirmed, setConfirmed] = useState(false)
    const [rememberUrl, setRememberUrl] = useState()
    const [newImage, setNewImage] = useState(null)


    const history = useHistory()
    const params = useParams()
    console.log(params)
   





    // useEffect(() => {
    //     if (url == '') {
    //         setUrl
    //     }
    // },[])

    // useEffect(() => {
    //     window.localStorage.setItem('CURRENT_PRODUCT', JSON.stringify(currentProduct))
    // },[currentProduct])

    // useEffect(() => {
    //     history.push(`/${url}`)
    // },[url])

    // useEffect(() => {
    //     const data = window.localStorage.getItem('CURRENT_PRODUCT')
    //     if (data) {
    //         setCurrentProduct(JSON.parse(data))
    //     }
    //     console.log(data)

    // },[currentProduct])

    // useEffect(() => {
    //     setUrl(match.path.slice(1))
    // },[url])


    useEffect(() => {
        fetch(`/products/${params.id}`).then((response) => {
            if (response.ok) {
                response.json().then((product) => setCurrentProduct(product))
            } 
        })
    },[params.id])

    useEffect(() => {
        fetch(`/products/${params.id}`).then((response) => {
            if (response.ok) {
                response.json().then((product) => setReviews(product.reviews))
            } 
        })
    },[params.id])


    function onClick() {
        console.log('go back')
        history.push('/allproducts')
        setNewImage(null)
        setCurrentProduct(null)
    }

//not saving
//needs .product
    function addToProducts() {
        fetch(`/my_products/`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                user_id: user.id,
                product_id: currentProduct.id
            }),
        }).then((r) => {
            if (r.ok) {
                r.json().then((product) => addToMyProducts(product.product))
                
            } 
        })
        setConfirmed(true)
        console.log("added to my products")    
    }
//not saving
    function addWishClick() {
        fetch(`/product_wishlists`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                wishlist_id: user.id,
                product_id: currentProduct.id
            }),
        }).then((r) => {
            if (r.ok) {
                r.json().then((wishlist) => addToWishlist(wishlist.product))
                
            } 
        })
        setConfirmed(true)
        console.log("added to wishlist")
    }

console.log(currentProduct)
console.log(url)
// console.log(user.id)
// console.log(confirmed)


    function addToReview(e) {
        e.preventDefault() 
        fetch(`/reviews`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
               user_id: user.id,
               product_id: currentProduct.id,
               rating,
               info
            }),
        }).then((r) => {
            if (r.ok) {
                r.json().then((review) => addReviews(review))
            } 
        })
        setWriteReview(false)
    }


    // let mappedReviews = reviews.map((review) =>{
    //                     return <ReviewCard review={review} />
    //                 })


    console.log(confirmed)
   
    // // console.log(reviews.length == 0)
    // console.log(currentProduct.reviews)
    return ( 
        <div className="single-page">
                {currentProduct == undefined ? <Loading /> : <ProductInfo newImage={newImage} setNewImage={setNewImage} url={url} onClick={onClick} confirmed={confirmed} setConfirmed={setConfirmed} currentProduct={currentProduct} setCurrentProduct={setCurrentProduct} addToProducts={addToProducts} addWishClick={addWishClick} setWriteReview={setWriteReview} writeReview={writeReview} setRating={setRating} setInfo={setInfo} addToReview={addToReview} reviews={reviews} />}
        </div>
     );
}

export default ProductPage;
