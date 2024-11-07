const computerList = document.querySelector(".computerList")
const users = JSON.parse(localStorage.getItem("users"));
const modalBody = document.querySelector(".modal-body")
const computers = [];

function createComputersList() {
    users.forEach((user) => {
        user.computers.forEach((computer) => {
            computers.push(computer)
        })
    })
}
createComputersList();

console.log(computers)

function render(listOfComputers){
    listOfComputers.forEach((computer) => {
        const div = document.createElement("div");
        div.className = "col"
        const card = document.createElement("div")
        card.className = "card h-100";
        card.innerHTML = `
            <img
            src="${computer.img}"
            class="card-img-top"
            alt="..."
        />
        
        `
        const cardBody = document.createElement("div")
        cardBody.className = "card-body"
        cardBody.innerHTML = `
            <div class="card-text">
                <div>name: ${computer.name}</div>
                <div>description:  ${computer.description}</div>
                <div>price:  ${computer.price} AZN</div>
                <div>new:  ${computer.new}</div>
            </div>
        `
        const button = document.createElement('button')
        button.className = "btn btn-primary my-2";
        button.setAttribute('data-bs-toggle', "modal" );
        button.setAttribute("data-bs-target","#exampleModal" )
        button.innerHTML = "more info"
        button.addEventListener("click", () => {
            modalBody.innerHTML = `
            <img
            src="${computer.img}"
            class="card-img-top"
            alt="..."
            />
            <div>name: ${computer.name}</div>
            <div>description: ${computer.description} </div>
            <div>price: ${computer.price}</div>
            <div>new: ${computer.new}</div>
            <div>ram: ${computer.ram}</div>
            <div>cpu: ${computer.cpu}</div>
            <div>rom: ${computer.rom}</div>
            <div>operation system: ${computer.operatingSystem}</div>
            <div>video card:  ${computer.videoCard}</div>
            `
        })
        cardBody.append(button)
        card.append(cardBody)
        div.append(card);

        computerList.appendChild(div)

    })
}

render(computers);

const input = document.querySelector(".input")
input.addEventListener("input", () => {
    const filteredComputers = computers.filter((computer) => {
        return computer.name.toLowerCase().includes(input.value.toLowerCase())
    })
    computerList.innerHTML ="";
    render(filteredComputers)
    console.group(filteredComputers)
})

function categoryFilter() {
    const filterList = document.querySelector(".filterList")
    const allCategory = document.createElement("div")
    allCategory.className = "border p-2"
    allCategory.innerHTML = "all"
    allCategory.addEventListener("click", () => {
        render(computers)
    })
    filterList.append(allCategory)
    let categoryList = computers.map((computer) => {
        return  computer.category.toLowerCase()
    })
    categoryList = [...new Set(categoryList)];
    categoryList.forEach((category) => {
        const div = document.createElement("div")
        div.className = "border p-2"
        div.innerHTML = category;
        div.addEventListener("click", () => {
            const filteredComputers = computers.filter((computer) => {
                return computer.category.toLowerCase().includes(category.toLowerCase())
            })
            computerList.innerHTML ="";
            render(filteredComputers)  
        })
        filterList.append(div)
    })

}
categoryFilter()