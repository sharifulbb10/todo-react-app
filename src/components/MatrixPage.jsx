import React, { useEffect, useState } from 'react'
import { NavLink } from 'react-router'

function MatrixPage() {

	const [todos, setTodos] = useState([]);

	useEffect(() => {
		let todos = (localStorage.todos!== undefined) ? JSON.parse(localStorage.getItem('todos')): [];
		setTodos(todos);
	}, [])

	return (
		<div>
			<div className='flex justify-center'>
				<NavLink to="/" className={({isActive})=>isActive?"active":""}><div className="w-25 h-8 bg-cyan-900 text-white flex justify-center items-center m-[1px] p-2 rounded-tl-md rounded-bl-md cursor-pointer hover:bg-teal-900"><span className="text-xs text-center ">All Tasks</span></div></NavLink>
				<NavLink to="/eishenshowersmatrix" className={({isActive})=>isActive?"active":""}><div className="w-25 h-8 bg-cyan-900 text-white flex justify-center items-center m-[1px] p-2 rounded-tr-md rounded-br-md cursor-pointer hover:bg-teal-900"><span className="text-xs text-center">E. Matrix</span></div></NavLink>
			</div>
			<h1 className="text-center mt-4 text-lg md:text-2xl mb-3 font-bold">Eisenhower Matrix</h1>
			<div className="grid grid-rows-[10px_1fr_1fr] grid-cols-[10px_1fr_1fr] gap-2 m-1 md:m-5 md:gap-3">
				<div className="row-[1/2] col-[2/3] h-3 text-xs flex justify-center items-center font-bold text-teal-800 md:text-[15px]">Important</div>
				<div className="row-[1/2] col-[3/4] h-3 text-xs flex justify-center items-center font-bold text-teal-800 md:text-[15px]">Less Important</div>
				<div className="row-[2/3] col-[1/2] transform text-xs flex justify-center items-center"><div className="transform rotate-[-90deg] whitespace-nowrap font-bold text-teal-800 md:text-[15px] md:text-[15px]">Urgent</div></div>
				<div className="row-[3/4] col=[1/2] transform text-xs flex justify-center items-center"><div className="transform rotate-[-90deg] whitespace-nowrap font-bold text-teal-800 md:text-[15px]">Less Urgent</div></div>

				<div className="row-[2/3] col-[2/3] min-h-30 bg-indigo-200 rounded-md">
					{todos.map((element)=>{
						if (element.priority1==="important" && element.priority2==="urgent" && element.isCompleted===false)
							return <div className="important-urgent my-1 ml-2 relative text-xs px-1 md:text-[14px] text-teal-900" key={element.id}>
								{element.todo}
							</div>
					})}
				</div>
				<div className="row-[2/3] col-[3/4] min-h-30  bg-slate-200 rounded-md">
					{todos.map((element)=>{
						if (element.priority1==="lessImportant" && element.priority2==="urgent" && element.isCompleted===false)
							return <div className="lessImportant-urgent my-1 ml-2 relative text-xs px-1 md:text-[14px] text-teal-900" key={element.id}>
								{element.todo}
								</div>
					})}
				</div>
				<div className="row-[3/4] col-[2/3] min-h-30  bg-slate-200 rounded-md">
					{todos.map((element)=>{
						if (element.priority1==="important" && element.priority2==="lessUrgent" && element.isCompleted===false)
							return <div className="important-lessUrgent my-1 ml-2 relative text-xs px-1 md:text-[14px] text-teal-900" key={element.id}>
								{element.todo}
							</div>					
						})}
				</div>
				<div className="row-[3/4] col-[3/4] min-h-30 bg-indigo-200 rounded-md">
					{todos.map((element)=>{
						if (element.priority1==="lessImportant" && element.priority2==="lessUrgent" && element.isCompleted===false)
							return <div className="lessImportant-lessUrgent my-1 ml-2 relative text-xs px-1 md:text-[14px] text-teal-900" key={element.id}>
								{element.todo}
							</div>
					})}
				</div>
			</div>
		</div>
	)
}

export default MatrixPage