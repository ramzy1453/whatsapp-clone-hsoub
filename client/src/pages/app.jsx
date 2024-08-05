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

const socket = {
  on(e, cb) {
    return cb(e);
  },
};

// الحدث لما المستخدم يبدأ يكتب
socket.on("typing", (receiverId) => {
  // نبعث حدث "typing" للطرف الآخر اللي هو المستقبل
  socket.to(receiverId).emit("typing", socket.userId);
});

// الحدث لما المستخدم يتوقف عن الكتابة
socket.on("stop_typing", (receiverId) => {
  // نبعث حدث "stop_typing" للطرف الآخر اللي هو المستقبل
  socket.to(receiverId).emit("stop_typing", socket.userId);
});

// // عند بدء الكتابة أو التوقف عن الكتابة، نقوم بإرسال حدث إلى الخادم
// useEffect(() => {
//   // إذا كان هناك مدخلات (input) ووجود اتصال بالخادم (socket)
//   if (socket && input) {
//     // نرسل حدث "typing" إلى الخادم، مع إرسال ID الطرف المستقبل
//     socket.emit("typing", receiverId.slice(1));
//   } else {
//     // إذا لم يكن هناك مدخلات (input) أو لم يكن هناك اتصال بالخادم (socket)
//     // نرسل حدث "stop_typing" إلى الخادم، مع إرسال ID الطرف المستقبل
//     socket.emit("stop_typing", receiverId.slice(1));
//   }
// }, [input, socket, receiverId]); // التابع يتم تشغيله عند تغيير أي من input، socket، أو receiverId
