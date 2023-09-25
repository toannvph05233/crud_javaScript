let petArr = getToStorage("petArr", []);
let breedArr = getToStorage("breedArr", []);

function renderBreed(breedArr) {
    const inputBreed = document.getElementById("input-breed");

    inputBreed.innerHTML = "";
    for (let i = 0; i < breedArr.length; i++) {
        const breed = breedArr[i];
        const option = document.createElement("option");
        option.innerText = breed.name;
        inputBreed.appendChild(option);
    }
}
document.getElementById("input-type").addEventListener("change", (e)=>renderBreedByType(e.target.value))


function renderBreedByType(type) {
    let newBreedArr = breedArr.filter((b) => b.type == type)
    renderBreed(newBreedArr);
}
renderBreed(breedArr);


document.getElementById("find-btn").addEventListener("click", function () {
    // Lấy giá trị từ các trường nhập liệu
    var idInput = document.getElementById("input-id").value.toLowerCase();
    var nameInput = document.getElementById("input-name").value.toLowerCase();
    var typeInput = document.getElementById("input-type").value.toLowerCase();
    var breedInput = document.getElementById("input-breed").value.toLowerCase();
    var vaccinatedInput = document.getElementById("input-vaccinated").checked;
    var dewormedInput = document.getElementById("input-dewormed").checked;
    var sterilizedInput = document.getElementById("input-sterilized").checked;

    // Thực hiện tìm kiếm trong mảng petArr
    var searchResults = petArr.filter(function (pet) {
        return (pet.id.toLowerCase().includes(idInput) &&
            pet.name.toLowerCase().includes(nameInput) &&
            (typeInput === "select type" || pet.type.toLowerCase() === typeInput) &&
            (breedInput === "select breed" || pet.breed.toLowerCase() === breedInput) &&
            (!vaccinatedInput || pet.vaccinated) &&
            (!dewormedInput || pet.dewormed) &&
            (!sterilizedInput || pet.sterilized));
    });

    renderTableData(searchResults);

});

function renderTableData(petArr) {
    const tableBody = document.getElementById("tbody");
    tableBody.innerHTML = "";
    for (let i = 0; i < petArr.length; i++) {
        const pet = petArr[i];
        const row = document.createElement("tr");
        row.innerHTML = `
            <th scope="row">${pet.id}</th>
            <td>${pet.name}</td>
            <td>${pet.age}</td>
            <td>${pet.type}</td>
            <td>${pet.weight} kg</td>
            <td>${pet.length} cm</td>
            <td>${pet.breed}</td>
            <td><i class="bi bi-square-fill" style="color:${pet.color}"></i></td>
            <td><i class="bi bi-${pet.vaccinated ? 'check-circle-fill' : 'x-circle-fill'}"></i></td>
            <td><i class="bi bi-${pet.dewormed ? 'check-circle-fill' : 'x-circle-fill'}"></i></td>
            <td><i class="bi bi-${pet.sterilized ? 'check-circle-fill' : 'x-circle-fill'}"></i></td>
            <td>${pet.date}</td>
        `;

        tableBody.appendChild(row);
    }
}

