
let elLogin = document.querySelector(".login")

elLogin.addEventListener("submit", function(evt){
    evt.preventDefault()
    const obj = {
        login:evt.target[0].value,
        password:evt.target[1].value
    }
    window.localStorage.setItem("user", JSON.stringify(obj))
    setTimeout(()=>{
        window.location = "./index.html"
    }, 1000)
})