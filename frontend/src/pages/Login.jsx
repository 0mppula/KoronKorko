import React, { useEffect, useState } from 'react';
import { FaSignInAlt } from 'react-icons/fa';

const Login = () => {
	const [formData, setFormData] = useState({
		email: '',
		password: '',
	});

	const { email, password } = formData;

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
					<FaSignInAlt /> Login
				</h1>
				<p>Login to the site</p>
			</section>

			<section className="form" onSubmit={(e) => onSubmit(e)}>
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
				<button type="submit" className="btn btn-block">
					Login
				</button>
			</section>
		</>
	);
};

export default Login;
