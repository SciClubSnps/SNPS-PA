document.getElementById('messageForm').addEventListener('submit', function(event) {
    event.preventDefault();

    const message = document.getElementById('message').value;

    fetch('/send_message', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ message: message }),
    })
    .then(response => response.json())
    .then(data => {
        const responseElement = document.getElementById('response');
        if (data.status === 'success') {
            responseElement.textContent = `Sent: ${data.message}`;
            responseElement.style.color = 'lightgreen';
        } else {
            responseElement.textContent = data.message;
            responseElement.style.color = 'red';
        }
    })
    .catch(error => {
        console.error('Error:', error);
        const responseElement = document.getElementById('response');
        responseElement.textContent = 'An error occurred.';
        responseElement.style.color = 'red';
    });
});
