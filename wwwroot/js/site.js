const uri = 'api/todoitems';
let todos = [];

function getItems() {
    fetch(uri)
        .then(response => response.json())
        .then(data => _displayItems(data))
        .catch(error => console.error('Unable to get items.', error));
}




function addItem() {

    const addNameTextbox = document.getElementById('add-name');
    const addAnswerTextbox = document.getElementById('add-answer');
    const addType = document.getElementById('add-type')

    const item = {
        
        name: addNameTextbox.value.trim(),
        Answer: addAnswerTextbox.value.trim(),
        type: addType.value.trim()
    };
  
    fetch(uri, {
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(item)
    })
        .then(response => response.json())
        .then(() => {
            getItems();
            addNameTextbox.value = '';
            addAnswerTextbox.value = '';
            addType.value = 'General';
        })
        .catch(error => console.error('Unable to add item.', error));

    document.getElementById('addForm').style.display = 'none';
}

function deleteItem(id) {
    


    fetch(`${uri}/${id}`, {
        method: 'DELETE'
    })
        .then(() => getItems())
        .catch(error => console.error('Unable to delete item.', error));
}

function displayEditForm(id) {

    document.getElementById('editForm').style.display = 'contents';
    const item = todos.find(item => item.id === id);

    document.getElementById('edit-name').value = item.name;
    document.getElementById('edit-answer').value = item.answer;
    document.getElementById('edit-id').value = item.id;
    document.getElementById('edit-type').value = item.type;
    
}

function displayAddForm() {

    document.getElementById('addForm').style.display = 'contents';
    


}


function updateItem() {
    const itemId = document.getElementById('edit-id').value;
   
    let editNameTextbox = document.getElementById('edit-name').value.trim();
    let editAnswerTextbox = document.getElementById('edit-answer').value.trim();
    let editType = document.getElementById('edit-type').value.trim();
    
     
    

    const item = {
        id: parseInt(itemId, 10),
       
        name: editNameTextbox,
        Answer: editAnswerTextbox,
        type: editType
    };

    
    fetch(`${uri}/${itemId}`, {
        method: 'PUT',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(item)
    })
 
        .then(() => {
            getItems();
        })
   

        .catch(error => console.error('Unable to update item.', error));

    closeInput();

    return false;
}

function closeInput() {
    document.getElementById('editForm').style.display = 'none';
}

function _displayCount(itemCount) {
    const name = (itemCount === 1) ? 'to-do' : 'to-dos';
}

function _displayItems(data) {
    const tBody = document.getElementById('todos');
    tBody.innerHTML = '';

    _displayCount(data.length);

    const button = document.createElement('button');

    data.forEach(item => {


        let editButton = button.cloneNode(false);
        editButton.innerText = 'Edit';
        editButton.setAttribute('onclick', `displayEditForm(${item.id})`);

        let deleteButton = button.cloneNode(false);
        deleteButton.innerText = 'Delete';
        deleteButton.setAttribute('onclick', `deleteItem(${item.id})`);

        let tr = tBody.insertRow();
       

        let td2 = tr.insertCell(0);
        let textNode = document.createTextNode(item.name);
        td2.appendChild(textNode);
       
        let td5 = tr.insertCell(1);
        let textNode2 = document.createTextNode(item.answer);
        td5.appendChild(textNode2);

        let td6 = tr.insertCell(2);
        let textNode3 = document.createTextNode(item.type);
        td6.appendChild(textNode3);

        let td3 = tr.insertCell(3);
        td3.appendChild(editButton);

        let td4 = tr.insertCell(4);
        td4.appendChild(deleteButton);

    });

  

    todos = data;
}