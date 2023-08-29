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

let petArr = [];
let healthyCheck = false;
let healthyPetArr = [];

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
        addData();
    }
});

function validateId() {
    const id = idInput.value;
    if (!id || !isIdUnique(id)) {
        alert("ID must be unique!");
        return false;
    }
    return true;
}

function isIdUnique(id) {
    for (let i = 0; i < petArr.length; i++) {
        if (petArr[i].id == id) {
            return false;
        }
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


// 4. Thêm thú cưng vào danh sách
function addData() {
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
    petArr.push(petData);
    clearInput();
    alert("Data added successfully!");
    renderTableData(petArr);

}
function formatDate(date) {
    const day = String(date.getDate()).padStart(2, '0');
    const month = String(date.getMonth() + 1).padStart(2, '0'); // Months are 0-based
    const year = date.getFullYear();
    return `${day}/${month}/${year}`;
}


// 5. Hiển thị danh sách thú cưng
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
            <td><button type="button" class="btn btn-danger" onclick="deletePet(${pet.id})">Delete</button></td>
        `;

        tableBody.appendChild(row);
    }
}

renderTableData(petArr);

// 6. Xóa các dữ liệu vừa nhập trên Form
function clearInput() {
    idInput.value = "";
    nameInput.value = "";
    ageInput.value = "";
    typeInput.value = "";
    weightInput.value = "";
    lengthInput.value = "";
    breedInput.value = "";
    colorInput.value = "";
    vaccinatedInput.checked = false;
    dewormedInput.checked = false;
    sterilizedInput.checked = false;
}

// 7. Xóa một thú cưng
function deletePet(id) {
    if (confirm('Are you sure?')) {
        // tìm index có id muốn xóa.
        const index = petArr.findIndex(pet => pet.id == id);
        if (index !== -1) {
            petArr.splice(index, 1);
            renderTableData(petArr);
        }
    }
}


// 8. Hiển thị các thú cưng khỏe mạnh
function filterHealthyPets() {
    if (healthyCheck) {
        renderTableData(petArr);
        document.getElementById("healthy-btn").textContent = "Show Healthy Pet";
    } else {
        healthyPetArr = petArr.filter(pet => pet.vaccinated && pet.dewormed && pet.sterilized);
        renderTableData(healthyPetArr);
        document.getElementById("healthy-btn").textContent = "Show All Pet";
    }

    healthyCheck = !healthyCheck;
}

document.getElementById("healthy-btn").addEventListener("click", filterHealthyPets);


// 9. (Nâng cao) Tính toán chỉ số BMI
const bmiBtn = document.getElementById("calculate-bmi");
function calculateBMI(weight, length, type) {
    const multiplier = type === "Dog" ? 703 : 886;
    const bmi = (weight * multiplier) / (length ** 2);
    return bmi.toFixed(2);
}

bmiBtn.addEventListener("click", function () {
    for (let i = 0; i < petArr.length; i++) {
        const pet = petArr[i];
        const bmi = calculateBMI(pet.weight, pet.length, pet.type);
        pet.bmi = bmi;
    }
    renderTableData(petArr);
});
