const searchBtn = document.getElementById('search-btn');
const furnitureList = document.getElementById('furniture');
const furnitureDetailsContent = document.querySelector('.furniture-details-content');
const closeBtn = document.getElementById('close-btn');
const searchInput = document.getElementById('search-input');


searchBtn.addEventListener('click', getFurnitureList);
searchInput.addEventListener('keypress', function (e) {
    if (e.key === 'Enter') {
        getFurnitureList();
    }
})
searchInput.addEventListener('mouseout', () => {
    if (searchInput.value == '') {
        getallItems(`https://66f8d38d2a683ce973103919.mockapi.io/furniture`)
    }
    else {
        getFurnitureList()
    }
})
furnitureList.addEventListener('click', getFurnitureDetails);


function getFurnitureList() {
    let searchInputTxt = document.getElementById('search-input').value;
    getallItems(`https://66f8d38d2a683ce973103919.mockapi.io/furniture/?category=${searchInputTxt}`);
}

function getallItems(url) {
    fetch(url)
        .then(response => {
            return response.json();
        })
        .then(data => {
            let items = '';
            data.forEach(item => {
                items += `
                    <div class="furniture-item">
                        <div class="furniture-img" id="${item['id']}">
                            <img src="${item['image'][1]}"
                                alt="">
                            <div class="furniture-name">
                                <h3>${item['title']}</h3>
                                <h4>${item['category']}</h4>
                                <a href="#" class="details-btn">Get Details</a>
                            </div>
                        </div>
                    </div>
                `
                furnitureList.classList.remove('notFound');
            });
            furnitureList.innerHTML = items;
        })
        .catch(error => {
            console.log('Error here : ', error);
            furnitureList.classList.add('notFound');
            furnitureList.innerHTML = `<p>Sorry, We don't Found Any Product</p>`;
        })

}
getallItems(`https://66f8d38d2a683ce973103919.mockapi.io/furniture`);

function getFurnitureDetails(e) {
    e.preventDefault();
    if (e.target.classList.contains('details-btn')) {
        let furnitureItem = e.target.parentElement.parentElement;
        fetch(`https://66f8d38d2a683ce973103919.mockapi.io/furniture/${furnitureItem.id}`)
            .then(response => {
                return response.json();
            })
            .then(data => furnitureDetailsModal(data));

    }
}

function furnitureDetailsModal(furniture) {
    let currentFurnitureItem = `
        <h2 class="details-title">${furniture.title}</h2>
        <p class="details-category">${furniture.category}</p>
        <div class="details-instruct">
            <h3>Details :</h3>
            <p class="price">
                ${furniture.price}$
            </p>
            <p>
                ${furniture.description}
            </p>
        </div>
        <div class="details-furniture-img">
            <img
                src="${furniture.image[1]}">
        </div>
    `;
    console.log(currentFurnitureItem);

    furnitureDetailsContent.innerHTML = currentFurnitureItem;
    furnitureDetailsContent.parentElement.classList.add('showDetails');
    closeBtn.addEventListener('click', () =>  furnitureDetailsContent.parentElement.classList.remove('showDetails'));

}