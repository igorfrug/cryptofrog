let body = document.createElement("body")
let main = document.querySelector("main")
let homeCurrencies = document.createElement("div")
homeCurrencies.className = "home-currencies"
let row = document.createElement("div")
row.className = "row"
let search = document.querySelector(".search")
let coin = []
let checkboxes = []
let art = document.createElement("div")
art.className = "art"
$(() => {
    /// loader gif
    main.innerHTML = ""
    let loader1 = document.createElement("div")
    let gif1 = document.createElement("img")
    loader1.className = "loader1"
    gif1.setAttribute("src", "https://4.bp.blogspot.com/-nilxoYEA5EE/WT1lKc8TLnI/AAAAAAAACPY/q4RYSU9L53cFvlHiMbDyeXkJP9YNEE7VgCLcB/s1600/AW445193_14.gif")
    gif1.className = "gif1"
    loader1.append(gif1)
    main.append(loader1)
    $(loader1).show()
        /// clear local stoage onload or refresh, start an array for the checkboxes and the modal
    localStorage.clear()
    if (localStorage.getItem("key") == undefined) {
        localStorage.setItem("key", JSON.stringify(coin))
    };

    main.append(homeCurrencies);
    homeCurrencies.append(row);
    ///get the primery data
    $.get("https://api.coingecko.com/api/v3/coins/list", res => {

        /// draw 100 first currencies
        let currencies = res.slice(0, 100)
        console.log(currencies)
        for (const currency of currencies) {
            console.log(currency.id)
            displayCurrencies(currency.id, currency.symbol)

            $(loader1).hide();

            /// more info

            $(`#info_${currency.id}`).click(e => {
                info(currency.id)
            })
            let checkbox = document.querySelector(`#check_${currency.id}`)
            checkboxes.push(checkbox);
            ///checkboxes and the modal

            $(checkbox).change(e => {
                let coinName = e.target.parentElement.parentElement.id
                console.log(coinName)
                modal(checkbox, coinName)
            })
        }
        ///search & all features
        $(search).keyup(e => {
                main.innerHTML = ""
                main.append(homeCurrencies);
                homeCurrencies.append(row);
                row.innerHTML = ""
                const searchString = e.target.value
                console.log(searchString)
                const filterCurrency = () => {
                    console.log(currencies)
                    let arr = []
                    for (let i = 0; i < currencies.length; i++) {
                        if (currencies[i].symbol.includes(searchString)) {
                            console.log(currencies[i])
                            arr.push(currencies[i])
                        };
                    }
                    return arr
                }
                for (const currency of filterCurrency()) {
                    console.log(currency.id)

                    displayCurrencies(currency.id, currency.symbol)
                    let checkbox = document.querySelector(`#check_${currency.id}`)
                    coin = JSON.parse(localStorage.getItem("key"));
                    for (let i = 0; i < coin.length; i++) {
                        console.log(coin[i])
                        console.log(currency)
                        if (currency.id == coin[i]) {
                            checkbox.checked = true
                        }
                    }
                    $(`#info_${ currency.id }`).click(e => {
                        info(currency.id)
                    })
                    console.log(checkbox);
                    checkboxes.push(checkbox);

                    $(checkbox).change(e => {
                        let coinName = e.target.parentElement.parentElement.id
                        console.log(coinName)
                        modal(checkbox, coinName)
                    })
                }
            })
            ///"HOME" button & all features after search results
        $(".home").click(e => {
            search.value = ""
            main.innerHTML = ""
            main.append(homeCurrencies)
            homeCurrencies.append.row
            row.innerHTML = ""
            for (const currency of currencies) {
                displayCurrencies(currency.id, currency.symbol)
                let checkbox = document.querySelector(`#check_${currency.id}`)
                coin = JSON.parse(localStorage.getItem("key"));

                for (let i = 0; i < coin.length; i++) {
                    console.log(coin[i])
                    console.log(currency)
                    if (currency.id == coin[i]) {
                        checkbox.checked = true
                    }
                }
                $(`#info_${currency.id}`).click(e => {
                    info(currency.id)
                })
                console.log(checkbox);
                checkboxes.push(checkbox);
                $(checkbox).change(e => {
                    let coinName = e.target.parentElement.parentElement.id
                    console.log(coinName)
                    modal(checkbox, coinName)
                })

            }
        })

    })
});
///"ABOUTE" button
$(".about").click(e => {
    if (search.value != "") {
        search.value = ""
    }
    main.innerHTML = ""
    main.append(art)

    let Display = `<div class="display-4"><h1 class = "display-4 text mt-5"> Money is not everything in life, the art IS.</h1></div> `;
    art.innerHTML = Display
    let brahms = document.createElement("div")
    brahms.className = "brahms"
    brahms.innerHTML = `<h4> I.Brahms, Piano Trio no .1 Eliya Piano Trio</h4>`
    let brahmsVid = document.createElement("div")
    brahmsVid.className = "brahmsVid"
    brahmsVid.innerHTML += `<iframe src = "https://www.youtube.com/embed/4OEQP5aFT04"frameborder = "0"allow = "accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"allowfullscreen></iframe>"`
    let adagio = document.createElement("div")
    adagio.className = "adagio"
    let adagioVid = document.createElement("div")
    adagio.innerHTML = `<h4>A.Khachaturian "Adagio from Spartacus"</h4>`
    adagioVid.className = "adagioVid"
    adagioVid.innerHTML += `<iframe  src="https://www.youtube.com/embed/srFSbyhPKIE" frameborder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>`
    art.append(brahms);
    art.append(brahmsVid)
    art.append(adagio);
    art.append(adagioVid)

    ///"HOME" button after "ABOUT"
    $(".home").click(e => {
        main.innerHTML = ""
        main.append(homeCurrencies)
    })
});
//////FUNCTIONS

