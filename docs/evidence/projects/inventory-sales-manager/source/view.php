




<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta http-equiv="X-UA-Compatible" content="IE=edge" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <link rel="stylesheet" href="styles.css" />
    <title>Cruds - Product Management System</title>
    <meta name="description" content="Product Management System built with Html5 , Css3 and JavaScript">
  
<style>


/* Input Styles Start */
.input{
    margin: auto;
    width: 70%;
    text-align: center;
    margin-top: 30px;

}
.input #title{
    width: 100%;
}
.total-price{
    width: 100%;
    margin: auto;
    margin-top: 4px;
    text-align: center;
    display: flex;
    justify-content: space-evenly;
    gap: 10px;
}
.total-price input{
    width: 100px;
}
.total-price #total::before{
    content: 'Total :';
    font-weight: bold;
}
.total-price #total{
    width: 100px;
    height: 40px;
    box-sizing: border-box;
    padding-top: 14px;
    border-radius: 5px;
    text-align: center;
    vertical-align: middle;
    background-color: rgb(75, 5, 5);
}
.input #create:hover{
    background-color: rgb(37, 5, 5);
    font-size: large;
    transition: 0.1s all;
}
.input #create{
    font-style: bold;
    background-color: rgb(75, 5, 5);
    cursor: pointer;
}
/* Input Styles End */






/* Output Styles Start */
.output{
    margin: auto;
    width: 70%;
    text-align: center;
}

.output input[type="button"]:hover{
    background-color: rgb(37, 5, 5);
    font-size: large;
    transition: 0.1s all;
}
.output input[type="button"]{
    font-style: bold;
    background-color: rgb(75, 5, 5);
    cursor: pointer;
}

.type{
 font-weight:bold;
  
width:auto;
text-align:center;
margin: 5px;
}

img{
  border: solid 2px black;
    margin:5px ;
    width: 150px;
    height: 150px;
}


.filechoser{
  margin:0px;
  margin-bottom:30px;
}
#edit{
    display:none;
}
.buy{
    width: 100%;
    margin: auto;
    margin-top: 4px;
    text-align: center;
    display: none;
    justify-content: space-evenly;
    gap: 10px;
}

