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

$sql = "SELECT * FROM type_course"; // استعلام للحصول على أنواع الكورسات
$result = $conn->query($sql);

$courseTypes = [];
if ($result->num_rows > 0) {
    // إخراج البيانات لكل صف
    while($row = $result->fetch_assoc()) {
        $courseTypes[] = $row;
    }
}

echo json_encode($courseTypes); // إعادة البيانات بصيغة JSON
$conn->close();
?>
