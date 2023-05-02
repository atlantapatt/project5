import { useEffect, useState } from "react";
import './CSS/Account.css'
import EditAccount from "./EditAccount";
import ReviewCard from "./ReviewCard";

function Account({user, setUser}) {
    const [accountReviews, setAccountReviews] = useState([])
    const [newPhoto, setNewPhoto] = useState()
   
    const [bio, setBio] = useState(user.bio)
    const [editing, setEditing] = useState(false)
    

console.log(user)
console.log(accountReviews)

useEffect(() => {
    fetch(`/myreviews/${user.id}`).then((response) => {
        if (response.ok) {
            response.json().then((reviews) => setAccountReviews(reviews))
        }
    })
},[])

    useEffect(() => {
        if (user.bio == ''){
            setBio("No Bio Written")
        }
    },[])

    let mappedAccountReviews = accountReviews.map((review) => {
        return <div className="account-reviews">
        <div className="account-review-image">
            <img id="product-image" src={review.product.image}></img>
        </div>
        <ReviewCard review={review} />
        </div>
    })

    return ( 
        <div className="account">
            {/* ACCOUNT */}
            <br></br>
            <div className="user-profile">
                <div className="user-image">
                    {user.image == null ? <i id="icon" class="fa-solid fa-user"></i> : <img id="image" src={user.image}></img>}
                </div>
              <p>{user.username}</p>
              <div className="account-interact">
                    <div onClick={(() => setEditing(!editing))} id="edit" className="edit-profile">
                        <i class="fa-solid fa-pen-to-square"></i>
                        <p>Edit Profile</p>
                    </div>
                    <div className="edit-profile">
                        <i class="fa-solid fa-trash"></i>
                        <p>Delete Profile</p>
                    </div>
                </div>
                <p>{user.username}'s Bio:</p>
                <p>{user.bio}</p>  
                {editing ? <EditAccount editing={editing} setEditing={setEditing} setUser={setUser} setBio={setBio} setNewPhoto={setNewPhoto} newPhoto={newPhoto} bio={bio} user={user} /> : null}

            </div>
            <div className="user-reviews">
                <p>Reviews</p>
                {accountReviews.length == 0 ? <p>No Reviews Yet! Write Some!</p> : mappedAccountReviews}
            </div>
           <div className="account-links">
                <h3>My Products</h3>
                <h3>My Wishlist</h3>
                <p>Wishlist Top 3</p>
           </div>
           
            
        </div>
     );
}

export default Account;