<?php
header('Content-Type: application/json');

$servername = "localhost"; // اسم الخادم
$username = "root"; // اسم المستخدم
$password = ""; // كلمة المرور
$dbname = "eva"; // اسم قاعدة البيانات

// إنشاء الاتصال
$conn = new mysqli($servername, $username, $password, $dbname);

// تحقق من الاتصال
if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
}

// تأكد من أن البيانات مستلمة
if (isset($_POST['name_course'])) {
    $name_course = $conn->real_escape_string($_POST['name_course']);

    $sql = "DELETE FROM course WHERE name_course = '$name_course'";
    
    if ($conn->query($sql) === TRUE) {
        echo json_encode(['message' => 'Course deleted successfully']);
    } else {
        echo json_encode(['message' => 'Error deleting course: ' . $conn->error]);
    }
} else {
    echo json_encode(['message' => 'Invalid input']);
}

$conn->close();
?>
