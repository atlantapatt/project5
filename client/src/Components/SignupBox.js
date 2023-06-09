import { useEffect, useState } from "react";
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";


function SignupBox({setUser, user}) {
    const [username, setUsername] = useState("")
    const [password, setPassword] = useState("")
    const [errors, setErrors] = useState([])

    const history = useHistory()

    function signup() {
        fetch('/signup', {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                username,
                password,
            }),
        }).then((r) => {
            if (r.ok) {
                r.json().then((user) => setUser(user)) 
            } 
            else {
                //find out how to get full messages
                r.json().then((err) => setErrors(err.errors))
            }
        })
       
    }
console.log(user)
    // function createWishlist() {
     
function goToAccount() {
    history.push('/account')
}

    function onSubmit(e) {
        e.preventDefault()
        console.log(errors)
        signup()
        console.log(user)
        if (!user == null) {
            fetch('/wishlists', {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    user_id: user.id 
                }),
            }).then((r) => {
                if (r.ok) {
                    r.json().then((wishlist) => console.log(wishlist))
                } 
            })
        }
    }

    console.log(errors)

   

    let myErrors = errors.map((err) => {
      return <p>{err}</p>
        
    })

    return ( 
        <div className="signup">
            <form onSubmit={onSubmit}>
                <label>Username: </label>
                <br></br>
                <input type="text" value={username} onChange={(e) => setUsername(e.target.value)}></input>
                <br></br>
                <label>Password: </label>
                <br></br>
                <input className="password" type="password" value={password} onChange={(e) => setPassword(e.target.value)}></input>
                <br></br>
                <lable>Confirm Password</lable>
                <br></br>
                <input className="password" type="password"></input>
                <br></br>
                <button>Submit</button>
                <form className="error-form">
                    {myErrors}
                </form>
            </form>
        </div>
     );
}

export default SignupBox;