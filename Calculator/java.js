const baseUrl = "https://open.er-api.com/v6/latest";

let dropdown = document.querySelectorAll(".dropdown select")
let btn = document.querySelector("form button")
let fromCurr = document.querySelector(".from select ")
let toCurr = document.querySelector(".to select")
let msg = document.querySelector(".msg")  

for (let select of dropdown) {

    for (let currcode in countryList) {
        let newOption = document.createElement("option")
        // console.log(key)
        newOption.innerText = currcode;
        if ( select.name === "from" && currcode === "USD" ){
            newOption.selected = "selected"
        }
         else if ( select.name === "to" && currcode === "INR" ){
            newOption.selected = "selected"
        }
              select.append(newOption);

    }

    select.addEventListener("change" , (evt)=> {
        flagchange(evt.target)
    }
                            );
}

const flagchange = (element) => {
      let currcode = element.value;
      let countrycode = countryList[currcode];
      let newSrc = `https://flagsapi.com/${countrycode}/flat/64.png`;
      let img =  element.parentElement.querySelector("img");
      img.src = newSrc;
}

 
   
btn.addEventListener("click", async(evt) => {
    evt.preventDefault();
   let amount = document.querySelector(".amount input");
    let amtVal = amount.value;
    const fromUrl = `${baseUrl}/${fromCurr.value}`
    let response = await fetch(fromUrl)
    let data = await response.json()
    let rates =  data.rates[fromCurr.value]
    let Rates =  data.rates[toCurr.value]
    let finalAmt = amtVal * Rates
    msg.innerText = `${amtVal} ${fromCurr.value} = ${finalAmt} ${toCurr.value}`
})