////draw the card function
function displayCurrencies(a, b) {
    let theCard =
        `<div class="card" id="card_${a}"  style="width: 18rem;" ">
                      <div class = "card-body" id="card_${a}">
                        <div class = "card-title d-flex justify-content-between"><h4>${b.toUpperCase()}</h4>
                         <div class="toggle" id="${a}">
                           <label class = "switch">
                           <input type = "checkbox"  id="check_${a}">
                           <span class = "slider round"></span>
                           </label>
                          </div>
                        </div>
                          <p class="card-text d-flex justify-content-start">${a}</p>
                          <button type="button" class="btn btn-secondary  info" data-container="body" data-toggle="collapse" data-target="#collapse_${a}" aria-expanded="false" aria-controls="collapse" id="info_${a}">
                            More Info
                          </button> 
                          <div class="collapse border-0 mt-4" id="collapse_${a}">
                         </div> 
                     </div> 
                    </div>`
    $(".row").append(theCard)
}
/// "More info" function
function info(a) {
    if (localStorage.getItem(`card_${a }`) != null) {
        let rates = JSON.parse(localStorage.getItem(`card_${ a }`))
        let collapse = document.querySelector(`#collapse_${a}`);
        collapse.innerHTML = `${rates.image} Rates now:<br><i class="fa fa-dollar">:${rates.usd}</i><br><i class="fa fa-eur">:${rates.eur}</i><br><i class="fa fa-ils">:${rates.ils}</i>`

    } else {
        let loader2 = document.createElement("div")
        let gif2 = document.createElement("img")
        loader2.className = "loader2"
        gif2.setAttribute("src", "https://cdn.lowgif.com/small/e1607cb505c3ee61-lisuje-lil-transparent-loading-sam-gif-d-i-jacksepticeye.gif")
        gif2.className = "gif2"
        loader2.append(gif2)
        console.log(loader2)
        let theCard = document.querySelector(`#card_${a}`)
        $(theCard).append(loader2)
        $(loader2).show();
        $.get("https://api.coingecko.com/api/v3/coins/" + a, result => {
            let storedCard = {
                id: `card_${a}`,
                image: `<img src="${result.image.small}">`,
                usd: `${ result.market_data.current_price.usd}`,
                eur: `${ result.market_data.current_price.eur }`,
                ils: `${ result.market_data.current_price.ils }`,
            }
            console.log(storedCard);
            localStorage.setItem(`card_${a }`, JSON.stringify(storedCard))
            setTimeout(clear, 120000);

            function clear() {
                localStorage.removeItem(`card_${a}`)
            }
            console.log(result);
            let collapse = document.querySelector(`#collapse_${a}`);
            console.log(collapse);
            if (result.market_data.current_price.usd == undefined || result.market_data.current_price.eur == undefined || result.market_data.current_price.ils == undefined) {
                collapse.innerHTML = "No Data"
            } else {
                collapse.innerHTML = `<img src="${result.image.small}">Rates now:<br><i class="fa fa-dollar">:${result.market_data.current_price.usd}</i><br><i class="fa fa-eur">:${result.market_data.current_price.eur}</i><br><i class="fa fa-ils">:${result.market_data.current_price.ils}</i>`
            }
            $(loader2).hide()
        })
    }
}
///modal function
function modal(checkbox, coinname) {
    if (checkbox.checked == true && coin.length == 5) {
        checkbox.checked = false
            ///drawing modal
        let modal = `<div class="modal fade" id="myModal" role="dialog">
    <div class="modal-dialog">
      <div class="modal-content">
         <div class="modal-header">
          <h5 class="modal-title">You can choose only five options.</h5>
         </div>
         <div class="uncheck  d-flex justify-content-center mt-3">
          <h6>To reselect,uncheck a currency type.</h6>
         </div>
         <div class="modal-body"> 
         </div>
        <div class="modal-footer mt-5">
          <button type="button" class="btn btn-default close">Close</button>
        </div>
      </div>
     </div>
    </div>`
        $(".row").append(modal)
            ///putting checked currencies in to the modal
        for (let i = 0; i < coin.length; i++) {
            let modaltext = `<div class="modal-text d-flex justify-content-between align-content-start modal_${coin[i]}">
                        <p class="text">${coin[i]}</p><p class="pfa" id="pcheck_${coin[i]}"><i class="fa fa-check-square-o"></i></p>
                        </div>`
            $(".modal-body").append(modaltext);
            console.log(coin[i]);
            console.log(checkboxes[i]);
            ///cancel currencies into the modal when unchecked
            if (checkbox.checked == false) {
                for (let i = 0; i < checkboxes.length; i++) {
                    if (`check_${coin[i]}` == checkboxes[i]) {
                        $(".modal-body").remove(`.modal_${ coin[i]}`)
                    }
                }
            }
        }
        setTimeout(() => {
            $(modal).modal("show");
        }, 200);
        ///dragging possibility
        $("#myModal").modal({ backdrop: "static", keyboard: false })
        modal = document.querySelector(".modal");
        console.log(modal);
        let draggable = $(modal);
        draggable.on('mousedown', function(e) {
            let dr = $(this).addClass("drag").css("cursor", "move");
            height = dr.outerHeight();
            width = dr.outerWidth();
            ypos = dr.offset().top + height - e.pageY;
            xpos = dr.offset().left + width - e.pageX;
            $(document.body).on('mousemove', function(e) {
                let itop = e.pageY + ypos - height;
                let ileft = e.pageX + xpos - width;
                if (dr.hasClass("drag")) {
                    dr.offset({ top: itop, left: ileft });
                }
            }).on('mouseup', function(e) {
                dr.removeClass("drag");
            });
        });
        ///deleting currencies from the open modal and deleting them from the local storage
        $(".pfa").click(e => {
            console.log(`check_${ e.target.parentElement.parentElement.children[0].innerHTML }`)
            console.log(checkbox)
            for (let i = 0; i < checkboxes.length; i++) {
                console.log(checkboxes[i])
                if (`check_${e.target.parentElement.parentElement.children[0].innerHTML}` == checkboxes[i].id) {
                    console.log(`#check_${ e.target.parentElement.parentElement.children[0].innerHTML }`)

                    console.log(checkboxes[i])
                    checkboxes[i].checked = false
                }
                coin = JSON.parse(localStorage.getItem("key"));
                console.log(coin);
                let item = e.target.parentElement.parentElement.children[0].innerHTML
                let notCoinName = coin.filter(filter);

                function filter(value) {
                    return value != item;
                }
                console.log(notCoinName);
                localStorage.setItem("key", JSON.stringify(notCoinName));
            }
            setTimeout(() => {
                e.target.parentElement.parentElement.innerHTML = ""
            }, 500);
        });
        ///deleting the currencies when closing modal 
        $(".close").click(e => {
            e.target.parentElement.parentElement.children[2].innerHTML = ""
            $(modal).modal("hide");
        })
    }
    ///setting currencies into the Local storage when checkbox s checked 
    if (checkbox.checked == true) {

        coin = JSON.parse(localStorage.getItem("key"))
        console.log(coin)
        coin.push(coinname)
        console.log(coin)
        localStorage.setItem("key", JSON.stringify(coin))

        $("div").innerHTML = coinname
    } else {
        coin = JSON.parse(localStorage.getItem("key"))
        console.log(coin)
        let notCoinName = coin.filter(filter);

        function filter(value) {
            return value != coinname;
        }
        console.log(notCoinName)
        localStorage.setItem("key", JSON.stringify(notCoinName))
    }
}