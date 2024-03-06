import { withAuthenticator } from '@aws-amplify/ui-react';
import '@aws-amplify/ui-react/styles.css';
import { AuthContext } from '../../contexts/authcontext';
import { useContext, useEffect } from 'react';
import { Link } from 'react-router-dom';

function LoginPage({ signOut, user }){
  const auth = useContext(AuthContext);

  useEffect(() => {
    if (auth.user != user) {
      console.log(auth.user)
      console.log(user)
      auth.setUser(user)
    }
  }, [])

  return (
    <>
      <div>
        Hello {auth.user ? auth.user.username : "You should be signed in lol"}!
      </div>
      <Link to={"/"}>
        Go to Homepage
      </Link>
      <div>
        Reminder to replace this page with a custom authentication flow to allow for custom UI and immediate redirect to homepage.
      </div>
    </>
  )

} export default withAuthenticator(LoginPage);