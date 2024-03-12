export function getReceiverMessages(messages, receiverId) {
  return messages.filter(
    (message) =>
      message.senderId === receiverId || message.receiverId === receiverId
  );
}
