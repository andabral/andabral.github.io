const handleSubmit = async (event) => {
    event.preventDefault();
    
    const apiKey = 're_KHvgH9by_9n9VjPxS9CC1nrdfqhnksi65';
    const formData = new FormData(event.target);
    
    try {
        const response = await fetch('https://api.resend.com/emails', {
            method: 'POST',
            headers: {
                'Authorization': `Bearer ${apiKey}`,
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                from: 'Portfolio <noreply@tu-dominio.com>',
                to: ['andabral@gmail.com'],
                subject: 'Nuevo mensaje de portfolio',
                html: `<p>De: ${formData.get('fullname')} (${formData.get('email')})</p>
                       <p>${formData.get('message')}</p>`
            })
        });

        if (response.ok) {
            alert('Mensaje enviado correctamente');
            event.target.reset();
        } else {
            throw new Error('Error en el servidor');
        }
    } catch (error) {
        console.error('Error:', error);
        alert('Error al enviar el mensaje');
    }
};

// Inicialización del event listener
document.addEventListener('DOMContentLoaded', () => {
    const form = document.querySelector('form');
    if (form) {
        form.addEventListener('submit', handleSubmit);
    }
});