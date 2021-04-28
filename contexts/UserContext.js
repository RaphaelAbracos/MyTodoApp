import { parseCookies } from "nookies";
import { createContext, useState } from "react";
export const UserContext = createContext({});

export function UserProvider({ children }) {
  const [userName, setUserName] = useState('');
  const [userEmail, setUserEmail] = useState('');
  const [userId, setUserId] = useState('');
  async function getData() {
    const jwt = parseCookies().jwt
    const { API_URL } = process.env
    const user = await fetch(`${API_URL}/users/me`, {
      method: 'GET',
      headers: {
        'Accept': 'application/json',
        'Authorization': `Bearer ${jwt}`,
      },
    })
    const userResponse = await user.json();
    setUserName(userResponse.username)
    setUserEmail(userResponse.email)
    setUserId(userResponse._id)
  }
  getData()
  return (
    <UserContext.Provider
      value={{
        userName,
        userEmail,
        userId,
      }}
    >
      {children}
    </UserContext.Provider>
  )
}