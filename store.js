function save(event) {
    event.preventDefault();

    const candyName = event.target.candyName.value;
    const description = event.target.description.value;
    const price = event.target.price.value;
    var quantity = event.target.quantity.value;

    const obj = {
        candyName,
        description,
        price,
        quantity
    }

    axios.post("https://crudcrud.com/api/541d195eeb2e43588144d9068f47b45a/store",obj)
    .then((response) => {
        showCandies(response.data)
        console.log(response)
    })
    .catch((error)=> {
        console.log(error)
    })
}

window.addEventListener("DOMContentLoaded", () => {
    axios.get("https://crudcrud.com/api/541d195eeb2e43588144d9068f47b45a/store")
        .then((response) => {
            for(var i=0;i<response.data.length;i++){
                showCandies(response.data[i]);
            }
        })
        .catch((error) => {
            console.log(error)
        })
})

function showCandies(obj) {
    const tbody = document.querySelector('#candyTable tbody');

    // Create a new row for each candy
    const row = document.createElement('tr');

    // Create table cells for candy properties
    const nameCell = document.createElement('td');
    const descriptionCell = document.createElement('td');
    const priceCell = document.createElement('td');
    var quantityCell = document.createElement('td');
    const actionCell = document.createElement('td');

    // Create buttons for different actions
    const Buy1 = createButton('Buy-1', 'btn btn-primary');
    const Buy2 = createButton('Buy-2', 'btn btn-secondary');
    const Buy3 = createButton('Buy-3', 'btn btn-danger');

    Buy1.addEventListener('click', () => {
        obj.quantity -= 1;
        updateQuantityAndSave(obj,quantityCell);
    });

    Buy2.addEventListener('click', () => {
        obj.quantity -= 2;
        updateQuantityAndSave(obj,quantityCell);
    });

    Buy3.addEventListener('click', () => {
        obj.quantity -= 3;
        updateQuantityAndSave(obj,quantityCell);
    });


    // Set the text content of the cells
    nameCell.textContent = obj.candyName;
    descriptionCell.textContent = obj.description;
    priceCell.textContent = obj.price;
    quantityCell.textContent = obj.quantity;

    // Append buttons to the action cell
    actionCell.appendChild(Buy1);
    actionCell.appendChild(Buy2);
    actionCell.appendChild(Buy3);

    // Append cells to the row
    row.appendChild(nameCell);
    row.appendChild(descriptionCell);
    row.appendChild(priceCell);
    row.appendChild(quantityCell);
    row.appendChild(actionCell);

    // Append the row to the table body
    tbody.appendChild(row);
}

function createButton(text, className) {
    const button = document.createElement('button');
    button.textContent = text;
    button.className = className;
    return button;
}

function updateQuantityAndSave(updatedObj,quantityCell) {
    // Update the displayed quantity cell
    quantityCell.textContent = updatedObj.quantity;

    // Perform the PUT request to update the quantity on the server
    axios.put(`https://crudcrud.com/api/541d195eeb2e43588144d9068f47b45a/store/${updatedObj._id}`, updatedObj)
       .then((response) => {
        console.log('Candy updated:', response.data);
       }) 
       .catch((error) => {
        console.log('Error updating candy:', error);
       });
}
