import { useState } from "react";
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";

function LoginBox({setUser}) {
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    const [errors, setErrors] = useState([])

    const history = useHistory()

    function onSubmit(e) {
        e.preventDefault()
        fetch('/login', {
            method: 'POST',
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                username,
                password,
            }),
        }).then((r) => {
            if (r.ok) {
                r.json().then((user) => setUser(user))
                
            } else {
                r.json().then((err) => setErrors(err.errors))
            }
        }) 
    }

    let myErrors = errors.map((err) => {
        return (
            <p className="errors">{err}</p>
        )
    })
    return ( 
        <div className="login">
            <form onSubmit={onSubmit}>
                <div className="inputs">
                    <label>Username: </label>
                    <br></br>
                    <input type="text" value={username} onChange={(e) => setUsername(e.target.value)}></input>
                    <br></br>
                    <label>Password: </label>
                    <br></br>
                    <input className="password" type="password" value={password} onChange={(e) => setPassword(e.target.value)}></input>
                </div>
                <button >Submit</button>
                <form className="error-form">
                    {myErrors}
                </form>
            </form>
        </div>
     );
}

export default LoginBox;