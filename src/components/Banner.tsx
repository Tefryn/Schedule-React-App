import { Button } from './Button'
import { signInWithGoogle, signOut, useAuthState } from '../utilities/firebase'


export const Banner = () => {
  const { user } = useAuthState();

  return (
    <>
      <div className="p-2 flex gap-4">
        <span className="text-xl text-blue-400">
          Welcome, { user ? user.displayName : 'guest' }!
        </span>
        <span className="ml-auto">
          {
            user
            ? <Button text="Sign Out" onClick={signOut}/>
            : <Button text="Sign In" onClick={signInWithGoogle}/>
          }
        </span>
      </div>
      <hr className="my-4" />
    </>
  );
};