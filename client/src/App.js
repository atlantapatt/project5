import React, { useContext, useEffect, useState } from 'react';
import './App.css';
import { UserContext } from './Context/UserContext'
import { Switch, Route } from 'react-router-dom';
import Account from './Components/Account';
import Home from './Components/Home';
import Navbar from './Navbar';
import Login from './Components/Login';
import Products from './Components/Products';
import ProductCard from './Components/ProductCard';
import ProductPage from './Components/ProductPage';
import MyProducts from './Components/AccountComponents/MyProducts';
import MyWishlist from './Components/AccountComponents/MyWishlist';
import { useHistory, useRouteMatch } from 'react-router-dom/cjs/react-router-dom.min';

function App() {
  const [products, setProducts] = useState([])
  const [productName, setProductName] = useState('')
  const [url, setUrl] = useState('')
  const [currentProduct, setCurrentProduct] = useState([])
  const [reviews, setReviews] = useState([])
  const [homeReviews, setHomeReviews] = useState([])
  const [myWishlist, setMyWishlist] = useState([])
  const [myProducts, setMyProducts] = useState([])
  const [wishlistId, setWishlistId] = useState([])
  const [topThree, setTopThree] = useState([])
  const [userId, setUserId] = useState(1)
  const {user, setUser} = useContext(UserContext)

  const match = useRouteMatch()

let history = useHistory()


  console.log(match)
  console.log(currentProduct)

  useEffect(() => {
    fetch('/me').then((response) => {
      if (response.ok) {
        response.json().then((user) => setUser(user))
        // history.push('/account')
      }
       else {
        return <Login user={user} setUser={setUser} />
      }
    })
  },[])

  useEffect(() => {
    fetch('/me').then((response) => {
      if (response.ok) {
        response.json().then((user) => setUserId(user.id))
      }
    })
      
  },[user])


 
  console.log(topThree)
  // console.log(userId)


  useEffect(() => {
    setTopThree(myWishlist.slice(-3))
    console.log(topThree)
  },[myWishlist])



useEffect(() => {
  fetch('/products').then((response) => {
      if (response.ok) {
          response.json().then((products) => setProducts(products))
      }
  })
},[])

useEffect(() => {
  fetch('/reviews').then((response) => {
      if (response.ok) {
          response.json().then((reviews) => setHomeReviews(reviews))
      }
  })
},[reviews])


useEffect(() => {
  fetch(`/my_products/${userId}`).then((response) => {
      if (response.ok) {
          response.json().then((product) => setMyProducts(product))
      }
  })
},[])

useEffect(() => {
    fetch(`/wishlists/${userId}`).then((response) => {
      if (response.ok) {
          response.json().then((wishlist) => setWishlistId(wishlist))
      }
  })
},[])


// console.log(myWishlist)

useEffect(() => {
    fetch(`/product_wishlists/${userId}`).then((response) => {
      if (response.ok) {
          response.json().then((products) => setMyWishlist(products))
      }
  })
},[])


useEffect(() => {
    fetch(`/recentWishlist/${userId}`).then((response) => {
      if (response.ok) {
          response.json().then((products) => setTopThree(products))
      }
  }) 
},[])



// console.log(topThree)

function addReviews(review) {
  setReviews([...reviews, review])
}

function addToWishlist(item) {
  setMyWishlist([...myWishlist, item])
}

function addToMyProducts(item) {
  setMyProducts([...myProducts, item])
}


function deleteMyItems() {
  console.log('deleted item')
}



function goHome() {
  let path = '/home'
  history.push(path)
  console.log('home')
}

// console.log(myProducts)
// console.log(myWishlist)
  console.log(url)



// if (!user) return <Login user={user} setUser={setUser} />

  return (
    <div className='app'>
      <Navbar user={user} setUserId={setUserId} setUser={setUser}/>
      <Switch>
        <Route exact path='/home'>
          <Home topThree={topThree} user={user} homeReviews={homeReviews} setHomeReviews={setHomeReviews}/>
        </Route>
        <Route exact path='/'>
          <Account userId={userId} topThree={topThree} setUser={setUser} user={user}/>
        </Route>
        <Route exact path='/account'>
          <Account />
        </Route>
        <Route exact path='/allproducts'>
          <Products url={url} setUrl={setUrl} currentProduct={currentProduct} setCurrentProduct={setCurrentProduct} productName={productName} setProductName={setProductName} products={products} setProducts={setProducts}/>
        </Route>
        <Route exact path='/product/:id'>
          <ProductPage setUrl={setUrl} userId={userId} addReviews={addReviews} user={user} addToMyProducts={addToMyProducts} wishlistId={wishlistId} setWishlistId={setWishlistId} addToWishlist={addToWishlist} reviews={reviews} setReviews={setReviews} url={url} setCurrentProduct={setCurrentProduct} currentProduct={currentProduct}/>
        </Route>
        <Route exact path='/myproducts'>
          <MyProducts goHome={goHome} deleteMyItems={deleteMyItems} myProducts={myProducts}/>
        </Route>
        <Route exact path='/mywishlist'>
          <MyWishlist goHome={goHome} deleteMyItems={deleteMyItems} url={url} setUrl={setUrl} myWishlist={myWishlist} setMyWishlist={setMyWishlist} wishlistId={wishlistId} setWishlistId={setWishlistId} user={user}/>
        </Route>
      </Switch>
    </div>
  
  );
}

export default App;
