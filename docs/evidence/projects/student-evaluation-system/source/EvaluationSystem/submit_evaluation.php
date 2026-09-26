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

// قراءة البيانات القادمة من الطلب
$data = json_decode(file_get_contents('php://input'), true);

// تخزين الإجابات الخاصة بالمحاضر
$lecturer_answers = $data['lecturer_answers'];
foreach ($lecturer_answers as $question_id => $answer) {
    $sql = "INSERT INTO lecturer_evaluations (question_id, answer) VALUES ('$question_id', '$answer')";
    $conn->query($sql);
}

// تخزين الإجابات الخاصة بالدورة
$course_answers = $data['course_answers'];
foreach ($course_answers as $question_id => $answer) {
    $sql = "INSERT INTO course_evaluations (question_id, answer) VALUES ('$question_id', '$answer')";
    $conn->query($sql);
}

// إعادة إرسال استجابة بنجاح العملية
header('Content-Type: application/json');
echo json_encode(['status' => 'success']);

$conn->close();
?>
