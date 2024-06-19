const form = document.getElementById('submitForm');

form.addEventListener('submit', async (event) => {
    event.preventDefault();

    const id = document.getElementById('id').value;
    const name = document.getElementById('name').value;
    const location = document.getElementById('location').value;

    const response = await fetch('/submit', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ id, name, location })
    });

    const message = await response.text();
    alert(message);
    if (response.ok) {
        form.reset();
    }
});
