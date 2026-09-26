<?php
session_start();
header('Content-Type: application/json');

$conn = mysqli_connect('localhost', 'root', '', 'eva');

if (!$conn) {
    echo json_encode(['status' => 'error', 'message' => 'فشل الاتصال بقاعدة البيانات']);
    exit();
}

$Id_student = $_POST['Id_student'] ?? '';
$phone = $_POST['phone'] ?? '';

if (empty($Id_student) || empty($phone)) {
    echo json_encode(['status' => 'error', 'message' => 'يرجى ملء جميع الحقول']);
    exit();
}

$query = "SELECT * FROM student WHERE Id_student = '$Id_student'";
$result = mysqli_query($conn, $query);
$row = mysqli_fetch_assoc($result);

if ($row) {
    if ($phone == $row['phone_no']) {
        $_SESSION['checkbox'] = true;
        $_SESSION['Id_student'] = $row['Id_student'];
        echo json_encode(['status' => 'success', 'message' => 'تم تسجيل الدخول بنجاح']);
    } else {
        echo json_encode(['status' => 'error', 'message' => 'رقم الهاتف غير صحيح']);
    }
} else {
    echo json_encode(['status' => 'error', 'message' => 'الطالب غير مسجل']);
}

mysqli_close($conn);
?>
