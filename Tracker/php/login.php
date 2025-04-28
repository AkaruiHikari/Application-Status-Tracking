<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: Content-Type");
header("Content-Type: application/json");

include 'db_connect.php';

$data = json_decode(file_get_contents("php://input"), true);

// Validate incoming data
if (!isset($data['email']) || !isset($data['password'])) {
    echo json_encode(['success' => false, 'message' => 'Missing credentials']);
    exit;
}

$email = $conn->real_escape_string($data['email']);
$password = $conn->real_escape_string($data['password']);

// Query the users table
$sql = "SELECT * FROM users WHERE email = '$email' AND password = '$password' LIMIT 1";
$result = $conn->query($sql);

if ($result && $result->num_rows > 0) {
    $user = $result->fetch_assoc();

    echo json_encode([
        'success' => true,
        'role' => $user['role'],
        'user' => [
            'id' => $user['id'],
            'email' => $user['email'],
            'role' => $user['role']
        ]
    ]);
} else {
    echo json_encode(['success' => false, 'message' => 'Invalid email or password']);
}

$conn->close();
?>
