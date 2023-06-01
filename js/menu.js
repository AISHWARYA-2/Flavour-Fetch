function init_user_database() {
    if (localStorage.getItem("foodlover_user_dashboard") !== null) {
        console.log("DB is already existig...");
    } else {
        let defaultData = '{"name":"Suku","cart":[]}';
        localStorage.setItem("foodlover_user_dashboard", defaultData);
        console.log("DB was not existing So, created ney DB...");
    }
}
function init_database(){
    if (localStorage.getItem("foodlover_chef_dashboard") !== null) {
        console.log("DB is already existig...");
    } else {
        let defaultData = '{"name":"Suku","food":[]}';
        localStorage.setItem("foodlover_chef_dashboard", defaultData);
        console.log("DB was not existing So, created ney DB...");
    }
}

function addinCart(n,c,q){
    // add into cart and sum it and show
    console.log("Added in cart");
    let retrievedData = JSON.parse(localStorage.getItem("foodlover_user_dashboard"));
    retrievedData.cart.push({name: n, cost: c, quantity: q, totalC: q*c});
    let updatedData = JSON.stringify(retrievedData);
    localStorage.setItem("foodlover_user_dashboard", updatedData);

    displayCartData();
    console.log("Sucefually added");
    
    location.reload(); 
}

function dispalyMenu(){
    let myfooddata = document.getElementById("foodData");
    let chefName = document.getElementById("user_name");
    let retrievedData = JSON.parse(localStorage.getItem("foodlover_chef_dashboard"));
    var dataToP = ""

    //Debug
    //console.log(retrievedData["name"]);
    //console.log(retrievedData["food"].length);
    
    chefName.innerHTML = '<h1>' + retrievedData["name"] + '</h1>';

    for (var i = 0; i < retrievedData["food"].length; i++) {
        dataToP += '<div class="provideFood">'
        dataToP += '<img src=' + retrievedData["food"][i]["img"] + ' alt="FoodPic" >'
        dataToP += '<p> Name : ' + retrievedData["food"][i]["name"] + '</p>'
        dataToP += '<p> Cost Set : ' + retrievedData["food"][i]["cost"] + '</p>'
        dataToP += '<span onclick="addinCart(\''+retrievedData["food"][i]["name"]+'\','+retrievedData["food"][i]["cost"]+','+1+');">Grab It <i class="fa-solid fa-utensils"></i></span>'
        dataToP += '</div>'
    }
    myfooddata.innerHTML += dataToP;
}

function displayCartData(){
    let myfooddata = document.getElementById("CartData");
    let totalCost = document.getElementById("totalCost");
    let retrievedData = JSON.parse(localStorage.getItem("foodlover_user_dashboard"));
    var dataToP = ""
    var total = 0

    //Debug
    //console.log(retrievedData["name"]);
    console.log(retrievedData["cart"].length);

    //chefName.innerHTML = '<h1>' + retrievedData["name"] + '</h1>';
    if(retrievedData["cart"].length<1){
        dataToP = '<p>Still You Did\'t took anything to eat</p>'
        total = "Take Fist, Then See how much to Pay..."
    }
    else{
        for (var i = 0; i < retrievedData["cart"].length; i++) {
            dataToP += '<div class="cart">'
            dataToP += '<i class="fa-solid fa-parachute-box" id="iconCart"></i><br>'
            dataToP += '<p> Name : ' + retrievedData["cart"][i]["name"] + '</p>'
            dataToP += '<p> Cost Set : ' + retrievedData["cart"][i]["cost"] + '</p>'
            dataToP += '<p> Cost Set : ' + retrievedData["cart"][i]["quantity"] + '</p>'
            dataToP += '<p> Cost Set : ' + retrievedData["cart"][i]["totalC"] + '</p>'
            dataToP += '</div>';
            total += retrievedData["cart"][i]["totalC"];
        }
    }
    console.log(total);
    myfooddata.innerHTML += dataToP;
    totalCost.innerText = total;
}

function checkout(a,n,pn){
    // empty the cart and sent the data to another DB in order dasbhord keep the address, name of the foods, total cost
    if (localStorage.getItem("foodlover_order") !== null) {
        console.log("DB is already existig...");
    } else {
        let defaultData = '{"order":[]}';
        localStorage.setItem("foodlover_order", defaultData);
        console.log("DB was not existing So, created ney DB...");
        alert("Fist Order then press Checkout");
    }
    let retrievedDataS = JSON.parse(localStorage.getItem("foodlover_user_dashboard"));
    if(retrievedDataS["cart"].length<1){
        alert("Fist Order then press Checkout");
    }
    else{
        var food = ""
        var total = 0
        for (var i = 0; i < retrievedDataS["cart"].length; i++) {
            food += retrievedDataS["cart"][i]["name"] + ' x ' + retrievedDataS["cart"][i]["quantity"] +'<br>'
            total += retrievedDataS["cart"][i]["totalC"];
        }
        let retrievedData = JSON.parse(localStorage.getItem("foodlover_order"));
        console.log({address:a.value,name:n.value,pnum:pn.value,Tcost:total,Items:food});
        retrievedData.order.push({address:a.value,name:n.value,pnum:pn.value,Tcost:total,Items:food});
        let updatedData = JSON.stringify(retrievedData);
        localStorage.setItem("foodlover_order", updatedData);

        console.log("Sucefually added");
        
        //location.reload(); 
    }
}

function takeOrd(){
    document.getElementById("tkO").style.display = "block";
}


window.onload = function(){
    init_database();
    init_user_database();

    dispalyMenu();
    displayCartData();

    let ord = document.getElementById("GiveForm");
    ord.addEventListener("submit", (e) => {
        e.preventDefault();
      
        let address = document.getElementById("address");
        let name = document.getElementById("nameorder");
        let pnum = document.getElementById("phoneno");

        checkout(address,name,pnum);

        document.getElementById("tkO").style.display = "none";
    });
}