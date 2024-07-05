export function getReceiverMessages(messages, receiverId) {
  if (!messages) return [];
  return messages.filter(
    (message) =>
      message.senderId === receiverId || message.receiverId === receiverId
  );
}
