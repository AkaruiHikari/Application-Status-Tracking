<?php
header("Access-Control-Allow-Origin: *"); // allow all origins
header("Access-Control-Allow-Methods: POST, GET, OPTIONS"); // allow these methods
header("Access-Control-Allow-Headers: Content-Type"); // allow Content-Type headers
if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(200);
    exit();
}

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

    // Now find the applicant_ID matching this email
    $sql2 = "SELECT applicant_ID FROM applicants WHERE email_address = '$email' LIMIT 1";
    $result2 = $conn->query($sql2);

    if ($result2 && $result2->num_rows > 0) {
        $applicant = $result2->fetch_assoc();
        $applicant_ID = $applicant['applicant_ID'];
    } else {
        $applicant_ID = null; 
    }

    echo json_encode([
        'success' => true,
        'role' => $user['role'],
        'user' => [
            'id' => $user['id'],
            'email' => $user['email'],
            'role' => $user['role'],
        ]
    ]);
} else {
    echo json_encode(['success' => false, 'message' => 'Invalid email or password']);
}

$conn->close();
?>
