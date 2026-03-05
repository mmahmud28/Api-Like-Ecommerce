// fetch("https://openapi.programming-hero.com/api/categories")
// .then(res=>res.json())
// .then(data=>console.log(data.categories));

const categoriesContainer = document.getElementById('categories-container');

async function loadData (){
    const res = await(fetch("https://openapi.programming-hero.com/api/categories"));

    const data =await res.json();

    data.categories.forEach((categories)=>{
        const btn = document.createElement("button");
        btn.className="btn btn-outline w-full mb-5";
        btn.textContent=categories.category_name;
        categoriesContainer.appendChild(btn);
    });
    
}
loadData();
