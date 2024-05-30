var myButton = document.getElementById('myButton');
myButton.addEventListener( 'click'  ,  addProduct     )
var myNameInput= document.getElementById('prodctName')
myNameInput.addEventListener('input' , validationName  )
var closeWindow =document.getElementById('closeWindow')
closeWindow.addEventListener('click',windowButton)
var prodctNameInput =  document.getElementById('prodctName');
var prodctSiteInput =  document.getElementById('prodctSite');
var informativeBoard= document.getElementById('window')


var productLast= [] ;
if(localStorage.getItem("productscontainer")!==null){
    productLast = JSON.parse(  localStorage.getItem("productscontainer")  )

displayData();
}


function addProduct(){
    if(validationName() == true&isValidURL()==true){
        
    var product={
        name: prodctNameInput.value,
        site: prodctSiteInput.value,
    }
    productLast.push( product )
    localStorage.setItem("productscontainer",JSON.stringify(productLast) )

    displayData()
    clearProduct()
    console.log(productLast);

    }
    else{
        windowButton()
    }

}
function clearProduct(){
    prodctNameInput.value =null;
    prodctSiteInput.value =null;
    prodctNameInput.classList.remove('is-valid')
    prodctSiteInput.classList.remove('is-valid')
}

function displayData(){
    var cartona =''
    for( var i=0 ;  i< productLast.length ;  i++){
        cartona +=`
        <tr>
        <td>${i+1}</td>
        <td>${ productLast[i].name}</td>
        <td><button class="btn btn-secondary " onclick="openSite('${productLast[i].site}')"><span><i class="fa-regular fa-eye mx-1"></i></span>Visit</button></td>
        <td><button class="btn btn-danger" onclick="daleteIteam(${i})"><span><i class="fa-regular fa-trash-can mx-1"></i></span>Delete</button></td>
    </tr>`

    }
    document.getElementById("tableData").innerHTML = cartona;
}
function openSite(url){
    window.open(url,'_blank');

}
function daleteIteam(indexIteam){
    productLast.splice(indexIteam,1)
    localStorage.setItem("productscontainer",JSON.stringify(productLast) )
    displayData();
}
function validationName(){
    var text =prodctNameInput.value;
    var regex=/^[a-z]{3,8}$/i;
    if(regex.test(text) == true){
        prodctNameInput.classList.add('is-valid')
        prodctNameInput.classList.remove('is-invalid')

        return true
    }
    else{
        prodctNameInput.classList.add('is-invalid')
        prodctNameInput.classList.remove('is-valid')

        return false
    }
}

function isValidURL(){
    var textUrl =prodctSiteInput.value;
    var regex = /(ftp|http|https):\/\/(\w+:{0,1}\w*@)?(\S+)(:[0-9]+)?(\/|\/([\w#!:.?+=&%@!\-\/]))?/;

    if(regex.test(textUrl)==true){
        prodctSiteInput.classList.add('is-valid')
        prodctSiteInput.classList.remove('is-invalid')
        return true;
    }else{
        prodctSiteInput.classList.add('is-invalid')
        prodctSiteInput.classList.remove('is-valid')
        return false;
    }
} 
function windowButton(){
 informativeBoard.classList.toggle('d-none')

}
// function windowCloseBut(){
//  informativeBoard.classList.add('d-none')

// }
