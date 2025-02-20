async function fetchGame() {
    const usersreq=await(fetch(Users_API))
    const usersjson=await(usersreq.json())
    const response = await fetch(VALORANT_API);
    const ffreq=await(fetch(FREEFIRE_API))
    const ffidjson=await(ffreq.json())
    const games = await response.json();
    const gameContainer = document.getElementById("list-product");
    const gameContainer2 = document.getElementById("list-product2");
    $('#static_1').html(usersjson.length);
    $('#static_2').html(games.length);
    $('#static_4').html(ffidjson.length);
    
    gameContainer.innerHTML = "";
    games.forEach(game => {
        gameContainer.innerHTML += `
                    <a class="product-item-sm product-filter" href="#" style="text-decoration: none; " >
                        <div class="product-v5 bg-light">
                            <div class="product-img">
                                <img class="" src="${game.imageurl}">
                            </div>
                            <div class="px-2 m-0">
                                <h5 class="product-name text-left m-0 mt-1 ">${game.name}</h5>
                                <p class="product-price text-danger-gradient text-center m-0 mb-1 p-0 ">
                                    ${game.price} บาท</p>
                                <div class="btn btn-main-gradient text-center w-100" style="border-radius: 13px;">
                                    สั่งซื้อสินค้า
                                </div>
                                <p class="text-theme text-center m-0" style="font-size: 12px;">
                                &nbsp;
                                </p>
                            </div>
                        </div>
                    </a>
        `;
    });
    ffidjson.forEach(game => {
        gameContainer2.innerHTML += `
                    <a class="product-item-sm product-filter" href="#" style="text-decoration: none; " >
                        <div class="product-v5 bg-light">
                            <div class="product-img">
                                <img class="" src="${game.imageurl}">
                            </div>
                            <div class="px-2 m-0">
                                <h5 class="product-name text-left m-0 mt-1 ">${game.name}</h5>
                                <p class="product-price text-danger-gradient text-center m-0 mb-1 p-0 ">
                                    ${game.price} บาท</p>
                                <div class="btn btn-main-gradient text-center w-100" style="border-radius: 13px;">
                                    สั่งซื้อสินค้า
                                </div>
                                <p class="text-theme text-center m-0" style="font-size: 12px;">
                                &nbsp;
                                </p>
                            </div>
                        </div>
                    </a>
        `;
    });
}

$(document).ready(function() {
    fetchGame();
});