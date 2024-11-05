const feedElement = document.getElementById('feed');

async function fetchMessages() {
    try {
        let res = await fetch('http://localhost:8080/messages', {
            method: 'GET',
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded'
            }
        });
        if (res.status === 200) {
            let data = await res.json();
            if (data.length > 0) {
                data.forEach((message) => {
                    let messageElement = document.createElement('div');
                    messageElement.classList.add('message');
                    let nameElement = document.createElement('h3');
                    nameElement.textContent = message.name;
                    let emailElement = document.createElement('p');
                    emailElement.textContent = message.email;
                    let messageContent = document.createElement('p');
                    messageContent.textContent = message.message;
                    messageElement.appendChild(nameElement);
                    messageElement.appendChild(emailElement);
                    messageElement.appendChild(messageContent);
                    feedElement.appendChild(messageElement);
                });
            } else {
                console.log('No messages to show');
            }
        } else {
            console.log('Messages not fetched');
            return null;
        }
    } catch (error) {
        console.error(error, ' error');
        return null;
    }
}
// fetchMessages();