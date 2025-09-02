document.addEventListener("DOMContentLoaded",()=>{

    let products = [
        {id:101,name:"Product 1",price: 19.99},
        {id:102,name:"Product 2",price: 29.99},
        {id:103,name:"Product 3",price: 59.99}
    ]

    let productsContainer = document.getElementById("products");
    let checkoutBtn = document.getElementById("checkout-button");
    let cartEmptyMsg = document.getElementById("cart-empty");
    let cartMessage = document.getElementById("cart-message");

    products.forEach(product =>{
        let div = document.createElement("div");
        div.classList.add("product-design");
        div.innerHTML = `
            <span>${product.name} </span>
            <span>$${product.price} </span>
            <button data-id=${product.id}>Add To Cart</button>
            `
        productsContainer.appendChild(div);
    });

    let cart = []
    productsContainer.addEventListener("click",(e)=>{
        if(e.target.tagName === "BUTTON"){
            // console.log(e.target.dataset.id);
            let addProduct =  products.find(p => p.id == parseInt(e.target.dataset.id));
            console.log(addProduct);
            cartEmptyMsg.classList.add("hidden");
            addCart(addProduct);
        }else{
            return;
        }
    });

    function addCart(product){
        cart.push(product);
        let div = document.createElement("div");
        div.innerHTML = `Product : ${product.name}
                Price : ${product.price}
            `
        cartMessage.appendChild(div);
        
        totalPrice(cart);
    }

    function totalPrice(cart){
        let totalPrice = 0;

        cart.forEach(p =>{
            totalPrice += p.price;
        });
        document.getElementById("cart-total").classList.remove("hidden");
        document.getElementById("total-amount").innerHTML = `Total = $${totalPrice}`;
    }

    checkoutBtn.addEventListener("click",()=>{
        document.getElementById("cart-total").classList.add("hidden");
        cartEmptyMsg.classList.remove("hidden");
        cartMessage.classList.add("hidden");
        alert("Your products purchase successfully.");
    })
})