function exportData() {
    const jsonData = JSON.stringify(getToStorage("petArr", []));
    const blob = new Blob([jsonData], {type: "application/json"});
    saveAs(blob, "./pet_data.json");
    alert("thành công")
}

document.getElementById("export-btn").addEventListener("click", exportData);

document.getElementById("import-btn").addEventListener("click", (event) => {
    const fileInput = document.getElementById("input-file");
    const selectedFile = fileInput.files[0];
    if (selectedFile) {
        const reader = new FileReader();
        reader.onload = (e) => {
            const importedData = JSON.parse(e.target.result);
            saveToStorage("petArr", importedData);
            console.log("importedData")
            console.log(importedData)
        };
        reader.readAsText(selectedFile);
        alert("thành công")

    }
});
