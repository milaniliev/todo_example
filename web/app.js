"use strict"



class TodoView {
    constructor (todo){
        this.element = document.createElement("div")
        this.element.classList.add("todo")
        this.element.innerHTML = `
        <div class="todo">
            <input type="checkbox" name="done"/>
            <input type="text" name="text"/>
        </div>`
        this.data = todo
        this.text_field = this.element.querySelector("[name=text]")
        this.done_check_box = this.element.querySelector("[name=done]")
        
        this.text_field.addEventListener("change", ()=> {
            this.data.text = this.text_field.value
            this.save(this.data)
        })

        this.done_check_box.addEventListener("change", ()=>{
            this.data.done = this.done_check_box.checked
            this.save(this.data)
        })

        this.update()
    }
    update(){
        this.text_field.value = this.data.text
        this.done_check_box.checked = this.data.done
    }
    save(todo){
        var save_request = new XMLHttpRequest()
        save_request.open("PUT", "/todos/" + todo.id )
        save_request.setRequestHeader("Content-Type", "application/json")
        save_request.send(JSON.stringify(todo))
    }
}

document.getElementById("add_todo", ()=>{
    TodoListView.add_todo()
})

var TodoListView = {
    element: document.getElementById("todo_list"),
    init: function(todos) {
        todos.forEach((todo) => {
            var view = new TodoView(todo)
            this.element.appendChild(view.element)
            
        })
    }

}

var todos_request = new XMLHttpRequest()
todos_request.open("GET", "/todos")
todos_request.addEventListener("load", () => {
    var todos = JSON.parse(todos_request.responseText)
    TodoListView.init(todos)
})
todos_request.send()

