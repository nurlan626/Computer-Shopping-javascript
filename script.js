const nav = document.querySelector(".nav");
const username = document.querySelector(".username");
function checkAccount(){
    const user = JSON.parse(localStorage.getItem("user"));
    if(user){
       nav.innerHTML = `
       <nav>
                <button class="btn btn-success">
                    <a href="/myComputers/myComputers.html">
                        my computers
                    </a>
                </button>
                 <button class="btn btn-warning">
                <a href="/computers/computers.html">computers</a>
                </button>
                <button class="logOutBtn btn btn-danger">
                log out
                </button>
      </nav>
       `
        document.querySelector(".logOutBtn").addEventListener("click", () => {
            localStorage.setItem("user", JSON.stringify(""));
            checkAccount();
        })
        username.innerHTML = user.username;
    } else {
        nav.innerHTML = `
        <button class="btn btn-warning">
        <a href="/computers/computers.html">computers</a>
         </button>
      <button class="btn btn-success">
        <a href="/logIn/logIn.html">log in</a>
      </button>
        `
        username.innerHTML = ""

    }  
}

checkAccount();

