import React from "react";
import {render} from "react-dom";

	const Title = ({todoCount}) => {
		return (
			<div>
				<div>
					<h1>to-do ({todoCount})</h1>
				</div>
			</div>
		);
	}

	const TodoForm = ({addTodo}) => {
		//input trackr
		let input;
		return (
			<div>
			<input ref={node => { input = node; }} />
			<button onClick={() => {addTodo(input.value); input.value='';}}> + </button>
			</div>
		);
	}
	const Todo = ({todo, remove}) => {
		//each todo
		return (<a href='#' className="list-group-item" onClick={() =>
			{remove(todo.id)}}>{todo.text}</a>);
	}
	const TodoList = ({todos, remove}) => {
		//map through the todos
		const todoNode = todos.map((todo) => {
			return (<Todo todo={todo} key={todo.id} remove={remove}/>)
		});
		return (<ul>{todoNode}</ul>);
	}

	class TodoApp extends React.Component{
		constructor(props){
			// pass props to parent class
			super(props);
			// set initial state
			this.state = {
				data: []
			}
			//API URL goes here
			//here---
		}

		  // Lifecycle method
  componentDidMount(){
    // Make HTTP reques with Axios
    axios.get(this.apiUrl)
      .then((res) => {
        // Set state with result
        this.setState({data:res.data});
      });
  }
		// add to do handler
		addTodo(val){
			//assemble data
			const todo = {text: val}
			//update data
			axios.post(this.apiUrl, todo)
			.then((res) => {
				this.state.data.push(res.data);
				this.setState({data: this.state.data});
			});
			// this.state.data.push(todo);
			// update state
		}
		//handle remove
		handleRemove(id){
			//filter all todos except the one to be removed
			const remainder = this.state.data.filter((todo) => {
				if (todo.id !== id) return todo;
			});
			//update state with filter
			axios.delete(this.apiUrl+'/'+id)
			.then((res) => {
				this.setState({data: remainder});
			})
		}

		render(){
    // Render JSX
    return (
      <div>
        <Title todoCount={this.state.data.length}/>
        <TodoForm addTodo={this.addTodo.bind(this)}/>
        <TodoList 
          todos={this.state.data} 
          remove={this.handleRemove.bind(this)}
        />
      </div>
    );
  }
	}

render(<TodoApp/>, document.getElementById('container'));

