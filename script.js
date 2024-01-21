// import Product from "./product.js"

let title = document.querySelector("#title")
let price = document.querySelector("#price")
let tax = document.querySelector("#tax")
let ads = document.querySelector("#ads")
let disc = document.querySelector("#discount")
let count = document.querySelector("#count")
let category = document.querySelector("#category")

let total = document.querySelector("#total")
let deleteAllBtn = document.querySelector("#deleteAll");

let creatBtn = document.querySelector(".CreatBtn");
let search = document.querySelector("#search")
let searcTitle = document.querySelector(".sTitle")
let searcCategory = document.querySelector(".sCategory")
let mood = "creat" ;
let temp ;

price.addEventListener('keyup' , calcTotal);
tax.addEventListener('keyup' , calcTotal);
disc.addEventListener('keyup' , calcTotal);
ads.addEventListener('keyup' , calcTotal);
function calcTotal(){
    if(price.value !== ''){
    console.log("dones")
       
        total.innerHTML = `${(+price.value + +tax.value + +ads.value ) - +disc.value}` ;
        total.style.backgroundColor =  "#2c7fa0";

    }else{
        total.innerHTML ='' ;
        total.style.backgroundColor =  "#163d4d";
    }
}

/////////////creat product ////////////////
class Product{
    
    constructor(title , price , tax , ads , dis , total , cat ){
        this.title = title;
        this.price = price ;
        this.tax = tax ;
        this.ads = ads ;
        this.dis = dis ;
        this.total = total ;
        this.cat = cat ;
    }
}

function validateNames(name){
    if(isNaN(name.value) && name.value !=''){
        return name.value;
    }else{
        alert(`enter valide name for ${name.placeholder}`)
    }
}

function validateNumbers(num){
    if(num.value >= 0 && num.value != ''){
        return num.value ;
    }else{
        alert(`enter valide value for ${num.placeholder}`)
    }
}

let products ;
if(localStorage.products != null){
    products = JSON.parse(localStorage.products) ;
}else{
    products = [] ;
}

creatBtn.addEventListener('click' , creatProduct) ;
function creatProduct(){

   if(validateNumbers(disc) && validateNumbers(ads) && validateNumbers(tax) && validateNumbers(price) && validateNames(category)  && validateNames(title)  ){
    if(mood == "creat"){
       if(validateNumbers(count)){
        for(let i=0 ; i< count.value ; i++){
            let product = new Product(title.value , price.value , tax.value , ads.value ,disc.value, total.textContent ,category.value) ;
            products.push(product) ;
        }
        clearInputs();

       } 
    }else{
        // count.value = 0;
        products[temp] = new Product(title.value , price.value , tax.value , ads.value ,disc.value, total.textContent,category.value) ;
        mood = "creat" ;
        creatBtn.innerHTML = "Creat" ;
        count.style.display = "block" ;
        clearInputs();

    }
   
    localStorage.setItem('products' , JSON.stringify(products));
    
    displayRows() ;
   }
}

///////////// clear inputs /////////////////

function clearInputs(){
    // title.value = '' ; price.value = '' ; tax.value = '' ; disc.value = '' ; ads.value = '' ;
    //  total.innerHTML = '' ; category.value = '' ;  count.value ='' ;
     let inputs = document.querySelectorAll(type=['input']);

     inputs.forEach(inp =>{
        inp.value = '' ;
     })

}

/////////////display product ///////////////
let tbody = document.querySelector("#tbody") ;

function displayRows(){
    tbody.innerHTML = '' ;

   for(let i =0 ; i< products.length ; i++){
    let tr = document.createElement('tr') ;
        tr.innerHTML = `
        <td>${i}</td>
        <td>${products[i].title}</td>
        <td>${products[i].price}</td>
        <td>${products[i].tax}</td>
        <td>${products[i].ads}</td>
        <td>${products[i].dis}</td>
        <td>${products[i].total}</td>
        <td>${products[i].cat}</td>
        <td><button onClick="updatePro(${i})" id="update">update</button></td>
        <td><button onClick="deleteProduct(${i})" id="delete">delete</button></td>
        ` ; 
    tbody.append(tr);
   }

   if(products.length > 0){
    deleteAllBtn.style.display = "block"
   }else{
    deleteAllBtn.style.display = "none"

   }
   calcTotal()

}

displayRows()


let update = document.querySelector("#update")
let Delete = document.querySelector("#delete")

////////////////// delete /////////////////////

function deleteProduct(id){

    products.splice(id , 1) ;
    localStorage.products = JSON.stringify(products) ;
    displayRows()
    // console.log("hrhe");
}

//////////////delete all //////////////////////

function deleteAll(){
    localStorage.clear();
    products.splice(0);
    displayRows();
}

//////////////////updat //////////////////////

function updatePro(id){
    title.value = products[id].title ;
    price.value = products[id].price ;
    tax.value = products[id].tax ;
    ads.value = products[id].ads ;
    disc.value = products[id].dis ;
    category.value = products[id].cat ;
    calcTotal();

    creatBtn.innerText = "update" ;
    count.style.display = "none" ;
    mood = "update" ;
    temp = id ;
   scroll({
    top:0,
    behavior:"smooth" 
   })

}

////////////////////////////////////////////
let searchMood= "title" ;

searcTitle.addEventListener('click' ,  searcT)

function searcT(){
    console.log(search.value.toLowerCase())
    searchMood = "title" ;
    search.setAttribute('placeholder' , "search by title");
    searcTitle.classList.add("active");
    searcCategory.classList.remove("active");
    // search.value
}

searcCategory.addEventListener('click' ,  searcCat)


function searcCat(){
    console.log(search.value.toLowerCase())
    searchMood = "category" ;
    search.setAttribute('placeholder' , "search by category");
    searcCategory.classList.add("active");
    searcTitle.classList.remove("active");


    // search.value
}


search.addEventListener('keyup' , searchPro);
let result = [];
function searchPro(){
     result.splice(0);
    if(searchMood == "title"){
        products.forEach(pro => {
            if(pro.title.includes(search.value)){
                // console.log(pro.title);
                result.push(pro);
            }
        });
    }
    else{
        products.forEach(pro => {
            if(pro.cat.includes(search.value)){
                // console.log(pro.cat);
                result.push(pro);
            }
        });
    }

   
    tbody.innerHTML = '' ;

   for(let i =0 ; i< result.length ; i++){
    let tr = document.createElement('tr') ;
        tr.innerHTML = `
        <td>${i}</td>
        <td>${result[i].title}</td>
        <td>${result[i].price}</td>
        <td>${result[i].tax}</td>
        <td>${result[i].ads}</td>
        <td>${result[i].dis}</td>
        <td>${result[i].total}</td>
        <td>${result[i].cat}</td>
        <td><button onClick="updatePro(${i})" id="update">update</button></td>
        <td><button onClick="deleteProduct(${i})" id="delete">delete</button></td>
        ` ; 
    tbody.append(tr);
    
   }

}



   