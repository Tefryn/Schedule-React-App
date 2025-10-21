import { useAuthState, useDataQuery } from "./firebase";
import { type User } from 'firebase/auth'

export const useProfile = (): [{user: User | null, isAdmin: unknown}, boolean, Error | undefined] => {
  const {user} = useAuthState();
  const [isAdmin, isLoading, error] =  useDataQuery(`/admins/${user?.uid || 'guest'}`);
  return [{ user, isAdmin }, isLoading, error];
};