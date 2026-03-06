// fetch("https://openapi.programming-hero.com/api/categories")
// .then(res=>res.json())
// .then(data=>console.log(data.categories));

const categoriesContainer = document.getElementById('categories-container');

async function loadData() {
    const res = await (fetch("https://openapi.programming-hero.com/api/categories"));

    const data = await res.json();

    data.categories.forEach((categories) => {
        const btn = document.createElement("button");
        btn.className = "btn btn-outline w-full mb-5";
        btn.textContent = categories.category_name;
        btn.onclick = () => selectCategory(categories.id, btn);
        categoriesContainer.appendChild(btn);
    });

}
loadData();

async function loadPlantsCard() {
    showLoading();
    const res = await (fetch("https://openapi.programming-hero.com/api/plants"));
    const data = await res.json();
    displayTreeCardData(data.plants);
}


const displayTreeCardData = (arrays) => {

    arrays.forEach(tree => {

        const card = document.createElement("div");
        card.className = "card bg-white shadow-sm";
        card.innerHTML = `        
            <figure>
             <img onclick="openModal(${tree.id})" class="h-40 w-full object-cover" src="${tree.image}"/>
            </figure>
            <div class="card-body">
                  <h2 class="card-title">${tree.name}</h2>
                  <p class="line-clamp-2">${tree.description}</p>
                <div class="badge badge-outline badge-primary">${tree.category}</div>
                <div class="flex justify-between">
                 <h2 class="font-bold text-xl cg">${tree.price} /=</h2>
                     <button onclick="addToCard(${tree.id},'${tree.name}',${tree.price})" class="btn bg-cg">Add</button>
            </div>
                   
        `
        treesContailner.appendChild(card);
        removeLoading();
    });

}


let card = [];
const cartContainer = document.getElementById('cart-container');
const totalprice = document.getElementById('totalprice');
function addToCard(id, name, price) {
    const existingId = card.find(item => item.id === id);
    if (existingId) {
        existingId.quantity += 1;
    } else {
        card.push({
            id, name, price, quantity: 1
        })
    }

    updateCard();
}

function updateCard() {
    cartContainer.innerHTML = "";

    if (card.length === 0) {
        EmtyCard.classList.remove("hidden");
        totalprice.textContent = `0`;
        return;
    }

    EmtyCard.classList.add("hidden");

    let total = 0;
    card.forEach(item => {
        total += item.price * item.quantity;
        const catrItem = document.createElement("div");
        catrItem.classList = "card card-body shadow-2xl bg-slate-100";
        catrItem.innerHTML = `<div class="flex justify-between items-center">
                               <div>
                                <h2 class="text-2xl font-bold">${item.name}</h2>
                                <p>${item.price} x ${item.quantity}</p>
                               </div>
                               <button onclick="removeFromCard(${item.id})" class="btn btn-ghost">X</button>
                            </div>
                            <p class="text-right font-semibold text-xl cg">${item.price * item.quantity}</p>
        `
        cartContainer.appendChild(catrItem);

    });
    totalprice.innerText = total;

}

function removeFromCard(id) {
    const updetedCard = card.filter(item => item.id != id);
    card = updetedCard;
    updateCard();
}

const EmtyCard = document.getElementById('Emty-Card')

const treesContailner = document.getElementById('trees-contailner');


const loadingSpnner = document.getElementById("loading-spnner");

const allCategoryBtn = document.getElementById("allCategoryBtn");

const tree_modal = document.getElementById("tree_modal");
const modalTitle = document.getElementById("modal-title");
const modalCategory = document.getElementById("modal-category");
const modalDescription = document.getElementById("modal-description");
const modalPricid = document.getElementById("modalPricid");
const ModalImage = document.getElementById("Modal-Image");

loadPlantsCard();

function showLoading() {
    treesContailner.innerHTML = "";
    loadingSpnner.classList.remove("hidden");
}
function removeLoading() {
    loadingSpnner.classList.add("hidden");
}

const selectCategory = async (id, btn) => {
    showLoading();

    const allbtn = document.querySelectorAll("#categories-container button, #allCategoryBtn");
    allbtn.forEach(b => {
        b.classList.remove("btn-primary");
        b.classList.add("btn-outline");
    });

    btn.classList.remove("btn-outline");
    btn.classList.add("btn-primary");

    const res = await fetch(`https://openapi.programming-hero.com/api/category/${id}`);
    const data = await res.json();
    displayTreeCardData(data.plants)
    removeLoading();
}

allCategoryBtn.addEventListener("click", () => {
    const allbtn = document.querySelectorAll("#categories-container button, #allCategoryBtn");
    allbtn.forEach(b => {
        b.classList.remove("btn-primary");
        b.classList.add("btn-outline");
    });

    allCategoryBtn.classList.remove("btn-outline");
    allCategoryBtn.classList.add("btn-primary");

    loadPlantsCard();
});

async function openModal(id) {
    const res = await fetch(`https://openapi.programming-hero.com/api/plant/${id}`)
    const data = await res.json();
    const plantData = data.plants;
    modalTitle.textContent = plantData.name;
    modalCategory.textContent = plantData.category;
    modalDescription.textContent = plantData.description;
    modalPricid.textContent = plantData.price;
    ModalImage.src = plantData.image;
    tree_modal.showModal();
}