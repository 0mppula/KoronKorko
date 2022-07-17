import React, { useEffect, useState } from 'react';
import { reset, register } from '../../features/auth/authSlice';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

import Spinner from '../../components/Loading/Loading';
import { useTitle } from '../../hooks/useTitle';

const Register = () => {
	useTitle('Register');
	const [formData, setFormData] = useState({
		username: '',
		email: '',
		password: '',
		password2: '',
	});
	const [formErrors, setFormErrors] = useState({
		username: false,
		email: false,
		password: false,
		password2: false,
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

		const darkMode =
			JSON.parse(localStorage.getItem('darkMode')) ||
			(window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches);

		if (formValidated()) {
			if (password !== password2) {
				setFormErrors({ ...formErrors, password: true, password2: true });
				toast.error("The passwords don't match");
			} else {
				const userData = {
					username,
					email,
					password,
					darkMode,
				};

				dispatch(register(userData));
			}
		} else {
			toast.error('Incorrect field values');
		}
	};

	const formValidated = () => {
		const requiredFields = [username, email, password, password2];
		const requiredFieldLabels = ['username', 'email', 'password', 'password2'];
		const errors = { ...formErrors };

		requiredFields.forEach((rf, i) => {
			const empty = rf === '';
			errors[requiredFieldLabels[i]] = empty;
			setFormErrors(errors);
		});

		// Check that all the required fields are not empty values
		return requiredFields.every((rf) => {
			const notEmpty = rf !== '';
			return notEmpty;
		});
	};

	if (isLoading) {
		return <Spinner />;
	}

	return (
		<>
			<section className="heading authentication">
				<h1>
					<span>R</span>egister
				</h1>
				<p>Create a KoronKorko account</p>
			</section>

			<section className="form">
				<form onSubmit={(e) => onSubmit(e)}>
					<div className="form-group">
						<label htmlFor="username">Username</label>
						<input
							id="username"
							className={`form-control ${formErrors.username ? 'error' : ''}`}
							placeholder="Enter your username"
							type="text"
							name="username"
							value={username}
							onChange={(e) => handleChange(e)}
						/>
					</div>
					<div className="form-group">
						<label htmlFor="email">Email</label>
						<input
							id="email"
							className={`form-control ${formErrors.email ? 'error' : ''}`}
							placeholder="Enter your email"
							type="text"
							name="email"
							value={email}
							onChange={(e) => handleChange(e)}
						/>
					</div>
					<div className="form-group">
						<label htmlFor="password">Password</label>
						<input
							id="password"
							className={`form-control ${formErrors.password ? 'error' : ''}`}
							placeholder="Enter password"
							type="password"
							name="password"
							value={password}
							onChange={(e) => handleChange(e)}
						/>
					</div>
					<div className="form-group">
						<label htmlFor="password2">Confirm Password</label>
						<input
							id="password2"
							className={`form-control ${formErrors.password2 ? 'error' : ''}`}
							placeholder="Confirm password"
							type="password"
							name="password2"
							value={password2}
							onChange={(e) => handleChange(e)}
						/>
					</div>
					<div className="form-group btn-group">
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
