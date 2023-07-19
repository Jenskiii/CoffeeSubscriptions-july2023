// accordion
const accordionOpener = document.querySelectorAll(".accordion__title");
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



//cards
const cards = document.querySelectorAll(".card");
cards.forEach(e => e.addEventListener("click", handleOption));
// title
const titles = document.querySelectorAll(".accordion__title");

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

// select current column when click on a card
function handleOption(e){
    let selected = this.getAttribute("aria-label");
    selectOption(e ,document.querySelectorAll(`.${selected} > div`));
    handleOrderSummary();
    handleButton();
}


// value of option
function handleValue(e){
    let id = e.currentTarget.id;
    let name = e.currentTarget.parentNode.id;
    if(e.currentTarget.getAttribute("aria-selected") === "true"){
      localStorage.setItem(name ,id)
    }
}

// order summary
window.addEventListener("load", handleOrderSummary);
// sets value inside html if not selected value is ______
function handleOrderSummary(){
    let preferences = localStorage.getItem("preferences") || "_____";
    let type = localStorage.getItem("type") || "_____";
    let amount = localStorage.getItem("amount") || "_____";
    let grind = localStorage.getItem("grind") || "_____";
    let frequency = localStorage.getItem("frequency") || "_____";

    const order = document.querySelector(".order");
    order.innerHTML = `“I drink my coffee as <span>${preferences}</span>, with a <span>${type}</span> type of bean.
     <span>${amount}</span> ground ala <span>${grind}</span>, sent to me <span>${frequency}</span>.”`
}

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
}
