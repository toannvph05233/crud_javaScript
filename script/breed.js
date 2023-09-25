let inputType = document.getElementById("input-type");
let inputBreed = document.getElementById("input-breed");
let submitBtn = document.getElementById("submit-btn");

let breedArr = getToStorage("breedArr", []);

function validateType() {
    if (!inputType.value) {
        alert("is required!");
        return false;
    }
    return true;
}

function validateBreed() {
    if (!inputBreed.value) {
        alert("is required!");
        return false;
    }
    return true;
}

function addBreed() {
    if (validateBreed() && validateType()){
        breedArr.push({name: inputBreed.value, type: inputType.value});
        saveToStorage("breedArr",breedArr);
        alert("create Breed susses")
        clearInput();
    }
    renderBreed(breedArr);
}

submitBtn.addEventListener("click", addBreed);


function clearInput() {
    inputType.value = "";
    inputBreed.value = "";
}

function renderBreed(breedArr) {
    const tableBody = document.getElementById("tbody");
    tableBody.innerHTML = "";
    for (let i = 0; i < breedArr.length; i++) {
        const breed = breedArr[i];
        const row = document.createElement("tr");
        row.innerHTML = `
            <th scope="row">${i+1}</th>
            <td>${breed.name}</td>
            <td>${breed.type}</td>
            <td><button type="button" class="btn btn-danger" onclick="deleteBreed(${i})">Delete</button></td>
        `;

        tableBody.appendChild(row);
    }
}

renderBreed(breedArr);

function deleteBreed(index) {
    if (confirm('Are you sure?')) {
        breedArr.splice(index, 1);
        saveToStorage("breedArr",breedArr);
        renderBreed(breedArr);
    }
}
