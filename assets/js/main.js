
var modal = document.getElementById("myModal");

var btn = document.getElementById("myBtn");

var span = document.getElementsByClassName("close")[0];

btn.onclick = function () {
    modal.style.display = "block";
}

span.onclick = function () {
    modal.style.display = "none";
}

window.onclick = function (event) {
    if (event.target == modal) {
        modal.style.display = "none";
    }
}

let addToCartBtn = document.querySelectorAll(".cart-link");



addToCartBtn.forEach(x => {
    x.addEventListener("click", function (e) {
        e.preventDefault();
        if (!localStorage.getItem("cart")) {
            localStorage.setItem("cart", JSON.stringify([]))
        }
        let cart = JSON.parse(localStorage.getItem("cart"));
        let cartItem = getCartItem(this);
        if (cart.find(b => b.id == cartItem.id) == undefined) {
            cart.push(cartItem);
        }
        else {
            cart.find(b => b.id == cartItem.id).count += 1;
        }
        localStorage.setItem("cart", JSON.stringify(cart));
        FillCart();
    })
});

function getCartItem(elem) {
    return {
        id: elem.dataset.id,
        price: elem.parentElement.previousElementSibling.children[0].innerText,
        brand: elem.parentElement.previousElementSibling.previousElementSibling.children[1].innerText.toUpperCase(),
        img: elem.parentElement.previousElementSibling.previousElementSibling.children[0].src,
        count: 1
    }
}


function FillCart() {
    let cartItems = JSON.parse(localStorage.getItem("cart"));
    let tablebody = document.getElementById("tablebody");
    tablebody.innerHTML = "";
    let itemCount = 0;
    let current;
    cartItems.forEach(item => {
        itemCount += item.count;
        tablebody.innerHTML +=
            `<tr data-id = ${item.id}>
        <td>
            <img src="${item.img}" class = "img-size" alt="Sheep">
            </td>
            <td>${item.brand}</td>
            <td>${parseInt(item.price)}</td>
            <td><input type = "number" value = "${item.count}"/></td>
            <td class="total">${parseInt(item.price) * item.count} $</td>
            <td>
            <span class = "removebtn">Remove</span>
          </td>
        </tr>`;
        let price = document.querySelectorAll(".price");
        document.querySelectorAll(".removebtn").forEach(x => {
            x.addEventListener("click", function () {
                this.parentElement.parentElement.remove();
                let cart = JSON.parse(localStorage.getItem("cart"));
                cart.splice(0, 1);
                localStorage.setItem('cart', JSON.stringify(cart));
            })
        })
    })
    document.querySelector(".badge").innerText = itemCount;
}

FillCart();