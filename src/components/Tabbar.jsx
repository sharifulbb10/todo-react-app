import React, {useId, useState, useEffect} from 'react'
import { NavLink } from 'react-router'

function Tabbar() {

	const [todos, setTodos] = useState([]);

	useEffect(() => {
		let obtainTodos = (localStorage.todos!=="undefined") ? JSON.parse(localStorage.getItem('todos')): [];
		if (obtainTodos) {
			setTodos(obtainTodos)
		} else {
			setTodos([]);
		}
	}, [])

	const saveTodos = (todos) => {
		localStorage.setItem("todos", JSON.stringify(todos));
	}

	const handleAddTask = () => {
		let inputBox = document.querySelector('.inputBox');
		let saveButton = document.querySelector('.saveButton');
		let addButton = document.querySelector('.addButton');
		inputBox.querySelector('#task').value = "";
		inputBox.style.display = inputBox.style.display==='none'? "block": "none";
		saveButton.style.display = 'none';
		addButton.style.display = 'flex';
	}

	const handleAdd = (event) => {
		let task = document.querySelector("#task").value;
		let priority1 = document.querySelector("#priority1").value;
		let priority2 = document.querySelector("#priority2").value;
		let todo = task;
		event.preventDefault();
		handleAddTask();
		let todoList;
		if (task.length>2) {
			todoList = [...todos, {id: self.crypto.randomUUID(), todo, priority1: priority1, priority2: priority2, isCompleted: false}];
			setTodos(todoList); 
		}
		saveTodos(todoList);
	}

	const handleChange = (e)=> {
		let targetId = e.target.parentElement.id;
		e.target.checked ? makeIsCompletedTrue():makeIsCompletedFalse();

		function makeIsCompletedTrue() {
			let newTodos = todos.filter((element)=>{
				if (element.id===targetId) {
					element.isCompleted = true;
				}
				return element;
			})
			setTodos(newTodos);
			saveTodos(newTodos);
		}

		function makeIsCompletedFalse() {
			let newTodos = todos.filter(element=>{
				if(element.id ===targetId) {
					element.isCompleted = false;
				}
				return element;
			})
			setTodos(newTodos);	
			saveTodos(newTodos);
		}

		transferCompleted();

		function transferCompleted() {
			todos.forEach((element) => {
				if (element.isCompleted === true) {

				}
			})
		}
	}

	let todoId;

	const handleEdit = (e) => {
		
		todoId = e.target.parentNode.parentElement.id;
		let inputBox = document.querySelector('.inputBox');
		inputBox.style.display = inputBox.style.display === 'none'? 'block': 'none';
		document.querySelector('.addButton').style.display = "none";
		document.querySelector('.saveButton').style.display = "flex";
		document.querySelector('#task').value = e.target.parentElement.parentElement.childNodes[1].textContent;
	}

	const handleSave = (event) => {
			let updatedTodo = event.target.parentElement.parentElement.childNodes[0].childNodes[1];
			let priority1 = document.querySelector("#priority1").value;
			let priority2 = document.querySelector("#priority2").value;
			event.preventDefault();
			let newTodos = todos.filter(element=>{
				if(element.id===todoId) {
					element.todo = document.querySelector('#task').value;
					element.priority1 = priority1;
					element.priority2 = priority2;
				}
				return element;
			})
			setTodos(newTodos);
			saveTodos(newTodos);
			document.querySelector(".inputBox").style.display = "none";
		}

	const handleCancel = (e) => {
		document.querySelector(".inputBox").style.display = "none";
		e.preventDefault();
	}

	const handleChangeCompleted = (e) => {
		let elementId = e.target.parentElement.id;
		let newTodos = todos.filter(element=>{
			if (element.id === elementId) {
				element.isCompleted = false;
			}
			return element;
		})
		setTodos(newTodos);
		saveTodos(newTodos);
	}

	const handleDelete = (e) => {
		let elementId = e.target.parentElement.parentElement.id;
		let newTodos = todos.filter(element=>element.id!=elementId);
		setTodos(newTodos);
		saveTodos(newTodos);
	}

	const handleClickCompleted = () => {
		let completedList = document.querySelector(".completed-list");
		completedList.style.display = completedList.style.display==="none"?"block":"none";
		let svgImage = document.querySelector("path");
		if (svgImage.getAttribute('d')==="M0 6L8 14L16 6V4H0V6Z") {
			svgImage.setAttribute('d', "M0 10L8 2L16 10V12H0V10Z");
		} else {
			svgImage.setAttribute('d', "M0 6L8 14L16 6V4H0V6Z");
		}
	}

	const handleDeleteCompleted = (id) =>{
		let newTodos = todos.filter(element => element.id!=id);
		setTodos(newTodos);
		saveTodos(newTodos);
	}

	return (
		<div>
			<div className='flex justify-center'>
				<NavLink to="/todo-react-app/" className={({isActive})=>isActive?"active":""}><div className="w-25 h-8 bg-cyan-900 text-white flex justify-center items-center m-[1px] p-2 rounded-tl-md rounded-bl-md cursor-pointer hover:bg-teal-900"><span className="text-xs text-center md:text-md">All Tasks</span></div></NavLink>
				<NavLink to="/todo-react-app/eishenshowersmatrix" className={({isActive})=>isActive?"active":""}><div className="w-25 h-8 bg-cyan-900 text-white flex justify-center items-center m-[1px] p-2 rounded-tr-md rounded-br-md cursor-pointer hover:bg-teal-900"><span className="text-xs text-center md:text-md">E. Matrix</span></div></NavLink>
			</div>
			<div className="relative">
				<div className="flex justify-between m-2">
					<span className="font-bold">Tasks</span>
					<div className="w-20 h-6 bg-[#044740] hover:bg-green-900 text-xs text-white flex justify-center rounded-sm cursor-pointer">
						<span className="self-center md:text-md font-bold" onClick={handleAddTask}>Add Task</span>
					</div>
				</div>

				<div className="text-xs w-[95%] m-2">
					{todos.map((eachItem)=> {
						if (eachItem.isCompleted===false) {
							return <div className="taskShow min-h-7 bg-slate-300 mx-2 my-2 pl-[4px] py-[3px] flex items-center md:text-[14px] text-teal-900" key={eachItem.id} id={eachItem.id}>
								<input type="checkbox" className="mr-2" onChange={handleChange}/>
								<span className="w-3/5 md:text-[14px]"><span>{eachItem.todo}</span></span>
								<div className="ml-auto">
									<button className="editButton mx-2 bg-slate-500 text-white p-[2px] rounded-sm cursor-pointer" onClick={handleEdit}>Edit</button>
									<button className="mx-2 bg-slate-500 text-white p-[2px] rounded-sm cursor-pointer" onClick={handleDelete}>Delete</button>
								</div>
							</div>
							}
						})}
						
				</div>

				<form style={{'display': 'none'}} className="inputBox absolute top-5 m-3 ml-5 p-2 border-1 border-gray-200 bg-green-100 w-[90%] rounded-lg" action="post">
					<div className="flex flex-col">
						<label htmlFor="task" className="text-[15px]">Add Task:</label>
						<input type="text" id='task' className="border-1 border-gray-100 w-full p-1 text-[13px] bg-white" />
					</div>
					<div className="mt-3 text-sm md:text-[14px]"><span>Set Priority:</span></div>
					<div className="ml-4 flex flex-col text-[15px]">
						<select name="priority1" id="priority1" className="w-40 ml-5 my-2 bg-white text-[14px]">
							<option value="important">Important</option>
							<option value="lessImportant">Less Important</option>
						</select>
						<select name="priority2" id="priority2" className="w-40 ml-5 bg-white text-[14px]">
							<option value="urgent">Urgent</option>
							<option value="lessUrgent">Less Urgent</option>
						</select>
					</div>
					<div style={{"display": "flex",}} className="addButton justify-end mt-5 md:text-[14px]">
						<button className="py-1 px-3 bg-slate-500 text-white text-[12px]" onClick={handleAdd}>Add</button>
						<button className="ml-2 py-1 px-3 bg-slate-500 text-white text-[12px]" onClick={handleCancel}>Cancel</button>
					</div>
					<div style={{"display": "none",}} className="saveButton justify-end mt-5">
						<button className="py-1 px-3 bg-slate-500 text-white text-[12px]" onClick={handleSave}>Save</button> 
						<button className="ml-2 py-1 px-3 bg-slate-500 text-white text-[12px]" onClick={handleCancel}>Cancel</button>
					</div>
				</form>
			</div>
			<div className="w-[95%] mt-3 m-2">
				<div className="flex items-center cursor-pointer" onClick={handleClickCompleted}>
					<span className="font-bold">Completed</span> 
					<div className="m-2">
						<svg width="10px" height="10px" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
						<path d="M0 6L8 14L16 6V4H0V6Z" fill="#000000"/>
						</svg>
					</div>
				</div>
				<div style={{display: "none"}} className="completed-list text-teal-900">
					{todos.map((element)=>{
					if (element.isCompleted===true) {
						return <div className="flex items-center min-h-7 bg-slate-300 mx-2 my-2 pl-[4px] py-[3px] md:text-[14px]" key={element.id} id={element.id}>
						<input type="checkbox" className="mr-2" checked={true} onChange={handleChangeCompleted}/>
						<span className="completedTask text-xs md:text-[14px]">{element.todo}</span>
						<button className="mx-2 bg-slate-500 text-white p-[2px] rounded-sm cursor-pointer ml-auto text-xs" onClick={()=>handleDeleteCompleted(element.id)}>Delete</button>
					</div>
						}
					})}
				</div>
			</div>

		</div>
	)
}

export default Tabbar