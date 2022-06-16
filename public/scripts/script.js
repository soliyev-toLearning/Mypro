window.addEventListener("load", function (e) {
  function toCurrency(price) {
    return new Intl.NumberFormat("en-EN", {
      style: "currency",
      currency: "usd",
    }).format(price);
  }
  const countPrice = document.querySelectorAll(".count_price");
  const price = document.querySelectorAll(".price");
  const count = document.querySelectorAll(".count");
  const total = document.querySelector(".total");
  const cardContent = document.querySelectorAll(".card-content p");

  cardContent.forEach((card) => {
    card.innerHTML = toCurrency(+card.innerHTML);
  });

  total.innerHTML = toCurrency(total.innerHTML);

  countPrice.forEach((product, index) => {
    // console.log(price[index].innerHTML);
    product.innerHTML = toCurrency(
      price[index].innerHTML * count[index].innerHTML
    );
    price[index].innerHTML = toCurrency(+price[index].innerHTML);
  });

  const cardBox = document.querySelector("#card");

  cardBox.addEventListener("click", (e) => {
    const contains = e.target.classList.contains("remove-btn");
    if (contains) {
      const id = e.target.getAttribute("id");
      fetch("/card/delete/" + id, {
        method: "delete",
      })
        .then((res) => res.json())
        .then((card) => {
          if (card.products.length > 0) {
            const html = card.products
              .map((product) => {
                return `
                            <tr>
                                    <td class="td">${product.type}</td>
                                    <td class="price td">${toCurrency(
                                      product.price
                                    )}</td>
                                    <td class="count td">${product.count}</td>
                                    <td class="count_price td">${toCurrency(
                                      +product.price * product.count
                                    )}</td>
                                    <td class="btn">
                                        <button id="${product.id}" data-id="${
                  product.id
                }" class="btn remove-btn btn-del">Delete</button>
                                    </td>
                                </tr>
                            `;
              })
              .join("");

            cardBox.querySelector("tbody").innerHTML = html;
            cardBox.querySelector(".total").innerHTML = toCurrency(card.price);
          } else {
            cardBox.innerHTML = '<h2 class="mpt">Card is empty</h2>';
          }
        });
    }
  });
});

// let bttn = document.querySelectorAll(".bttn");
// let span = document.querySelector(".spancha");
// let del = document.querySelector(".btn-del");

// var count = 0;

// for (let i = 0; i < bttn.length; i++) {
//   bttn[i].addEventListener("click", (e) => {
//     e.preventDefault();
//     count += 1;

//     span.innerHTML = count;
//   });
// }

// for (let i = 0; i < bttn.length; i--) {
//   del[i].addEventListener("click", (e) => {
//     e.preventDefault();
//     count -= 1;

//     span.innerHTML = count;
//   });
// }
