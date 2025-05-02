document.addEventListener("DOMContentLoaded", function() {
    let cart = JSON.parse(localStorage.getItem("cart")) || []
    let total = 0
  
    let cartItems = document.getElementById("cart-items")
    let totalDisplay = document.getElementById("total")
    let emptyMessage = document.getElementById("empty-message")
    let clearCartButton = document.getElementById("clear-cart")
  



    function updateCart() {
      if (cartItems && totalDisplay && emptyMessage && clearCartButton) {
        if (cart.length === 0) {
          emptyMessage.style.display = "block"
          cartItems.style.display = "none"
          totalDisplay.style.display = "none"
          
          clearCartButton.style.display = "none"
        } else {
          emptyMessage.style.display = "none"
          cartItems.style.display = "block"
          totalDisplay.style.display = "block"
          clearCartButton.style.display = "block"
  
          cartItems.innerHTML = ""
          cart.forEach(function(item) {
            let div = document.createElement("div")
            div.textContent = item.name + " - ₩" + item.price
            cartItems.appendChild(div)
          })
  
          total = cart.reduce(function(sum, item) {
            return sum + item.price
          }, 0)
          totalDisplay.textContent = "총 합계: ₩" + total.toLocaleString()
        }
      }
    }
  
    function addToCart(item) {
      let idx = cart.findIndex(function(i) {
        return i.name === item.name
      })
  
      if (idx !== -1) {
        cart[idx].price += item.price
      } else {
        cart.push(item)
      }
  
      localStorage.setItem("cart", JSON.stringify(cart))
      updateCart()
    }
  
    let singleBtn = document.getElementById("add-to-cart")
    if (singleBtn) {
      singleBtn.addEventListener("click", function() {
        let name = document.getElementById("product-name").textContent
        let price = parseInt(document.getElementById("product-price").textContent.replace("₩", "").replace(/,/g, ""))
        addToCart({ name: name, price: price })
        alert("장바구니에 추가되었습니다.....")
      })
    }
  
    if (clearCartButton) {
      clearCartButton.addEventListener("click", function() {
        localStorage.removeItem("cart")
        cart = []
        updateCart()
      })
    }
  
    updateCart()
  
    let links = {
      supreme: "supreme.html",
      adidas: "adidas.html",
      stussy: "stussy2.html",
      patagonia: "patagonia.html"
    }
  
    Object.keys(links).forEach(function(id) {
      let el = document.getElementById(id)
      if (el) {
        el.addEventListener("click", function() {
          location.href = links[id]
        })
      }
    })
  
    let cartIcon = document.getElementById("cart")
    if (cartIcon) {
      cartIcon.addEventListener("click", function() {
        location.href = "cart.html"
      })
    }
  
    let shop = document.getElementById("shop")
    if (shop) {
      shop.addEventListener("click", function() {
        location.href = "index.html"
      })
    }
  })
  