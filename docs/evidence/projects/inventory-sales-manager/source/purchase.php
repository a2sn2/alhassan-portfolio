<?php
include('connection.php'); 


$id = $_POST['id'];
$title = $_POST['title'];
$count = $_POST['count'];
$total = $_POST['total'];
$count2 = $_POST['count2'];
$buy = false;




   


if($id=="" || $count==""|| $title=="" || $total=="")
{
	
	echo  '<script>alert("you can not leave one of the field empty")</script>';
	
}


else{


    
       
$sql = "INSERT INTO `sale` (`id`,`title`,`amount`,`paid`) VALUES ('$id', '$title','$count','$total')";


   mysqli_query($con, $sql);
    mysqli_query($con, "UPDATE products set count = $count2  WHERE id= $id ");
    $buy = true;

    header("location:buy.php?title=$title&buy=$buy&amount=$count");
   

}

?>