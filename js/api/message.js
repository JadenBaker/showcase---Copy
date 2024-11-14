const form = document.getElementById('contactModal');
const username = document.getElementById('name');
const email = document.getElementById('email');
const message = document.getElementById('message');

const apiUrl = window.location.protocol === 'file:'
  ? 'http://localhost:8080' // Local API server during development
  : ''; // Production API

form.addEventListener('submit', async (e) => {
    e.preventDefault();
    try {
        const data = {
            username: username.value,
            email: email.value,
            message: message.value
        };
        console.log(data, ' data pre fetch ')
        const res = await fetch(`${apiUrl}/message`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                username: data.username,
                email: data.email,
                message: data.message
            })
        });
        const response = await res.json();
        console.log(response, ' response on message client ');
        if (res.status === 200 || res.status === 201) {
            username.value = '';
            email.value = '';
            message.value = '';
            form.classList.remove('show');
            form.style.display = 'none';
        } else {
            console.log('Message not sent', res);
        }
        console.log(res, ' res ');
    } catch (err) {
        console.error(err, ' error ');
    }
});

