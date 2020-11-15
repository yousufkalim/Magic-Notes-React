import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import axios from "axios";

//Material Content
import AddIcon from "@material-ui/icons/Add";
import Button from "@material-ui/core/Button";

function Input(props) {
	//Intializing States
	let [note, setNote] = useState({ title: "", note: "" });
	let [error, setError] = useState("");

	//When user click on note textarea then have to expand with title and btn
	let [expand, setExpand] = useState(false);

	//Initializing History
	let history = useHistory();

	//Handle Input
	const handleInput = (e) => {
		setNote((prev) => {
			return {
				...prev,
				[e.target.name]: e.target.value,
			};
		});
	};

	//Handle Submit
	const handleSubmit = (e) => {
		e.preventDefault();
		axios
			.post("http://localhost:5000/notes", {
				withCredentials: true,
				data: note,
			})
			.then(() => {
				history.push("/");
				setNote({ title: "", note: "" });
				setError("");
			})
			.catch((err) => {
				console.log(err);
				setError("Note Cannot be empty");
			});
	};

	//Returning component
	return (
		<section>
			<div className="input-container">
				<form
					onSubmit={handleSubmit}
					style={error !== "" ? { border: "2px solid red" } : null}
				>
					{expand ? (
						<input
							type="text"
							name="title"
							placeholder="Title"
							value={note.title}
							onChange={handleInput}
						/>
					) : null}
					<textarea
						cols="30"
						rows="5"
						name="note"
						placeholder="Take a note..."
						value={note.note}
						onChange={handleInput}
						onClick={() => setExpand(true)}
					/>
					{error ? (
						<span className="create-error">
							Note Cannot be Empty
						</span>
					) : null}
					{expand ? (
						<Button type="submit">
							<AddIcon />
						</Button>
					) : null}
				</form>
			</div>
		</section>
	);
}

export default Input;
