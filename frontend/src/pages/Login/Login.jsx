import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { reset, login } from '../../features/auth/authSlice';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

import Spinner from '../../components/Loading/Loading';
import { useTitle } from '../../hooks/useTitle';
import PageHeading from '../../components/PageHeading/PageHeading';

const Login = () => {
	useTitle('Login');
	const [formData, setFormData] = useState({
		email: '',
		password: '',
	});
	const [formErrors, setFormErrors] = useState({
		email: false,
		password: false,
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

	const handleChange = (e) => {
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

		if (formValidated()) {
			dispatch(login(userData));
		} else {
			toast.error('Incorrect field values');
		}
	};

	const formValidated = () => {
		const requiredFields = [email, password];
		const requiredFieldLabels = ['email', 'password'];
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
			<PageHeading heading="Login" secondaryHeading="Login to KoronKorko" clamp={false} />

			<section className="form">
				<form onSubmit={(e) => onSubmit(e)}>
					<div className="form-group">
						<label htmlFor="email">Email</label>
						<input
							id="email"
							className={`form-control ${formErrors.email ? 'error' : ''}`}
							placeholder="Enter your email"
							autoComplete="false"
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
					<div className="form-group btn-group">
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
