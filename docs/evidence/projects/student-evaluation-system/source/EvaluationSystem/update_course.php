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
if (isset($_POST['old_name_course']) && isset($_POST['new_name_course'])) {
    $old_name_course = $conn->real_escape_string($_POST['old_name_course']);
    $new_name_course = $conn->real_escape_string($_POST['new_name_course']);

    $sql = "UPDATE course SET name_course = '$new_name_course' WHERE name_course = '$old_name_course'";
    
    if ($conn->query($sql) === TRUE) {
        echo json_encode(['message' => 'Course updated successfully']);
    } else {
        echo json_encode(['message' => 'Error updating course: ' . $conn->error]);
    }
} else {
    echo json_encode(['message' => 'Invalid input']);
}

$conn->close();
?>
