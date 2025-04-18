const uri = 'api/todoitems';
let todos = [];
let spells = [];

function getItems() {
  // testing code:
  const testSpells = ['Acid Splash', 'Fire Bolt', 'Shocking Grasp'];
  _displaySpells(testSpells);
  const testSpell = ['Fireball', 'Lightning Bolt', 'Plant Growth'];
  _displayItems(testSpell);

  // fetch(uri)
  //   .then(response => response.json())
  //   .then(data => _displaySpells(data))
  //   .catch(error => console.error('Unable to get items.', error));
}

function addItem() {
  const addNameTextbox = document.getElementById('add-name');

  const item = {
    isComplete: false,
    name: addNameTextbox.value.trim()
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
    })
    .catch(error => console.error('Unable to add item.', error));
}

function deleteItem(id) {
  fetch(`${uri}/${id}`, {
    method: 'DELETE'
  })
  .then(() => getItems())
  .catch(error => console.error('Unable to delete item.', error));
}

function displayEditForm(id) {
  const item = todos.find(item => item.id === id);
  
  document.getElementById('edit-name').value = item.name;
  document.getElementById('edit-id').value = item.id;
  document.getElementById('edit-isComplete').checked = item.isComplete;
  document.getElementById('editForm').style.display = 'block';
}

function updateItem() {
  const itemId = document.getElementById('edit-id').value;
  const item = {
    id: parseInt(itemId, 10),
    isComplete: document.getElementById('edit-isComplete').checked,
    name: document.getElementById('edit-name').value.trim()
  };

  fetch(`${uri}/${itemId}`, {
    method: 'PUT',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(item)
  })
  .then(() => getItems())
  .catch(error => console.error('Unable to update item.', error));

  closeInput();

  return false;
}

function closeInput() {
  document.getElementById('editForm').style.display = 'none';
}

function _displayCount(spellSlot) {
  // const name = (itemCount === 1) ? 'to-do' : 'to-dos';
  const level = 3;

  document.getElementById('counter').innerText = `${level}rd Level: ${spellSlot}/3`;
}

function _displaySpells(data) {
  // const tBody = document.getElementById('todos');
  // tBody.innerHTML = '';

  const spellSelect = document.getElementById('spell-select');

  // _displayCount(data.length);

  // const button = document.createElement('button');

  data.forEach(item => {
    const spellOption = document.createElement('option');
    spellOption.value = item;
    spellOption.text = item;
    spellSelect.add(spellOption);
    // let isCompleteCheckbox = document.createElement('input');
    // isCompleteCheckbox.type = 'checkbox';
    // isCompleteCheckbox.disabled = true;
    // isCompleteCheckbox.checked = item.isComplete;

    // let editButton = button.cloneNode(false);
    // editButton.innerText = 'Edit';
    // editButton.setAttribute('onclick', `displayEditForm(${item.id})`);

    // let deleteButton = button.cloneNode(false);
    // deleteButton.innerText = 'Delete';
    // deleteButton.setAttribute('onclick', `deleteItem(${item.id})`);

    // let tr = tBody.insertRow();
    
    // let td1 = tr.insertCell(0);
    // td1.appendChild(isCompleteCheckbox);

    // let td2 = tr.insertCell(1);
    // let textNode = document.createTextNode(item.name);
    // td2.appendChild(textNode);

    // let td3 = tr.insertCell(2);
    // td3.appendChild(editButton);

    // let td4 = tr.insertCell(3);
    // td4.appendChild(deleteButton);
  });

  spells = data;
}


function _displayItems(data) {
  const tBody = document.getElementById('spell-list');
  tBody.innerHTML = '';

  const slotsLeft = 3;

  _displayCount(slotsLeft);

  const button = document.createElement('button');

  data.forEach(item => {
    let castButton = button.cloneNode(false);
    castButton.innerText = 'Cast';
    // editButton.setAttribute('onclick', `displayCastForm(${item.id})`);

    let descButton = button.cloneNode(false);
    descButton.innerText = 'Info';
    // descButton.setAttribute('onclick', `displayEditForm(${item.id})`);

    let deleteButton = button.cloneNode(false);
    deleteButton.innerText = 'Delete';
    // deleteButton.setAttribute('onclick', `deleteItem(${item.id})`);

    let tr = tBody.insertRow();
    
    let td1 = tr.insertCell(0);
    td1.appendChild(castButton);

    let td2 = tr.insertCell(1);
    let textNode = document.createTextNode(item);
    td2.appendChild(textNode);

    let td3 = tr.insertCell(2);
    let textnode2 = document.createTextNode('V,S,M');
    td3.appendChild(textnode2);

    let td4 = tr.insertCell(3);
    td4.appendChild(descButton);

    let td5 = tr.insertCell(4);
    td5.appendChild(deleteButton);
  });

  todos = data;
}