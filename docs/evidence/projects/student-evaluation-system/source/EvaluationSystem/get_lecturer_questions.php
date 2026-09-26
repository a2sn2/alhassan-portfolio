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

// جلب أسئلة المحاضر
$sql = "SELECT Id_question_lecturer, text_qestion_lecturer FROM question_lecturer";
$result = $conn->query($sql);

$questions = [];

if ($result->num_rows > 0) {
    while($row = $result->fetch_assoc()) {
        $questions[] = $row;
    }
}

// إعادة إرسال البيانات كـ JSON
header('Content-Type: application/json');
echo json_encode($questions);

$conn->close();
?>
