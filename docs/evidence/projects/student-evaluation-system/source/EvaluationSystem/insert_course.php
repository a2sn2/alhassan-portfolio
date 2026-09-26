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
if (isset($_POST['name_course']) && isset($_POST['Id_type_course'])) {
    $name_course = $conn->real_escape_string($_POST['name_course']);
    $Id_type_course = $conn->real_escape_string($_POST['Id_type_course']);

    $sql = "INSERT INTO course (name_course, Id_type_course) VALUES ('$name_course', '$Id_type_course')";
    
    if ($conn->query($sql) === TRUE) {
        echo json_encode(['message' => 'Course added successfully']);
    } else {
        echo json_encode(['message' => 'Error adding course: ' . $conn->error]);
    }
} else {
    echo json_encode(['message' => 'Invalid input']);
}

$conn->close();
?>
