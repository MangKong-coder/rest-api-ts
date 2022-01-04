import { Router } from 'express'

import { Todo } from '../models/todo'

let todos: Todo[] = [] 

type RequestBody = { text: string }
type RequstParams = { todoId: string }

const router = Router()

router.get('/', (req, res, next) => {
  res.status(200).json({
    todos: todos
  })
})

router.post('/todo', (req, res, next) => {
  const body = req.body as RequestBody
  const newTodo: Todo = {
    id: new Date().toISOString(),
    text: body.text
  }

  todos.push(newTodo)
  res.status(201).json({
    message: "Todo added",
    todo: newTodo,
    todos: todos
  })
})

router.put('/todo/:todoId', (req, res, next) => {
  const body = req.body as RequestBody
  const params = req.params as RequstParams
  const tid: string = params.todoId;
  const todoIndex = todos.findIndex(todoItem => todoItem.id === tid)
  if (todoIndex >= 0) {
    todos[todoIndex] = { id: todos[todoIndex].id, text: body.text };
    return res.status(200).json({
      message: "todo successfully updated",
      todos: todos
    })
  }
  res.status(404).json({
    message: "Could not find todo"
  })
})


router.delete('/todo/:todoId', (req, res, next) => {
  const params = req.params as RequstParams
  todos = todos.filter(todoItem => todoItem.id !== params.todoId)
  res.status(200).json({
    message: "Removed todo",
    todos: todos
  })
})



export default router