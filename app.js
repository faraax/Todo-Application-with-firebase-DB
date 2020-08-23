var db = firebase.database();

function loadScreen() {

    db.ref("todos").on("child_added", function (data) {

        var todo_list = document.getElementById("list");

        var createLi = document.createElement('li')

        createLi.classList.add('list-group-item');

        createLi.classList.add('list-group-item-action');

        createLi.classList.add('list-group-item-info');

        todo_list.appendChild(createLi);

        createLi.innerHTML = data.val().todo;

        var createDelBtn = document.createElement('button')

        var createDelTxt = document.createTextNode('Delete')

        createDelBtn.classList.add('btn');

        createDelBtn.classList.add('btn-outline-info');

        createDelBtn.classList.add('del-btn');

        createDelBtn.setAttribute("onclick", "delbtn(this)")

        createDelBtn.setAttribute("id", data.val().key)

        createDelBtn.appendChild(createDelTxt)

        createLi.appendChild(createDelBtn)

        var createBtn = document.createElement('button')

        var createTxt = document.createTextNode('Edit')

        createBtn.classList.add('btn');

        createBtn.classList.add('btn-outline-info');

        createBtn.classList.add('edit-btn');

        createBtn.setAttribute("onclick", "editbtn(this)")

        createBtn.setAttribute("id", data.val().key)

        createBtn.appendChild(createTxt)

        createLi.appendChild(createBtn)
       
    })
}

var todo_item = document.getElementById("inp");

function addToList(e) {

    var key = e;

    todo = {

        todo: todo_item.value,

        key: key
    }

    db.ref("todos/" + key).set(todo);

}

function delList() {

    db.ref("todos").remove();

    var todo_list = document.getElementById("list");

    while (todo_list.hasChildNodes()) {

        todo_list.removeChild(todo_list.firstChild)

    }
}

function addTodo() {

    var ref = db.ref("todos");

    ref.once("value").then(function (data) {

        var a = data.numChildren();

        var key = a

        var getLi = document.getElementById('list')

        var key = getLi.firstChild

        if (key === null) {

            var key = 1000;

            key++
            
        } else {

            var key = getLi.lastChild.lastChild.id

            key++
        }

        addToList(key)

        todo_item.value = "";

    });
}

function delbtn(e) {

    var key = e.id

    db.ref("todos").child(key).remove();

    e.parentNode.remove()

}

function editbtn(e) {

    var replaceValue = prompt("Enter new value to list",e.parentNode.firstChild.nodeValue)

    var key = e.id

    todo = {

        todo: replaceValue,

        key: key
    }

    db.ref("todos").child(key).set(todo);

    e.parentNode.firstChild.nodeValue = replaceValue;

}