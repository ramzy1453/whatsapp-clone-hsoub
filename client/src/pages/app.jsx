import React, { useEffect } from "react";
import { useStore } from "../libs/globalState";
import { getMessages, getUsers } from "../libs/requests";

export default function App() {
  const { setFriends, setMessages, accessToken } = useStore();
  useEffect(() => {
    const fetchData = async () => {
      const users = await getUsers(accessToken);
      const messages = await getMessages(accessToken);

      setFriends(users);
      setMessages(messages);
    };
    fetchData();
  }, []);
  return <div>s</div>;
}