.buy input{
    min-width: 100px;
    width:auto;
}
</style>
</head>
<?php
       include('connection.php'); 
       $id = $id = $_GET['id'];
        
      
       $sql = " select * from products WHERE  id = $id";
        $result = mysqli_query($con, $sql);

        $data = mysqli_fetch_assoc($result);  
        $pic = $data['picture'];
        $price=$data['price'];
        $title=$data['title'];
        $taxes=$data['taxes'];
        $ads=$data['ads'];
        $discount=$data['discount'];
        $count=$data['count'];
        $total=$data['total'];
        $category=$data['category'];
        
        

        ?>
  <body>

  <?php include('head.php'); ?>

    <div class="crud">

 
   


     
      <h2>*  Personal info</h2>
      
        
        <form action="update.php" method="post" enctype="multipart/form-data">
        
        <div class="text">
          <div>
          <input class="type" name="type" id=""   type="text" value="<?php echo $type=$_GET['type'] ?>" disabled><br>
          <img id="pic" src="./image/<?php echo $pic; ?>"><br>
         
          <label for=""><b>Insert image:</b></label>
          <input class="filechoser" disabled type="file" id="insert" name="uploadfile" value="<?php echo $pic ?>"/>
          </div>
          <div>
          
          <label for=""><b>ID:</b></label>
          <input type="text"  readonly id="id" name="id"  placeholder="ID" disabled value="<?php echo $id = $_GET['id']  ?> " >
          <label for=""><b>Title:</b></label>
          <input value="<?php echo $title  ?>" type="text" id="title" name="title" placeholder="Title"  disabled>
            <div class="total-price">
                <label for=""><b>Price:</b>
                <input oninput="getTotalPrice()" type="number" name="price" disabled id="price" placeholder="Price"  value="<?php echo $price  ?>"></label>
                <label for=""><b>Taxes:</b>
                <input oninput="getTotalPrice()" type="number" name="taxes" disabled id="taxes" placeholder="Taxes" value="<?php echo $taxes  ?>"></label>
                <label for=""><b>Ads:</b>
                <input oninput="getTotalPrice()" type="number" name="ads" disabled id="ads" placeholder="Ads" value="<?php echo $ads  ?>"></label>
                <label for=""><b>Discount:</b>
                <input oninput="getTotalPrice()" type="number" name="discount" disabled id="discount" placeholder="Discount"  value="<?php echo $discount  ?>"></label>
                <label for=""><b>Total:</b>
                <input type="text" id="total" name="total"  placeholder="total" disabled value="<?php echo $total  ?>"></label>
              </div>
              <label for="">Available Amount:</label>
            <input type="number" name="count" id="count" placeholder="Amount" disabled value="<?php echo $count?>">
            <label for="">Category:</label>
            <input type="text" name="category" id="category" placeholder="Category" disabled value="<?php echo $category  ?>">
 
      </div>

          </div>
          <hr>
          <input type="submit" name="editdata" id="edit" class="btns" value="Save" />
          </form>
       
    </div> 
    
    
    <div id="buyform" class="buy">
        <form action="purchase.php" method="post">
            <h3>select the amount you want to buy</h3><br>
            <label for="">ID:</label>
                <input type="text"  readonly id="id1" name="id"  placeholder="ID"  value="<?php echo $id = $_GET['id']  ?> " >
                <label for="">Title:</label>
                <input value="<?php echo $title  ?>" type="text" readonly id="title1" name="title" placeholder="Title"  >
                <input style="display:none;" type="text" readonly id="count2" name="count2" placeholder="available amount"  >
               <br> <label for="">Amount:</label>
                <input type="number" oninput="getTotal()" name="count" id="count1" placeholder="Amount"  min="1" max="<?php echo $count?>">
                <label for="">Total:</label>
                <input type="text" readonly id="total1" name="total"  placeholder="total"  value="">
                <hr>
          <input type="submit" name="buy" id="buy" class="btns" value="buy" disabled/>
            </form>
            </div>



  <script src=""></script>
</body>
</html>

<script>
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

let count2 = document.getElementById("count2")
let total1 = document.getElementById("total1");
let count1 = document.getElementById("count1");
</script>

<script>

type="<?php echo $type=$_GET['type'] ?>";

if(type=="show"){

document.getElementById("edit").style.display="none";
document.getElementById("buyform").style.display="none";



}else if(type=="edit"){

    document.getElementById("insert").disabled=false;
    document.getElementById("id").disabled=false;
			 document.getElementById("title").disabled=false;
			 document.getElementById("price").disabled=false;
			
			 document.getElementById("taxes").disabled=false;
       document.getElementById("ads").disabled=false;

       document.getElementById("discount").disabled=false;
       
       
       document.getElementById("count").disabled=false;
       document.getElementById("total").disabled=false;
      document.getElementById("category").disabled=false;
     
      
      
  document.getElementById("edit").style.display="block";
  document.getElementById("buyform").style.display="none";
}
else if(type=="buy"){
   document.getElementById("buyform").style.display="flex";
}

</script>







   
   
  </body>
</html>
<script>
  
// Calculate Total Price
function getTotalPrice(){
    if (price.value != "") {
        total.value = +price.value + +taxes.value + +ads.value - +discount.value;
        total.style.backgroundColor = "rgb(56, 146, 56)"
       
    }else {count
        total.style.backgroundColor = "rgb(75, 5, 5)";
        total.value = ""
    }
}
</script>

<script>
  
// Calculate Total Price
function getTotal(){
    if (count1.value != "") {
        total1.value = +total.value * +count1.value;
        count2.value = +count.value - +count1.value;
        total1.style.backgroundColor = "rgb(56, 146, 56)";
        document.getElementById("buy").disabled=false;
    }else {
        total1.style.backgroundColor = "rgb(75, 5, 5)";
        total1.value = ""
    }
}
</script>