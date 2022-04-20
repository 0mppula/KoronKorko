import React, { useEffect, useState } from 'react';
import { FaUser } from 'react-icons/fa';

const Register = () => {
	const [formData, setFormData] = useState({
		username: '',
		email: '',
		password: '',
		password2: '',
	});

	const { username, email, password, password2 } = formData;

	const onChange = (e) => {
		setFormData((prev) => ({
			...prev,
			[e.target.name]: e.target.value,
		}));
	};

	const onSubmit = (e) => {
		e.preventDefault();
	};

	return (
		<>
			<section className="heading">
				<h1>
					<FaUser /> Register
				</h1>
				<p>Please create an account</p>
			</section>

			<section className="form" onSubmit={(e) => onSubmit(e)}>
				<div className="form-group">
					<input
						className="form-control"
						placeholder="Enter your username"
						type="text"
						name="username"
						id="username"
						value={username}
						onChange={(e) => onChange(e)}
					/>
				</div>
				<div className="form-group">
					<input
						className="form-control"
						placeholder="Enter your email"
						type="text"
						name="email"
						id="email"
						value={email}
						onChange={(e) => onChange(e)}
					/>
				</div>
				<div className="form-group">
					<input
						className="form-control"
						placeholder="Enter password"
						type="password"
						name="password"
						id="password"
						value={password}
						onChange={(e) => onChange(e)}
					/>
				</div>
				<div className="form-group">
					<input
						className="form-control"
						placeholder="Confirm password"
						type="password"
						name="password2"
						id="password2"
						value={password2}
						onChange={(e) => onChange(e)}
					/>
				</div>
				<button type="submit" className="btn btn-block">
					Register
				</button>
			</section>
		</>
	);
};

export default Register;
