var express = require("express")
var bodyParser = require("body-parser")
var server = express()

server.use(express.static("../web"))
server.use(bodyParser.json())
var todos = [
    {
        id: 1,
        text: "Do something",
        done: false
    },
    {
        id: 2,
        text: "Do Laundry",
        done: true
    }
]

server.get("/todos", (request, response) => {
    response.json(todos)
})

server.put("/todos/:id", (request, response) => {
    var todo = todos.find((todo) => {return todo.id == Number(request.params.id) })
    console.log(todo)

    todo.text = request.body.text
    todo.done = request.body.done
    response.status(200).end()
})

server.listen(3000)