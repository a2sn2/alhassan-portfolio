<?php
    session_start();
    $conn = mysqli_connect('localhost', 'root', '', 'eva');
    
    if(isset($_POST['user_name']) && isset($_POST['password'])) {
        $username = $_POST['user_name'];
        $password = $_POST['password'];
        
        $query = "SELECT * FROM users WHERE user_name = '$username'";
        $result = mysqli_query($conn, $query);
        $row = mysqli_fetch_assoc($result);
        
        if(mysqli_num_rows($result) > 0) {
            if($password == $row['password']) {
                $_SESSION['Login'] = true;
                $_SESSION['Id_users'] = $row['Id_users'];
                echo json_encode([
                    'status' => 'success',
                    'Id_users' => $row['Id_users']
                ]);
            } else {
                echo json_encode([
                    'status' => 'error',
                    'message' => 'Wrong password'
                ]);
            }
        } else {
            echo json_encode([
                'status' => 'error',
                'message' => 'User Not Registered'
            ]);
        }
    }
?>
