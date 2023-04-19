
async function loadItems() {
    let items = [];
    try {
      const response = await fetch('/api/items');
      items = await response.json();
  
      localStorage.setItem('items', JSON.stringify(items));
    } catch {

      const itemsText = localStorage.getItem('items');
      if (itemsText) {
        items = JSON.parse(itemsText);
      }
    }
    displayItems(items);
}

function displayItems(items) {
    const tableBodyEl = document.querySelector('#myUL');
  
    if (items.length) {
      for (const [i, item] of items.entries()) {
        addNewItem(item.value);

        /*const positionTdEl = document.createElement('li');
        const nameTdEl = document.createElement('li');
        const scoreTdEl = document.createElement('li');
        const dateTdEl = document.createElement('li');
  
        positionTdEl.textContent = i + 1;
        nameTdEl.textContent = score.name;
        scoreTdEl.textContent = score.score;
        dateTdEl.textContent = score.date;
  
        const rowEl = document.createElement('tr');
        rowEl.appendChild(positionTdEl);
        rowEl.appendChild(nameTdEl);
        rowEl.appendChild(scoreTdEl);
        rowEl.appendChild(dateTdEl);
  
        tableBodyEl.appendChild(rowEl); */
      }
    } else {
      tableBodyEl.innerHTML = '<tr><td colSpan=4>Add an item</td></tr>';
    }
  }

loadItems();

function addNewItem(i) {
    var li = document.createElement("li");
    var inputValue = i;
    var t = document.createTextNode(inputValue);
    li.appendChild(t);
    /*if (inputValue === '') {
        alert("You must write something!");
    } */
        document.getElementById("myUL").appendChild(li);
    
    //document.getElementById("myInput").value = "";

    var span = document.createElement("SPAN");
    var txt = document.createTextNode("\u00D7");
    span.className = "close";
    span.appendChild(txt);
    li.appendChild(span);

    for (i = 0; i < close.length; i++) {
        close[i].onclick = function() {
            var div = this.parentElement;
            div.style.display = "none";
        }
    }
}


var myNodelist = document.getElementsByTagName("LI");
var i;
for (i = 0; i < myNodelist.length; i++) {
    var span = document.createElement("SPAN");
    var txt = document.createTextNode("\u00D7");
    span.className = "close";
    span.appendChild(txt);
    myNodelist[i].appendChild(span);
}

var close = document.getElementsByClassName("close");
var i;
for (i = 0; i < close.length; i++) {
    close[i].onclick = function() {
        var div = this.parentElement;
        div.style.display = "none";
        remove(i);
    }
}

var list = document.querySelector('ul');
list.addEventListener('click', function(ev) {
    if (ev.target.tagName === 'LI') {
        ev.target.classList.toggle('checked');
    }
}, false);

function newElement() {
    var li = document.createElement("li");
    var inputValue = document.getElementById("myInput").value;
    var t = document.createTextNode(inputValue);
    li.appendChild(t);
    if (inputValue === '') {
        alert("You must write something!");
    } else {
        document.getElementById("myUL").appendChild(li);
    }
    document.getElementById("myInput").value = "";

    var span = document.createElement("SPAN");
    var txt = document.createTextNode("\u00D7");
    span.className = "close";
    span.appendChild(txt);
    li.appendChild(span);

    for (i = 0; i < close.length; i++) {
        close[i].onclick = function() {
            var div = this.parentElement;
            div.style.display = "none";
        }
    }
    saveItem(inputValue);
}

async function saveItem(item) {
    const newItem = { value:  item};

    try {
      const response = await fetch('/api/item', {
        method: 'POST',
        headers: { 'content-type': 'application/json' },
        body: JSON.stringify(newItem),
      });

      // Store what the service gave us as the high scores
      const items = await response.json();
      localStorage.setItem('items', JSON.stringify(items));
    } catch {
      // If there was an error then just track scores locally
      this.updateItemsLocal(newItem);
    }
  }

  async function remove(item) {
    const response = await fetch('/api/item', {
        method: 'UPDATE',
        headers: { 'content-type': 'application/json' },
        body: JSON.stringify(item),
      });
    }

  
  function updateItemsLocal(newItem) {
    let items = [];
    const itemsText = localStorage.getItem('items');
    if (itemsText) {
      items = JSON.parse(itemsText);
    }

    items.push(newItem);

    localStorage.setItem('items', JSON.stringify(items));
  } 
