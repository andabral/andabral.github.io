<?php
$api_key = 're_KHvgH9by_9n9VjPxS9CC1nrdfqhnksi65';

// Validación y sanitización
$name = filter_input(INPUT_POST, 'fullname', FILTER_SANITIZE_STRING);
$email = filter_input(INPUT_POST, 'email', FILTER_SANITIZE_EMAIL);
$message = filter_input(INPUT_POST, 'message', FILTER_SANITIZE_STRING);

$ch = curl_init('https://api.resend.com/emails');
curl_setopt_array($ch, [
    CURLOPT_HTTPHEADER => [
        'Authorization: Bearer '.$api_key,
        'Content-Type: application/json'
    ],
    CURLOPT_POSTFIELDS => json_encode([
        'from' => 'Portfolio <noreply@tu-dominio.com>',
        'to' => ['andabral@gmail.com'],
        'subject' => 'Nuevo mensaje de portfolio',
        'html' => "<p>De: $name ($email)</p><p>$message</p>"
    ]),
    CURLOPT_RETURNTRANSFER => true
]);

$response = curl_exec($ch);
if(curl_getinfo($ch, CURLINFO_HTTP_CODE) === 200) {
    echo 'OK'; // Respuesta para el frontend
} else {
    error_log('Error Resend: '.$response);
    http_response_code(500);
}