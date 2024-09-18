const express = require("express");
const fs = require("fs");
const path = require("path");

const app = express();
const filepath = path.join(__dirname, 'todos.json');
let id = 1;

app.use(express.json());


app.post("/", async function (req, res) {        //adding new todo
    const task = req.body.task;
    const done = req.body.done;

    let todos = readTods();

    todos.push({
        TodoNo: id,
        Task: task,
        Done: done
    });
    id++;
    await writeTodo(todos);

    res.send({
        message: "New Todo added"
    });
});

app.delete("/", async function (req, res) {      // Deleting a do 
    const id = req.body.id;
    let todos = readTods();
    const todoExists = todos.some(todo => todo.TodoNo == id);
    
        if (todoExists) {
            todos = todos.filter(todo => todo.TodoNo !== id);
            await writeTodo(todos);
            res.send({
                message: `${id} no Todo is deleted`
            })
        }
        else {
            res.send({
                message: "id is invalid"
            })
        }
    

})

app.put("/", async function (req, res) {         //edit the todo or update the status of the todo
    const id = req.body.id;
    const modifiedTask = req.body.modifiedTask;
    const updateDone = req.body.updateDone;
    let todos = readTods();
    if (modifiedTask) {  //user want to modify the task
        for (let i = 0; i < todos.length; i++) {
            if (todos[i].TodoNo == id) {
                todos[i].Task = modifiedTask;
                await writeTodo(todos);
                res.send({
                    message: "Todo Modified"
                })
            }
        }
    }
    else if (updateDone) { //user want to update  the done status
        for (let i = 0; i < todos.length; i++) {
            if (todos[i].TodoNo == id) {
                todos[i].Done = updateDone;
                await writeTodo(todos);
                res.send({
                    message: "Todo Modified"
                })
            }
        }
    }
    else {
        res.send({
            message: "Id is invalid"
        })
    }
})

app.get("/", async function (req, res) {         // Get all todos
    let todos = readTods();
    if (todos.length == 0) {
        res.send({
            message: "You todo list is empty"
        })
    }
    else {
        res.send({
            todos
        })

    }
})

function readTods() {                            //Read all todos from the todos.json file
    let todos = [];

    try {
        if (fs.existsSync(filepath)) {
            const data = fs.readFileSync(filepath, 'utf-8');
            if (data) {
                todos = JSON.parse(data);
            } else {
                todos = [];
            }
        }
    } catch (err) {
        return res.status(500).send({
            message: "Error reading todos file: " + err.message
        });
    }
    return todos;
}

function writeTodo(todos) {                      //Write todo in todos.json file
    try {
        const data = JSON.stringify(todos);
        fs.writeFileSync(filepath, data);
    } catch (err) {
        return res.status(500).send({
            message: "Error writing todos file: " + err.message
        });
    }
}

app.listen(3000, () => {
    console.log("Server running on http://localhost:3000");
});
