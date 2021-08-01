const productName = document.querySelector('#productName');
const productPrice = document.querySelector('#productPrice');
const buttonSave = document.querySelector('#buttonSave');
const buttonCancel = document.querySelector('#buttonCancel');
const productList = document.querySelector('#productList');
const totalOutput = document.querySelector('#total');

let total = 0;

let id = 0;
let products = [];

const deleteProduct = (id) => {
    const product = document.getElementById(id);

    total -= products[id][1];
    totalOutput.textContent = total

    productList.removeChild(product);
}

const creatNewProduct = (name, price) => {
    const ionCard = document.createElement('ion-card');
    const newProductItem = document.createElement('ion-card-content');
    const deleteBtn = document.createElement('ion-button');

    deleteBtn.color = "danger";
    deleteBtn.size = "small";
    deleteBtn.textContent = "X";
    
    newProductItem.textContent = name + ': $' + price;
    
    ionCard.appendChild(newProductItem);
    ionCard.appendChild(deleteBtn);
    
    deleteBtn.style = "margin-right: 0.5em; margin-top: 10px";
    ionCard.style = "display:flex; justify-content:space-between; aling-items:center";
    
    ionCard.id = id;
    products.push([name,price]);
    deleteBtn.setAttribute("onclick","deleteProduct("+id+")")
    id += 1;
    
    
    productList.appendChild(ionCard);
}

const clearInputs = () => {
    productName.value = '';
    productPrice.value = '';
}

const presentAlert = () => {
    const alert = document.createElement('ion-alert');
    alert.header = "Invalid Data";
    alert.subHeader = "Please verify your inputs";
    alert.message = "Incorrect Name or Price";
    alert.buttons = ['Ok'];

    document.body.appendChild(alert);
    return alert.present();
}

const isEmpty = str => !str.trim().length;

buttonSave.addEventListener('click', () => {
    const name = productName.value;
    const price = productPrice.value;

    if (isEmpty(name) || price <= 0 || isEmpty(name)) {
        presentAlert();
        return;
    }

    creatNewProduct(name,price);
    total += +price;
    totalOutput.textContent = total;
    clearInputs();
});

buttonCancel.addEventListener('click', clearInputs);