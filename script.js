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
        btn.onclick=()=>selectCategory(categories.id, btn);
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
             <img class="h-48 w-full object-cover" src="${tree.image}"/>
            </figure>
            <div class="card-body">
                  <h2 class="card-title">${tree.name}</h2>
                  <p class="line-clamp-2">${tree.description}</p>
                <div class="badge badge-outline badge-primary">${tree.category}</div>
                <div class="flex justify-between">
                 <h2 class="font-bold text-xl cg">${tree.price} /=</h2>
                     <button class="btn bg-cg">Add</button>
            </div>
                   
        `
        treesContailner.appendChild(card);
        removeLoading();
    });


}

const treesContailner = document.getElementById('trees-contailner');


const loadingSpnner = document.getElementById("loading-spnner");

const allCategoryBtn = document.getElementById("allCategoryBtn");

loadPlantsCard();

function showLoading (){
    treesContailner.innerHTML="";
    loadingSpnner.classList.remove("hidden");
}
function removeLoading (){
    loadingSpnner.classList.add("hidden");
}

const selectCategory =async (id,btn)=>{
    showLoading();

    const allbtn = document.querySelectorAll("#categories-container button, #allCategoryBtn");
    allbtn.forEach(b=>{
        b.classList.remove("btn-primary");
        b.classList.add("btn-outline");
    });

    btn.classList.remove("btn-outline");
    btn.classList.add("btn-primary");

    const res = await fetch(`https://openapi.programming-hero.com/api/category/${id}`);
    const data= await res.json();
    displayTreeCardData(data.plants)
   removeLoading();
}

allCategoryBtn.addEventListener("click",()=>{
    const allbtn = document.querySelectorAll("#categories-container button, #allCategoryBtn");
    allbtn.forEach(b=>{
        b.classList.remove("btn-primary");
        b.classList.add("btn-outline");
    });

    allCategoryBtn.classList.remove("btn-outline");
    allCategoryBtn.classList.add("btn-primary");

    loadPlantsCard();
});