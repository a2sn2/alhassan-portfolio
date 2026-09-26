<?php
    header('Content-Type: application/json');
    $response = array();

    if ($_SERVER['REQUEST_METHOD'] == 'POST') {
        $con = mysqli_connect('localhost', 'root', '', 'eva') or die('Can\'t connect to MySQL server');
        $errors = array();
        $fn = '';
        $ln = '';

        if (empty($_POST['user_name'])) {
            $response['error'] = 'You forgot to enter your username.';
        } else {
            $fn = mysqli_real_escape_string($con, trim($_POST['user_name']));
            $ln = mysqli_real_escape_string($con, trim($_POST['password']));
        }

        if (empty($errors)) {
            $query = "INSERT INTO users (user_name, password) VALUES ('$fn', '$ln')";
            $r = @mysqli_query($con, $query);

            if ($r) {
                $response['success'] = true;
                $response['message'] = 'User registered successfully.';
            } else {
                $response['error'] = 'System Error: ' . mysqli_error($con);
            }
        }
    }
    ?>     