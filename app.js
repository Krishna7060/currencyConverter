const baseUrl =
  "https://v6.exchangerate-api.com/v6/16d19816ba692acf6755642b/latest/";
const form = document.querySelector("form");
const exchangButton = document.querySelector("form button");

let fromCurrency = document.querySelector(".from select");
const otherDetailContainer =document.querySelector('.otherdetails');
 


const exRate= document.querySelector('#exchangerate')
const result = document.querySelector(".msg");
const dropDowns = document.querySelectorAll(".dropdowns select");
let amount = document.querySelector('form input');
 

for (let select of dropDowns) {
  for (currencycode in countryList) {
    let newOption = document.createElement("option");
    newOption.innerText=currencycode;
    newOption.value= currencycode;
    if (select.name === "from" && currencycode === "USD") {
      newOption.selected = "selected";
    } else if (select.name === "to" && currencycode === "INR") {
      newOption.selected = "selected";
    }

     select.append(newOption);
    
    
     

  }
  select.addEventListener("change", (evt) => {
    updateFlag(evt.target);
  });
}

const updateFlag = (element) => {
  let currencycode = element.value;
  let countryCode = countryList[currencycode];
  let newSrc = `https://flagsapi.com/${countryCode}/flat/64.png`;
  let image =  element.parentElement.querySelector("img")
  image.src = newSrc;
};

const updateExchangeRate = async () => {
  
  
   
   

  const url = `${baseUrl}/${fromCurrency.value}`;
  let response = await fetch(url);
  const data = await response.json();
  console.log(data)
  const toCurrency = document.querySelector(".to select").value;
  const exchangeRate = data.conversion_rates[toCurrency]
  const userInput =   document.querySelector('form input').value
  console.log(userInput);
   const finalAmount = exchangeRate*userInput;
   const lastUpadatedtime =data.time_last_update_utc
   console.log(lastUpadatedtime)
   exRate.innerText= `Exchange Rate : ${exchangeRate}${toCurrency}`
   otherDetailContainer.innerHTML=`Last updated time is <h2> ${lastUpadatedtime}<h2/>`

   console.log(finalAmount);
  //  const timeDate = data.
  //  console.log(data);
  //  
 

  result.innerHTML=`your converted amount is <h3> ${finalAmount}${" "}${toCurrency}</h3>`
  

  


  
};

exchangButton.addEventListener('click',(evt)=>{
  evt.preventDefault();
  updateExchangeRate();

})

window.addEventListener('load',()=>{
  updateExchangeRate();
})



// updateExchangeRate();
