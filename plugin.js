const botMessages = [
  "How can I assist you today?",
  "Feel free to ask any questions.",
  "I'm here to help!",
];

function getRandomBotMessage() {
  const randomIndex = Math.floor(Math.random() * botMessages.length);
  return botMessages[randomIndex];
}

const messagesContainer = document.querySelector(".messages");
const userMessageInput = document.querySelector("#user-message");
const sendButton = document.querySelector("#send-button");

function appendBotMessage(message) {
  const messageDiv = document.createElement("div");
  messageDiv.classList.add("message");
  messageDiv.innerHTML = `<p class="bot">${message}</p>`;
  messagesContainer.appendChild(messageDiv);
  messagesContainer.scrollTop = messagesContainer.scrollHeight;
}

function handleUserMessage() {
  const userMessage = userMessageInput.value.trim();

  if (userMessage !== "") {
    const userMessageDiv = document.createElement("div");
    userMessageDiv.classList.add("message");
    userMessageDiv.innerHTML = `<p class="user">${userMessage}</p>`;
    messagesContainer.appendChild(userMessageDiv);
    userMessageInput.value = "";
    messagesContainer.scrollTop = messagesContainer.scrollHeight;

      const botMessage = userMessage;
      appendBotMessage(botMessage);
  }
}

sendButton.addEventListener("click", handleUserMessage);
userMessageInput.addEventListener("keyup", (event) => {
  if (event.key === "Enter") {
    handleUserMessage();
  }
});

// Initial bot message
  const initialBotMessage = getRandomBotMessage();
  appendBotMessage(initialBotMessage);




  async function sendData(jsonData, time) {
    try {
      const url = 'https://ap-south-1.aws.data.mongodb-api.com/app/data-qvmmr/endpoint/data/v1/action/insertOne';
      const headers = {
        'Content-Type': 'application/json',
        'Access-Control-Request-Headers': '*',
        'api-key': '4xP5sZc7ilp9OTWHYnNYIijKBgZGa4OyGX251pj4Ik6Hxu9UUe6mbOuvmnBTIGNt'
      };
  
      const x = jsonData
  
      const newKey = "branceTime"
      const newValue = time
  
      x[newKey] = newValue
  
      const data = {
        collection: 'testWati',
        database: 'testWati',
        dataSource: 'vetic',
        document: x
      };
  
      const response = await axios.post(url, data, { headers });
      console.log('Document inserted successfully:', response.data);
      let logData = {
        objectId: response.data.insertedId,
        timeWhenDataReceived: time,
        timeWhenDataLogged: Math.floor(Date.now())
      }
      fs.appendFileSync('response.log', "\n" + JSON.stringify(logData, null, 2));
      console.log('Response data written to output.txt');
    } catch (error) {
      console.error('Error inserting document:', error.message);
    }
  }
