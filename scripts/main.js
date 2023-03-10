// MAIN
let cart = [];
const products = getFruits();

displayUi(products);
saveCart(cart);

// FUNCTIONS
function saveCart(cart) {
    localStorage.setItem("cart", JSON.stringify(cart)); // localstorage save
}

function updateUiCart(cart) {
    // reset of cart
    const uiCart = document.getElementById("cart");
    uiCart.innerHTML = null;

    cart.forEach(product => {
        let {name, quantity} = product;

        let li = document.createElement("li");
        li.innerText = `${name.toUpperCase()} x ${quantity}`;

        uiCart.appendChild(li);
    })
}

// Temp Function : All available products
function getFruits() {
    return [
        {
            id: "F01",
            name: "banana",
            price: 2.00
        },

        {
            id: "F15",
            name: "orange",
            price: 4.50
        },

        {
            id: "F09",
            name: "pineapple",
            price: 5.00
        },
    ]
}

// UI
function displayUi(products) {
    // Todo : To shorten with a useful function "createElement"
    for (const [_, product] of Object.entries(products)) {
        const { id, name, price } = product;
        const card = document.createElement("div");
        card.setAttribute("class", "card");
        card.setAttribute("style", "width:18rem;");
        // Todo : Add a image for the product --
        card.innerHTML = `
        <div class="card-body">
            <h5 class="card-title">${name.toUpperCase()}</h5>
            <p class="price card-text">${price.toFixed(2)}€</p>
            <p class="card-text">No. <span class="imei fw-bold">${id}</span></p>
            <input type="button" class="add btn btn-primary" value="Add">
            <input type="button" class="delete btn btn-danger" value="Remove">
        </div>`;
        // --
        card
            .querySelector(".add")
            .addEventListener("click", addToCart);

        // Todo : Add a remove button
        card
            .querySelector(".delete")
            .addEventListener("click", removeFromCart);

        document.getElementById("products").appendChild(card);
    }
}

// ok
function addToCart(e) {
    let productImei = e.currentTarget.parentNode.querySelector(".imei").innerText;
    const foundProduct = cart.find(product => product.id === productImei);
    if(foundProduct) {
        foundProduct.quantity++;
    } else {
        const targetProduct = products.find(product => product.id === productImei);
        targetProduct.quantity = 1;
        cart.push(targetProduct);
    }

    saveCart(cart);
    updateUiCart(cart);
}

function removeFromCart(e) {

    let productImei = e.currentTarget.parentNode.querySelector(".imei").innerText;

    const foundProduct = cart.find(product => product.id === productImei);

    

    if(foundProduct) {
        if(foundProduct.quantity - 1 === 0) {
            cart = cart.filter(product => product.id !== productImei);
        } else {
            foundProduct.quantity--;
        } 
    }

    else {
        return false;
    }

    saveCart(cart);
    updateUiCart(cart);
}