// MAIN
const cart = [];
const products = getFruits();

displayUi(products);
saveCart(cart);

// FUNCTIONS
function saveCart(cart) {
    localStorage.setItem("cart", JSON.stringify(cart));
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
        </div>`;
        // --
        card
            .querySelector(".add")
            .addEventListener("click", addToCart);

        // Todo : Add a remove button

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
    console.log(cart);
}