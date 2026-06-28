const messages = [
  {
    text: "Hi there!",
    user: "Amando",
    added: new Date()
  },
  {
    text: "Hello World!",
    user: "Charles",
    added: new Date()
  }
];

async function getMessageDetails(messageText) {
  return messages.find(message => message.text === messageText);
};

export { messages, getMessageDetails };
