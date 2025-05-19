<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: POST, GET, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type");

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
$input_password = $data['password']; // do NOT escape — used in password_verify()

// Query the users table by email only
$sql = "SELECT * FROM users WHERE email = '$email' LIMIT 1";
$result = $conn->query($sql);

if ($result && $result->num_rows > 0) {
    $user = $result->fetch_assoc();
    $hashed_password = $user['password'];

    if (password_verify($input_password, $hashed_password)) {
        // Also check if this email belongs to an applicant
        $sql2 = "SELECT applicant_ID FROM applicants WHERE email_address = '$email' LIMIT 1";
        $result2 = $conn->query($sql2);
        $applicant_ID = ($result2 && $result2->num_rows > 0) ? $result2->fetch_assoc()['applicant_ID'] : null;

        echo json_encode([
            'success' => true,
            'role' => $user['role'],
            'user' => [
                'id' => $user['id'],
                'email' => $user['email'],
                'role' => $user['role'],
                'applicant_ID' => $applicant_ID
            ]
        ]);
    } else {
        echo json_encode(['success' => false, 'message' => 'Invalid email or password']);
    }
} else {
    echo json_encode(['success' => false, 'message' => 'Invalid email or password']);
}

$conn->close();
?>
