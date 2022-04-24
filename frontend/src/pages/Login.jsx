import React, { useEffect, useState } from 'react';
import { FaSignInAlt } from 'react-icons/fa';
import { useDispatch, useSelector } from 'react-redux';
import { reset, login } from '../features/auth/authSlice';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

import Spinner from '../components/Loading/Loading';

const Login = () => {
	const [formData, setFormData] = useState({
		email: '',
		password: '',
	});

	const navigate = useNavigate();
	const dispatch = useDispatch();

	const { email, password } = formData;
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

	const onChange = (e) => {
		setFormData((prev) => ({
			...prev,
			[e.target.name]: e.target.value,
		}));
	};

	const onSubmit = (e) => {
		e.preventDefault();

		const userData = {
			email,
			password,
		};

		dispatch(login(userData));
	};

	if (isLoading) {
		return <Spinner />;
	}

	return (
		<>
			<section className="heading">
				<h1>
					<FaSignInAlt /> Login
				</h1>
				<p>Login to the site</p>
			</section>

			<section className="form">
				<form onSubmit={(e) => onSubmit(e)}>
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
						<button type="submit" className="btn btn-block">
							Login
						</button>
					</div>
				</form>
			</section>
		</>
	);
};

export default Login;
