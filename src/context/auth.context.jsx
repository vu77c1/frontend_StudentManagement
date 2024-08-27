import {createContext, useState} from 'react';

export const AuthContext = createContext({
  username: "",
  password: "",
  role: "",
  userId: ""
});

export const AuthWrapper = (props) => {
  const [user, setUser] = useState({
    username: "",
    password: "",
    role: "",
    userId: ""
  })
  return (
      <AuthContext.Provider value={{
        user, setUser,
      }}>

        {props.children}
      </AuthContext.Provider>
  )
}
