<?php
// اتصال بقاعدة البيانات
$servername = "localhost";
$username = "root";
$password = "";
$dbname = "eva";

$conn = new mysqli($servername, $username, $password, $dbname);

// تحقق من الاتصال
if ($conn->connect_error) {
    die("فشل الاتصال: " . $conn->connect_error);
}

if ($_SERVER['REQUEST_METHOD'] == 'POST') {
    $name = $_POST['name'];
    $semester = $_POST['semester'];
    $phone = $_POST['phone'];

    // التحقق من صحة المدخلات
    if (empty($name) || empty($semester) || empty($phone)) {
        echo json_encode(['status' => 'error', 'message' => 'All fields are required']);
        exit();
    }

    // إدخال بيانات الطالب في قاعدة البيانات
    $sql = "INSERT INTO student (name_student, Id_semester, phone_no) VALUES ('$name', '$semester', '$phone')";
    
    if (mysqli_query($conn, $sql)) {
        echo json_encode(['status' => 'success', 'message' => 'Student registered successfully']);
    } else {
        echo json_encode(['status' => 'error', 'message' => 'Failed to register student']);
    }
}
?>
