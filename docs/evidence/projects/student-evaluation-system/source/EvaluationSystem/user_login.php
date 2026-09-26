<?php
session_start();
header('Content-Type: application/json');

$conn = mysqli_connect('localhost', 'root', '', 'eva');

if (!$conn) {
    echo json_encode(['status' => 'error', 'message' => 'فشل الاتصال بقاعدة البيانات']);
    exit();
}

$user_name = $_POST['user_name'] ?? '';
$password = $_POST['password'] ?? '';

if (empty($user_name) || empty($password)) {
    echo json_encode(['status' => 'error', 'message' => 'يرجى ملء جميع الحقول']);
    exit();
}

$query = "SELECT * FROM users WHERE user_name = '$user_name'";
$result = mysqli_query($conn, $query);
$row = mysqli_fetch_assoc($result);

if ($row) {
    if ($password == $row['password']) {
        $_SESSION['Login'] = true;
        $_SESSION['Id_users'] = $row['Id_users'];
        echo json_encode(['status' => 'success', 'message' => 'تم تسجيل الدخول بنجاح']);
    } else {
        echo json_encode(['status' => 'error', 'message' => 'كلمة المرور غير صحيحة']);
    }
} else {
    echo json_encode(['status' => 'error', 'message' => 'المستخدم غير مسجل']);
}

// إغلاق الاتصال بقاعدة البيانات
mysqli_close($conn);
?>
