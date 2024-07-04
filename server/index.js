import express from "express";
import cors from "cors";
import pg from "pg";
import 'dotenv/config';

const app = express();
const port = 3000;
const db = new pg.Client({
    user: process.env.DB_USER,
    host: process.env.DB_HOST,
    database: process.env.DB_NAME,
    password: process.env.DB_PASSWORD,
    port: process.env.DB_PORT,
});
db.connect();

//Middleware
app.use(cors());
app.use(express.json());

//ROUTES//
//create a todo
app.post("/todos", async (req, res) => {
    try {
        const {description} = req.body;
        const newTodo = await db.query(
            "INSERT INTO todo (description) VALUES($1) RETURNING *",[description]
        );
        res.json(newTodo);
    } catch (err) {
        res.status(404).send(err.response.data);
    }
});

//get all todos
app.get("/todos", async(req, res) => {
    try {
        const allTodos = await db.query("SELECT * FROM todo");
        res.json(allTodos.rows);
    } catch (err) {
        console.error(err.message);
    }
});

//get a todo
app.get("/todos/:id", async (req, res) => {
    try {
        const { id } = req.params;
        const todo = await db.query("SELECT * FROM todo WHERE todo_id = $1", [id]);
    
        res.json(todo.rows);
    } catch (err) {
        console.error(err.message);
    }
});

//update a todo
app.put("/todos/:id", async (req, res) => {
    try {
        const { id } = req.params;
        const { description } = req.body;
        const updateTodo = await db.query("UPDATE todo SET description = $1 WHERE todo_id = $2", [description, id]);

        res.sendStatus(200);
    } catch (err) {
        console.error(err.message);
    }
});


//delete a todo
app.delete("/todos/:id", async (req, res) => {
    try {
        const { id } = req.params;
        const deleteTodo = await db.query("DELETE FROM todo WHERE todo_id = $1", [id]);
        
        res.sendStatus(200);
    } catch (err) {
        console.error(err.message);
    }
});

app.listen(port, () => {
    console.log(`Server running on port ${port}.`);
});