import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
export const getTodosAsync = createAsyncThunk(
  "todos/getTodosAsync",
  async () => {
    const response = await fetch(
      "https://todolistreactapps.herokuapp.com/todos"
    );
    if (response.ok) {
      const todos = await response.json();
      return { todos };
    }
  }
);

export const addTodoAsync = createAsyncThunk(
  "todos/addTodosAsync",
  async (payload) => {
    const response = await fetch(
      "https://todolistreactapps.herokuapp.com/todos",
      {
        method: "post",
        headers: {
          "content-type": "application/json",
        },
        body: JSON.stringify({ title: payload.title }),
      }
    );
    if (response.ok) {
      const todo = await response.json();
      return { todo };
    }
  }
);

export const toggleCompletedAsync = createAsyncThunk(
  "todos/toggleTodosAsync",
  async (payload) => {
    const response = await fetch(
      `https://todolistreactapps.herokuapp.com/todos/${payload.id}`,
      {
        method: "PATCH",
        headers: {
          "content-type": "application/json",
        },
        body: JSON.stringify({ completed: payload.completed }),
      }
    );
    if (response.ok) {
      const todo = await response.json();
      return { id: todo.id, completed: todo.completed };
    }
  }
);

export const deleteTodoAsync = createAsyncThunk(
  "todos/deleteTodoAsync",
  async (payload) => {
    const response = await fetch(
      `https://todolistreactapps.herokuapp.com/todos/${payload.id}`,
      {
        method: "DELETE",
      }
    );
    if (response.ok) {
      return { id: payload.id };
    }
  }
);

const todoSlice = createSlice({
  name: "todos",
  initialState: [],
  reducers: {
    addTodo: (state, action) => {
      const todo = {
        id: Date.now(),
        title: action.payload.title,
        completed: false,
      };
      state.push(todo);
    },
    toggleCompleted: (state, action) => {
      const index = state.findIndex((todo) => todo.id === action.payload.id);
      state[index].completed = action.payload.completed;
    },
    deleteTodo: (state, action) => {
      return state.filter((todo) => todo.id !== action.payload.id);
    },
  },
  extraReducers: {
    [getTodosAsync.pending]: (state, action) => {
      console.log("fetching data...");
    },
    [getTodosAsync.fulfilled]: (state, action) => {
      console.log("fetched data successfully!...");
      return action.payload.todos;
    },
    [addTodoAsync.fulfilled]: (state, action) => {
      state.push(action.payload.todo);
    },
    [toggleCompletedAsync.fulfilled]: (state, action) => {
      const index = state.findIndex((todo) => todo.id === action.payload.id);
      state[index].completed = action.payload.completed;
    },
    [deleteTodoAsync.fulfilled]: (state, action) => {
      return state.filter((todo) => todo.id !== action.payload.id);
    },
  },
});

export const { addTodo, toggleCompleted, deleteTodo } = todoSlice.actions;
export default todoSlice.reducer;
