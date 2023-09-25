const submitBtn = document.getElementById("submit-btn");
const idInput = document.getElementById("input-id");
const nameInput = document.getElementById("input-name");
const ageInput = document.getElementById("input-age");
const typeInput = document.getElementById("input-type");
const weightInput = document.getElementById("input-weight");
const lengthInput = document.getElementById("input-length");
const breedInput = document.getElementById("input-breed");
const colorInput = document.getElementById("input-color-1");
const vaccinatedInput = document.getElementById("input-vaccinated");
const dewormedInput = document.getElementById("input-dewormed");
const sterilizedInput = document.getElementById("input-sterilized");
const breed = document.getElementById("input-breed");

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

submitBtn.addEventListener("click", function () {
    if (
        validateId() &&
        validateName() &&
        validateAge() &&
        validateWeight() &&
        validateLength() &&
        validateType() &&
        validateBreed()
    ) {
        editData();
    }
});

function validateId() {
    const id = idInput.value;
    if (!id) {
        alert("ID must be unique!");
        return false;
    }
    return true;
}

function validateName() {
    const name = nameInput.value;
    if (!name) {
        alert("Name is required!");
        return false;
    }
    return true;
}

function validateAge() {
    const age = parseInt(ageInput.value);
    if (isNaN(age) || age < 1 || age > 15) {
        alert("Age must be between 1 and 15!");
        return false;
    }
    return true;
}

function validateWeight() {
    const weight = parseFloat(weightInput.value);
    if (isNaN(weight) || weight < 1 || weight > 15) {
        alert("Weight must be between 1 and 15!");
        return false;
    }
    return true;
}

function validateLength() {
    const length = parseFloat(lengthInput.value);
    if (isNaN(length) || length < 1 || length > 100) {
        alert("Length must be between 1 and 100!");
        return false;
    }
    return true;
}

function validateType() {
    const type = typeInput.value;
    if (!type) {
        alert("Please select Type!");
        return false;
    }
    return true;
}

function validateBreed() {
    const breed = breedInput.value;
    if (!breed) {
        alert("Please select Breed!");
        return false;
    }
    return true;
}


function editData() {
    const petData = {
        id: idInput.value,
        name: nameInput.value,
        age: parseInt(ageInput.value),
        type: typeInput.value,
        weight: parseFloat(weightInput.value),
        length: parseFloat(lengthInput.value),
        breed: breedInput.value,
        color: colorInput.value,
        vaccinated: vaccinatedInput.checked,
        dewormed: dewormedInput.checked,
        sterilized: sterilizedInput.checked,
        bmi: 0,
        date: formatDate(new Date())
    };
    for (let i = 0; i < petArr.length; i++) {
        if (petArr[i].id == idInput.value){
            petArr[i] = petData;
        }
    }
    console.log(petArr)
    saveToStorage("petArr", petArr);
    alert("Data Edit successfully!");
    renderTableData(petArr);

}

function formatDate(date) {
    const day = String(date.getDate()).padStart(2, '0');
    const month = String(date.getMonth() + 1).padStart(2, '0'); // Months are 0-based
    const year = date.getFullYear();
    return `${day}/${month}/${year}`;
}


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
            <td>${pet.bmi === 0 ? '?' : pet.bmi}</td>
            <td>${pet.date}</td>
            <td><button type="button" class="btn btn-danger" onclick="showEdit(${pet.id})">Edit</button></td>
        `;

        tableBody.appendChild(row);
    }
}

renderTableData(petArr);


function showEdit(id) {
    var container = document.getElementById("container-form");
    if (container.classList.contains("hide")) {
        container.classList.remove("hide");
    }
    let pet = petArr.filter((p)=> p.id == id);
    pet = pet[0];
    idInput.value = pet.id;
    nameInput.value = pet.name;
    ageInput.value = pet.age;
    typeInput.value =pet.type;
    weightInput.value = pet.weight;
    lengthInput.value = pet.length;
    breedInput.value = pet.breed;
    colorInput.value = pet.color;
    vaccinatedInput.checked = pet.vaccinated ? true: false;
    dewormedInput.checked = pet.dewormed ? true: false;;
    sterilizedInput.checked = pet.sterilized ? true: false;;
}
