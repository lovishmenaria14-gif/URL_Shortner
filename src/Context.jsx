import { createContext, useContext, useEffect } from "react";
import useFetch from "./hooks/Use-fetch";
import { getCurrentUser } from "./db/apiAuth";
import { supabase } from "./db/supabase";

const UrlContext = createContext();

const UrlProvider = ({ children }) => {
  const {
    data: user,
    loading,
    fn: fetchUser,
  } = useFetch(getCurrentUser);

  useEffect(() => {
    fetchUser();

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange(() => {
      fetchUser();
    });

    return () => {
      subscription.unsubscribe();
    };
  }, []);

  const isAuthenticated = !!user;

  return (
    <UrlContext.Provider
      value={{
        user,
        fetchUser,
        loading,
        isAuthenticated,
      }}
    >
      {children}
    </UrlContext.Provider>
  );
};

export const UrlState = () => useContext(UrlContext);

export default UrlProvider;