function scrollToBottom() {
    const messagesBox = document.querySelector('.messages-box');
    setTimeout(() => {
        messagesBox.scrollTop = messagesBox.scrollHeight;
    }, 100); // Ensures smooth scrolling
}

// Function to display chatbot response sentence by sentence with adaptive delay
function displayChatbotResponse(responseText, sender) {
    const messagesList = document.querySelector('.messages-list');

    let sentences = responseText.split(/(?<=[.!?])\s+/);
    let index = 0;

    const typingIndicator = document.createElement('li');
    typingIndicator.classList.add('message', 'received');
    typingIndicator.innerHTML = `
        <div class="message-text">
            <div class="message-sender"><b>${sender}</b></div>
            <div class="message-content"><i>입력 중...</i></div>
        </div>`;
    messagesList.appendChild(typingIndicator);
    scrollToBottom();

    function showNextSentence() {
        if (index < sentences.length) {
            const sentence = sentences[index];
            const wordCount = sentence.split(/\s+/).length;
            let delay = 800 + wordCount * 300;
            delay = Math.min(delay, 6000);

            typingIndicator.remove();

            const messageItem = document.createElement('li');
            messageItem.classList.add('message', 'received');
            messageItem.innerHTML = `
                <div class="message-text">
                    <div class="message-sender"><b>${sender}</b></div>
                    <div class="message-content">${sentence}</div>
                </div>`;
            messagesList.appendChild(messageItem);
            scrollToBottom();

            index++;

            if (index < sentences.length) {
                messagesList.appendChild(typingIndicator);
            }

            setTimeout(showNextSentence, delay);
        } else {
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

    const messageItem = document.createElement('li');
    messageItem.classList.add('message', 'sent', 'therapist');
    messageItem.innerHTML = `
        <div class="message-text">
            <div class="message-sender"><b>상담자</b></div>
            <div class="message-content">${message}</div>
        </div>`;
    messagesList.appendChild(messageItem);
    scrollToBottom();

    messageInput.value = '';

    const typingIndicator = document.createElement('li');
    typingIndicator.classList.add('message', 'received');
    typingIndicator.innerHTML = `
        <div class="message-text">
            <div class="message-sender"><b>강사</b></div>
            <div class="message-content"><i>입력 중...</i></div>
        </div>`;
    messagesList.appendChild(typingIndicator);
    scrollToBottom();

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
            typingIndicator.remove();
            displayChatbotResponse(data.response, "강사");
        }, 1000);
    });
});
