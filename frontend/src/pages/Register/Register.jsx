import React, { useEffect, useState } from 'react';
import { reset, register } from '../../features/auth/authSlice';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { FaUser } from 'react-icons/fa';

import Spinner from '../../components/Loading/Loading';

const Register = () => {
	const [formData, setFormData] = useState({
		username: '',
		email: '',
		password: '',
		password2: '',
	});

	const dispatch = useDispatch();
	const navigate = useNavigate();

	const { username, email, password, password2 } = formData;
	const { user, isLoading, isError, isSuccess, message } = useSelector((state) => state.auth);

	useEffect(() => {
		if (isError) {
			toast.error(message);
		}

		if (isSuccess || user) {
			navigate('/');
		}

		dispatch(reset());
	}, [user, isError, isSuccess, message, dispatch, navigate]);

	const handleChange = (e) => {
		setFormData((prev) => ({
			...prev,
			[e.target.name]: e.target.value,
		}));
	};

	const onSubmit = (e) => {
		e.preventDefault();

		if (password !== password2) {
			toast.error("The passwords don't match");
		} else {
			const userData = {
				username,
				email,
				password,
			};

			dispatch(register(userData));
		}
	};

	if (isLoading) {
		return <Spinner />;
	}

	return (
		<>
			<section className="heading authentication">
				<h1>
					<FaUser /> <span>R</span>egister
				</h1>
				<p>Create a KoronKorko account</p>
			</section>

			<section className="form">
				<form onSubmit={(e) => onSubmit(e)}>
					<div className="form-group">
						<input
							className="form-control"
							placeholder="Enter your username"
							type="text"
							name="username"
							id="username"
							value={username}
							onChange={(e) => handleChange(e)}
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
							onChange={(e) => handleChange(e)}
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
							onChange={(e) => handleChange(e)}
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
							onChange={(e) => handleChange(e)}
						/>
					</div>
					<div className="from-group">
						<button type="submit" className="btn btn-block">
							Register
						</button>
					</div>
				</form>
			</section>
		</>
	);
};

export default Register;
