////////////////
// accordion //
//////////////
const accordionOpener = document.querySelectorAll(".accordion__title");
const allArrows = document.querySelectorAll(".arrow-button");

//opens and closes accordion
accordionOpener.forEach( (e) => e.addEventListener("click", ()=>{
    let arrow = e.childNodes[3];
    // opens item and closes it
    if(e.classList.contains("is-open")){
        e.classList.remove("is-open");
    }else{
        //closes all items
        const openedItems = document.querySelectorAll(".is-open");
        openedItems.forEach((item) => {
        item.classList.remove("is-open")})
        // resets all arrows to default to prevent double opened
        allArrows.forEach(e => {
            e.setAttribute("aria-selected", false)
        })
        // opens clicked item
        e.classList.add("is-open");
    }
    // rotates arrow when menu opens/closes
    if(arrow.getAttribute("aria-selected") === "true"){
        arrow.setAttribute("aria-selected", false)
    }else{
        arrow.setAttribute("aria-selected", true)
    }  
}));

//////////
//cards//
////////
const cards = document.querySelectorAll(".card");
cards.forEach(e => e.addEventListener("click", handleOption));
// title  //
const titles = document.querySelectorAll(".accordion__title");

// select current column when click on a card
function handleOption(e){
    let selected = this.getAttribute("aria-label");
    selectOption(e, document.querySelectorAll(`.${selected} > div`));
    handleOrderSummary();
    handleButton();
}

// sets card to active on click and highlights title
function selectOption(e ,column){
    // selects current title
    let selectedTitle = e.currentTarget.parentNode.parentNode.childNodes[1];
    if(e !== "true"){
        column.forEach(e => e.setAttribute("aria-selected", false))
        e.currentTarget.setAttribute("aria-selected", true);
        // highlights title if option selected
        selectedTitle.setAttribute("aria-selected", true);
    }else{
        selectedTitle.setAttribute("aria-selected", false);
    }
    handleValue(e)
}

// saves value of option to local storage
function handleValue(e){
    let id = e.currentTarget.id;
    let name = e.currentTarget.parentNode.id;
    if(e.currentTarget.getAttribute("aria-selected") === "true"){
      localStorage.setItem(name ,id)
    }
}
//////////////////
//order summary//
////////////////
window.addEventListener("load", handleOrderSummary);
// resets plan on page refresh
window.onload = localStorage.clear()
// sets value inside html if not selected value is ______ and highlight aside title
function handleOrderSummary(){
    let preferences = localStorage.getItem("preferences") || "_____";
    let type = localStorage.getItem("type") || "_____";
    let amount = localStorage.getItem("quantity") || "_____";
    let grind = localStorage.getItem("grind") || "_____";
    let frequency = localStorage.getItem("frequency") || "_____";
    // changes innerHTMl of plan + check out screen
    const order = document.querySelectorAll(".order");
    order.forEach(e => {
        e.innerHTML = `“I drink my coffee as <span>${preferences}</span>, with a <span>${type}</span> type of bean.
     <span>${amount}</span> ground ala <span>${grind}</span>, sent to me <span>${frequency}</span>.”`
    })
    
     // highlights aside titles in htlm (desktop)
     if(preferences !== "_____"){
        document.querySelector(".survey__aside--preferences").setAttribute("aria-selected", "true")
     }
     if(type !== "_____"){
        document.querySelector(".survey__aside--type").setAttribute("aria-selected", "true")
     }
     if(amount !== "_____"){
        document.querySelector(".survey__aside--quantity").setAttribute("aria-selected", "true")
     }
     if(grind !== "_____"){
        document.querySelector(".survey__aside--grind").setAttribute("aria-selected", "true")
     }
     if(frequency !== "_____"){
        document.querySelector(".survey__aside--frequency").setAttribute("aria-selected", "true")
     }
}

//////////////////
//order button //
////////////////
// set button to ready if every option is selected
function handleButton(){
    const orderButton = document.querySelector(".order-button");
// loops through all titles if all true then button is active
    for(let i = 0; i < titles.length; i++){
        if(titles[i].getAttribute("aria-selected") === "true"){
            orderButton.setAttribute("aria-selected", "true");
        }else{
            orderButton.setAttribute("aria-selected", "false");
        }
    }  
    // adds click function to button if active otherwise removes it
    if(orderButton.getAttribute("aria-selected") === "true"){
        orderButton.addEventListener("click", handleEndScreen);
    }else{
        orderButton.removeEventListener("click", handleEndScreen);
    }
}
// shows end screen + makes bg faded 
// also scrolls to top on click
const overlay = document.querySelector(".overlay");
const endScreen = document.querySelector(".end__screen");
function handleEndScreen(){
    // shows overlay + end screen
    overlay.classList.add("active");
    endScreen.classList.add("active");
    // scrolls to top on button click
    window.scrollTo(0, 0);
}

//////////////////////
// checkout button //
////////////////////
const checkoutButton = document.querySelector(".end__button");
checkoutButton.addEventListener("click",handleCheckout);

function handleCheckout(){
    overlay.classList.remove("active");
    endScreen.classList.remove("active");
    localStorage.clear();
}