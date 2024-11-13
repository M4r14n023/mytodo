const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const app = express();
const PORT = process.env.PORT || 4000;

app.use(cors());
app.use(express.json());

// Configuración de MongoDB (reemplaza con tu propia URI)
const mongoURI = "mongodb+srv://marianolumbreras:v0O2xWEi4pEC74pt@cluster0.nzg6o.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0";

// Conexión con MongoDB
mongoose.connect(mongoURI, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log("MongoDB connected"))
    .catch((err) => console.error("MongoDB connection error:", err));

// Definir el modelo de la tarea (todo)
const Todo = mongoose.model('Todo', new mongoose.Schema({
    text: { type: String, required: true },
}, { timestamps: true }));

// Ruta para obtener las tareas
app.get('/api/todos', async (req, res) => {
    try {
        const todos = await Todo.find();
        res.json(todos);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// Ruta para agregar una tarea
app.post('/api/todos', async (req, res) => {
    const newTodo = new Todo({
        text: req.body.text,
    });

    try {
        const savedTodo = await newTodo.save();
        res.status(201).json(savedTodo);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});

// Ruta para eliminar una tarea
app.delete('/api/todos/:id', async (req, res) => {
    try {
        const deletedTodo = await Todo.findByIdAndDelete(req.params.id);
        if (!deletedTodo) {
            return res.status(404).json({ message: 'Todo not found' });
        }
        res.status(204).send();
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// Iniciar servidor
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});

