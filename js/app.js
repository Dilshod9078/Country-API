
let elBody = document.querySelector("body")
let elmode = document.querySelector(".modebtn")
let elList = document.querySelector(".hero-list")

let elSearchName = document.querySelector(".header-name")
let elSearchCap = document.querySelector(".header-capital")
let elSelect = document.querySelector(".header-select")
let elBtnLogout = document.querySelector(".header-btn")

let elModalWrapper = document.querySelector(".modal-wrapper")
let elModal = document.querySelector(".modal")

elmode.addEventListener("click", function(evt){
    elBody.classList.toggle("mode")
})

elModalWrapper.addEventListener("click", function(evt){
    if(evt.target.id == "modal-wrapper"){
        elModalWrapper.classList.remove("open-list")
    }
})

elBtnLogout.addEventListener("click", function(evt){
    alert("Haqiqatdan ham chiqishni xohlaysizmi")
    window.location = "/login.html"
})

let selectOption = []


const country = async (URL) =>{
    const result = await fetch(URL)
    const data = result.json()
    return data 
}
country("https://restcountries.com/v3.1/all").then(res =>{
    allCountry(res, elList)
    res.map(item => {
    if(!selectOption.includes(item.region))
       selectOption.push(item.region)
    })
       selectOption.map(item => {
        let elOption = document.createElement("option")
        elOption.textContent = item
        elOption.value = item
        elSelect.appendChild(elOption)
       })
})

function allCountry(arr, list){
    list.innerHTML = ""
    arr.map(item => {
        let elItem = document.createElement("li")
        elItem.classList.add("hero-item")
        elItem.innerHTML = `
          <img class="country-img w-[300px] h-[200px]" src="${item.flags.png}" alt="Country flag image" width="300" height="200">
          <div class="item-card">
          <p class="country-name">Country: <strong class="font-extrabold text-[15px]">${item.altSpellings[1]}</strong></p>
          <p class="country-name">Short-name: <strong class="font-extrabold text-[15px]">${item.cca3}</strong></p>
          <p class="country-name">Capital: <strong class="font-extrabold text-[15px]">${item.capital ? item.capital[0] : "-"}</strong></p>
          <p class="country-name">Area: <strong class="font-extrabold text-[15px]">${item.area}</strong></p>
          <p class="country-name">Region: <strong class="font-extrabold text-[15px]">${item.region}</strong></p>
          <p class="country-name">Subregion: <strong class="font-extrabold text-[15px]">${item.subregion}</strong></p>
          <p class="country-border">Border: <strong class="font-extrabold text-[15px]">${item.borders}</strong></p>
          <p class="country-name">Population: <strong class="font-extrabold text-[15px]">${item.population}</strong></p>
          <p class="country-name">Timezones: <strong class="font-extrabold text-[15px]">${item.timezones[0]}</strong></p>
          <p class="country-name">StartWeek: <strong class="font-extrabold text-[15px]">${item.startOfWeek}</strong></p>
          <p class="country-name">TLD: <strong class="font-extrabold text-[15px]">${item.tld}</strong></p>
          </div>
          <div class="item-btn mt-[10px]">
            <button id="${item.capital ? item.capital[0] : "-"}" class="more-btn w-[80px] bg-blue-600 p-[7px] rounded-[7px] text-[22px] text-white" >More</button>
          </div>
        `
        list.appendChild(elItem)
    })
}

// -------------------------------Name search-----------------------------

elSearchName.addEventListener("keyup", function(evt){
    let result = evt.target.value
    if(result){
        country(`https://restcountries.com/v3.1/name/${result}`).then(res => {
            allCountry(res, elList)
        })
    }
    else{
        country(`https://restcountries.com/v3.1/all`).then(res => {
            allCountry(res, elList)
        })
    }
})

//-------------------------Capital Search------------------------------

elSearchCap.addEventListener("keyup", function(evt){
    let resultcap = evt.target.value
    if(resultcap){
        country(`https://restcountries.com/v3.1/capital/${resultcap}`).then(res =>{
            allCountry(res, elList)
        })
    }
    else{
        country(`https://restcountries.com/v3.1/all`).then(res =>{
            allCountry(res, elList)
        })
    }
})


elSelect.addEventListener("change", function(evt){
    let resultselect = evt.target.value
    if(resultselect != "0"){
        country(`https://restcountries.com/v3.1/region/${resultselect}`).then(res =>{
            allCountry(res, elList)
        })
    }
    else{
        country(`https://restcountries.com/v3.1/all`).then(res =>{
            allCountry(res, elList)
        })
    }
})

// ----------------More ----------------

elList.addEventListener("click", function(evt){
    if(evt.target.matches(".more-btn")){
        let capital = evt.target.id
        country(`https://restcountries.com/v3.1/capital/${capital}`).then(res =>{
            elModalWrapper.classList.add("open-modal")
            elModal.innerHTML =`
            <div class="flex items-center justify-between">
            <img class="country-img w-[400px] h-[300px]" src="${res[0].flags.png}" alt="Country flag image" width="400" height="300">
            <div class="item-card">
            <p class="country-name">Country: <strong class="font-extrabold text-[15px]">${res[0].altSpellings[1]}</strong></p>
            <p class="country-name">Short-name: <strong class="font-extrabold text-[15px]">${res[0].cca3}</strong></p>
            <p class="country-name">Capital: <strong class="font-extrabold text-[15px]">${res[0].capital ? res[0].capital[0] : "-"}</strong></p>
            <p class="country-name">Area: <strong class="font-extrabold text-[15px]">${res[0].area}</strong></p>
            <p class="country-name">Region: <strong class="font-extrabold text-[15px]">${res[0].region}</strong></p>
            <p class="country-name">Subregion: <strong class="font-extrabold text-[15px]">${res[0].subregion}</strong></p>
            <p class="country-border">Border: <strong class="font-extrabold text-[15px]">${res[0].borders}</strong></p>
            <p class="country-name">Population: <strong class="font-extrabold text-[15px]">${res[0].population}</strong></p>
            <p class="country-name">Timezones: <strong class="font-extrabold text-[15px]">${res[0].timezones[0]}</strong></p>
            <p class="country-name">StartWeek: <strong class="font-extrabold text-[15px]">${res[0].startOfWeek}</strong></p>
            <p class="country-name">TLD: <strong class="font-extrabold text-[15px]">${res[0].tld}</strong></p>
            <div class="item-btn mt-[10px]">
              <button onclick="exitBtn()" class="exit-btn absolute top-0 right-0 bottom-0 left-end w-[35px] h-[35px] bg-blue-600 p-[2px] rounded-[3px] text-[22px] text-white" >x</button>
            </div>
            </div>
            </div>
            `
        })
    }
})

function exitBtn(){
    elModalWrapper.classList.remove("open-modal")
}