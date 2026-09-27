<?php
 if ($_SERVER['REQUEST_METHOD'] == 'POST') {
include('connection.php'); 

$filename = $_FILES["uploadfile"]["name"];
$tempname = $_FILES["uploadfile"]["tmp_name"];
$folder = "./image/" . $filename;


$title = $_POST['title'];
$price = $_POST['price'];
$taxes = $_POST['taxes'];
$ads = $_POST['ads'];
$discount=$_POST['discount'];
$count = $_POST['count'];
$total = $_POST['total'];
$category = $_POST['category'];

$reg = false;








if($price=="" || $taxes=="" || $discount=="" || $ads=="" || $count==""||$filename==NULL|| $category=="" || $total=="")
{
	
	echo  '<script>alert("you can not leave one of the field empty")</script>';
	
}


else{


    if (move_uploaded_file($tempname, $folder)) {
       
$sql = "INSERT INTO `products` (`id`,`title`, `price`,`taxes`, `ads`,`discount`,`count`,`total`,`category`,`picture`) VALUES ('$id', '$title', '$price','$taxes','$ads','$discount','$count','$total','$category','$filename')";
    

    mysqli_query($con, $sql);

    $reg = true;

    header("location:tableview.php?title=$title&reg=$reg");
    }else {
        echo  '<script>alert("Failed to upload image!")</script>';
       

    }

}
 }
?>






<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta http-equiv="X-UA-Compatible" content="IE=edge" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <link rel="stylesheet" href="styles.css" />
    <title>Cruds - Product Management System</title>
    <meta name="description" content="Product Management System built with Html5 , Css3 and JavaScript">

  </head>
  <body>

 
<?php include('head.php'); ?>

    
<div class="crud">





<form action="" method="post"  enctype="multipart/form-data">

      <div class="input">
        <label for="">insert image:
      <input class="" type="file" name="uploadfile" value="" /></label>
      
            <input type="text" id="title" name="title" placeholder="Title">
            <div class="total-price">
                <input oninput="getTotalPrice()" type="number" name="price" id="price" placeholder="Price">
                <input oninput="getTotalPrice()" type="number" name="taxes" id="taxes" placeholder="Taxes">
                <input oninput="getTotalPrice()" type="number" name="ads" id="ads" placeholder="Ads">
                <input oninput="getTotalPrice()" type="number" name="discount" id="discount" placeholder="Discount">
                <input type="text" id="total" name="total"  placeholder="total">
                
            </div>
            <input type="number" name="count" id="count" placeholder="Count">
            <input type="text" name="category" id="category" placeholder="Category">
            <input type="submit"  value="Create" id="create">
            <input type="button" onclick="clearInput()" value="Clear" id="Clear">
      </div>

  </form>

 



   
    <script src="script.js"></script>
  </body>
</html>
<script>
   let id = document.getElementById("id")
  let title = document.getElementById("title")
let price = document.getElementById("price")
let taxes = document.getElementById("taxes")
let ads = document.getElementById("ads")
let discount = document.getElementById("discount")
let total = document.getElementById("total")
let count = document.getElementById("count")
let category = document.getElementById("category")
let search = document.getElementById("search");
let currUpdateBtn;
let searchedItem = "title";
let tbody = document.getElementById("tbody");

</script>
<script>
  
// Calculate Total Price
function getTotalPrice(){
    if (price.value != "") {
        total.value = +price.value + +taxes.value + +ads.value - +discount.value;
        total.style.backgroundColor = "rgb(56, 146, 56)"
    }else {
        total.style.backgroundColor = "rgb(75, 5, 5)";
        total.value = ""
    }
}
</script>
<script>
  function clearInput(){
   id.value=""; 
title.value = "";
price.value = "";
taxes.value = "";
ads.value = "";
discount.value = "";
total.value = "";
count.value = "";
category.value = "";
}
</script>