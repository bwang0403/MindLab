function scrollToBottom() {
    const messagesBox = document.querySelector('.messages-box');
    setTimeout(() => {
        messagesBox.scrollTop = messagesBox.scrollHeight;
    }, 100); // Ensures smooth scrolling
}

// Function to display chatbot response sentence by sentence with adaptive delay
function displayChatbotResponse(responseText, sender) {
    const messagesList = document.querySelector('.messages-list');

    // Split response into sentences based on punctuation (.!?)
    let sentences = responseText.split(/(?<=[.!?])\s+/);
    let index = 0;

    // Create "Typing..." indicator
    const typingIndicator = document.createElement('li');
    typingIndicator.classList.add('message', 'received');
    typingIndicator.innerHTML = `
        <div class="message-text">
            <div class="message-sender"><b>${sender}</b></div>
            <div class="message-content"><i>Typing...</i></div>
        </div>`;
    messagesList.appendChild(typingIndicator);
    scrollToBottom();

    function showNextSentence() {
        if (index < sentences.length) {
            const sentence = sentences[index];

            // Calculate adaptive delay based on sentence length
            const wordCount = sentence.split(/\s+/).length; // Count words
            let delay = 800 + wordCount * 300; // Base time + (100ms per word)
            delay = Math.min(delay, 6000); // Max delay of 2500ms

            // Remove "Typing..." before adding a new message
            typingIndicator.remove();

            // Create message element
            const messageItem = document.createElement('li');
            messageItem.classList.add('message', 'received');
            messageItem.innerHTML = `
                <div class="message-text">
                    <div class="message-sender"><b>${sender}</b></div>
                    <div class="message-content">${sentence}</div>
                </div>`;
            messagesList.appendChild(messageItem);
            scrollToBottom(); // Scroll down after each sentence

            index++;

            if (index < sentences.length) {
                // Re-add "Typing..." to show more messages are coming
                messagesList.appendChild(typingIndicator);
            }

            setTimeout(showNextSentence, delay); // Adaptive delay
        } else {
            // Remove "Typing..." indicator when done
            typingIndicator.remove();
        }
    }

    showNextSentence();
}

// Event listener for sending messages
document.querySelector('.message-form').addEventListener('submit', function (event) {
    event.preventDefault();

    const messageInput = document.querySelector('.message-input');
    const messagesList = document.querySelector('.messages-list');
    const message = messageInput.value.trim();
    if (message.length === 0) return;

    // Append user's message
    const messageItem = document.createElement('li');
    messageItem.classList.add('message', 'sent', 'therapist'); // Added 'therapist' class
    messageItem.innerHTML = `
        <div class="message-text">
            <div class="message-sender"><b>Therapist</b></div>
            <div class="message-content">${message}</div>
        </div>`;
    messagesList.appendChild(messageItem);
    scrollToBottom();


    messageInput.value = '';

    // Append initial "Typing..." indicator before chatbot response
    const typingIndicator = document.createElement('li');
    typingIndicator.classList.add('message', 'received');
    typingIndicator.innerHTML = `
        <div class="message-text">
            <div class="message-sender"><b>Instructor</b></div>
            <div class="message-content"><i>Typing...</i></div>
        </div>`;
    messagesList.appendChild(typingIndicator);
    scrollToBottom();

    // Send request to chatbot
    fetch('', {
        method: 'POST',
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
        body: new URLSearchParams({
            'csrfmiddlewaretoken': document.querySelector('[name=csrfmiddlewaretoken]').value,
            'message': message
        })
    })
    .then(response => response.json())
    .then(data => {
        setTimeout(() => {
            typingIndicator.remove(); // Remove initial "Typing..." indicator
            displayChatbotResponse(data.response, "Instructor"); // Display response sentence by sentence with adaptive timing
        }, 1000); // Initial delay before chatbot starts responding
    });
});
