function init_database(){
    if (localStorage.getItem("foodlover_chef_dashboard") !== null) {
        console.log("DB is already existig...");
    } else {
        let defaultData = '{"name":"Guest","food":[]}';
        localStorage.setItem("foodlover_chef_dashboard", defaultData);
        console.log("DB was not existing So, created ney DB...");
    }
}

function displayData(){
    let myfooddata = document.getElementById("foodData");
    let chefName = document.getElementById("chef_name");
    let retrievedData = JSON.parse(localStorage.getItem("foodlover_chef_dashboard"));
    var dataToP = ""

    //Debug
    //console.log(retrievedData["name"]);
    console.log(retrievedData["food"].length);

    chefName.innerHTML = '<h1>' + retrievedData["name"] + '</h1>';

    for (var i = 0; i < retrievedData["food"].length; i++) {
        dataToP += '<div class="provideFood">'
        dataToP += '<img src=' + retrievedData["food"][i]["img"] + ' alt="FoodPic" >'
        dataToP += '<p> Name : ' + retrievedData["food"][i]["name"] + '</p>'
        dataToP += '<p> Cost Set : ' + retrievedData["food"][i]["cost"] + '</p>'
        dataToP += '</div>'
    }
    myfooddata.innerHTML += dataToP;
}

function addFood(n,c,i){

    let retrievedData = JSON.parse(localStorage.getItem("foodlover_chef_dashboard"));
    retrievedData.food.push({img: i.value, name: n.value, cost: c.value});
    let updatedData = JSON.stringify(retrievedData);
    localStorage.setItem("foodlover_chef_dashboard", updatedData);

    console.log("Successfully added");

    displayData();
}

function displayOrder(){

    if (localStorage.getItem("foodlover_order") !== null) {
        console.log("DB is already existig...");
    }
    else{
        let defaultData = '{"order":[]}';
        localStorage.setItem("foodlover_order", defaultData);
        console.log("DB was not existing So, created ney DB...");
    }

    if (localStorage.getItem("foodlover_order") !== null) {
        console.log("DB is already existig...");

        let myorderdata = document.getElementById("OrderData");
        let retrievedData = JSON.parse(localStorage.getItem("foodlover_order"));
        var dataToP = ""

        if(retrievedData["order"].length<1){
            dataToP += '<div class="noOrder">'
            dataToP += "<p>You Did't get any Order !<br><i class=\"fa-solid fa-drumstick-bite\" style=\"font-size: 50px;\"></i></p>"
            dataToP += '</div>'
        }
        else{
            alert('You have got '+retrievedData["order"].length+' Orders....')
            for (var i = 0; i < retrievedData["order"].length; i++) {
                dataToP += '<div class="orderGot">'
                dataToP += '<p> Name : ' + retrievedData["order"][i]["name"] + '</p>'
                dataToP += '<p> Items : ' + retrievedData["order"][i]["Items"] + '</p>'
                dataToP += '<p> Total Cost : ' + retrievedData["order"][i]["Tcost"] + '</p>'
                dataToP += '<p> Phone No : ' + retrievedData["order"][i]["pnum"] + '</p>'
                dataToP += '<p> Address : ' + retrievedData["order"][i]["address"] + '</p>'
                dataToP += '</div>'
            }
        }
        myorderdata.innerHTML += dataToP;
    }
}

window.onload = function(){
    init_database();
    displayData();
    displayOrder();

    let loginForm = document.getElementById("FoodForm");
    loginForm.addEventListener("submit", (e) => {
        e.preventDefault();
      
        let name = document.getElementById("name");
        let cost = document.getElementById("cost");
        let imgUrl = document.getElementById("imgUrl");

        addFood(name,cost,imgUrl);
        
    location.reload(); 
    });
}