
let shop = document.getElementById("shop");

let basket = JSON.parse(localStorage.getItem("data")) || [];

let tempIncrementedItems = [];

let generateShop = () => {
 
return (shop.innerHTML =  `
<div class="shop-container">
  <h1 class="shop-title">${naslov}</h1>
  <div class="shop-items">
    <div class="shop-container">
      <h3 style="margin-bottom:25px">Izaberite velicinu:</h3>
      <div class="shop-items">
        ${shopItemsData
          .map((x) => {
            let { id, name, price, desc, img} = x;
            let search = basket.find((x) => x.id === id) || [];
            return `
            <div id=product-id-${id} class="item">
              <div  class="details">
                <h3 class="imeproizvoda">${name}</h3>
                <div class="price-quantity">
                  <h2 class="cijena1">Cijena: ${price} KM</h2>
                  <div class="buttons">
                    <i style="cursor: pointer;" onclick="decrement(${id})" class="bi bi-dash-lg"></i>
                    <div id=${id} class="quantity">${search.item === undefined ? 0 : search.item}</div>
                    <i style="cursor: pointer;" onclick="increment(${id})" class="bi bi-plus-lg"></i>
                  </div>
                </div>
              </div>
            </div>
          `;
          })
          .join("")}
      </div>
    </div>
  </div>
  <div class="green">
<i class="bi bi-circle-fill"></i>
<div class="online">Na Stanju</div>
</div>

<div class="Opis">
<div class="label">Opis Proizvoda</div>
<div class="opiss">
${opis}
</div>
<div style="cursor: pointer;" class="opisss">${vise}</div>
</div>
<button style="cursor: pointer;" onclick="addToCart()" class="addtocart">Dodajte u Kosaricu</button>

`);
};

generateShop();



let increment = (id) => {
  let selectedItem = id;
  let search = tempIncrementedItems.find((x) => x.id === selectedItem.id);

  if (search === undefined) {
    tempIncrementedItems.push({
      id: selectedItem.id,
      item: 1,
    });
  } else {
    search.item += 1;
  }
  updateQuantity(selectedItem.id);
};

let decrement = (id) => {
  let selectedItem = id;
  let search = tempIncrementedItems.find((x) => x.id === selectedItem.id);

  if (search === undefined) return;
  else if (search.item === 0) return;
  else {
    search.item -= 1;
  }
  updateQuantity(selectedItem.id);
};

let updateQuantity = (id) => {
  let search = tempIncrementedItems.find((x) => x.id === id);
  let quantityElement = document.getElementById(id);
  
  if (search) {
    quantityElement.textContent = search.item;
  } else {
    quantityElement.textContent = 0;
  }
};

let addToCart = () => {
  basket = basket.concat(tempIncrementedItems);
  tempIncrementedItems = []; // Reset the temporary storage
  localStorage.setItem("data", JSON.stringify(basket));
  calculation();
};





let calculation = () => {
let cartIcon = document.getElementById("cartAmount");
cartIcon.innerHTML = basket.map((x) => x.item).reduce((x, y) => x + y, 0);
};

calculation();



