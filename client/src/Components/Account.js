import { useEffect, useState } from "react";
import './CSS/Account.css'
import EditAccount from "./EditAccount";
import ReviewCard from "./ReviewCard";
import DeleteAccount from "./DeleteAccount";
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";
import TopThree from "./TopThree";
import Login from "./Login";
import AccountInfo from "./AccountInfo";
import Loading from "./Loading";

function Account({user, setUser, topThree, userId}) {
    const [accountReviews, setAccountReviews] = useState([])
    const [bio, setBio] = useState('')
    const [editing, setEditing] = useState(false)
    

console.log(user)
console.log(accountReviews)

let myTopThree

// useEffect(() => {
//     if (user == undefined) {
//         return <Loading />
//     } else {
//         return user ? <Account/> : <Login />
//     }
// },[])

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



    

    

    let mappedAccountReviews = accountReviews.map((review) => {
        return <div className="account-reviews">
        <div className="account-review-image">
            <img id="product-image" src={review.product.image}></img>
        </div>
        <ReviewCard review={review} />
        </div>
    })

useEffect(() => {
    if (topThree !== undefined) {
        myTopThree = topThree.map((item) => {
            console.log(item)
            return  <div className="wishlist-div">
                <TopThree item={item} />
            </div>
            
         })
    }
},[])



    return ( 
        <div className="account">
            {user == undefined ? <Loading /> : <AccountInfo setAccountReviews={setAccountReviews} userId={userId} bio={bio} setBio={setBio} setUser={setUser} user={user} topThree={topThree}  myTopThree={myTopThree} editing={editing} setEditing={setEditing} accountReviews={accountReviews} mappedAccountReviews={mappedAccountReviews} />}
           
            
        </div>
     );
}

export default Account;