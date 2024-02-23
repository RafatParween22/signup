"use client"
import { useState } from 'react';

const Signup = () => {
	const [formData, setFormData] = useState({
		username: '',
		email: '',
		password: '',
		confirmPassword: '',
		name: '',
		profilePicture: '',
		terms: false
	});
	const [errors, setErrors] = useState({});
	const [successMessage, setSuccessMessage] = useState('');
	const [errorMessage, setErrorMessage] = useState('');

	const validateForm = () => {
		const errors = {};
		if (!formData.username.trim()) {
			errors.username = 'Username is required';
		}
		if (!formData.email.trim()) {
			errors.email = 'Email is required';
		} else if (!/^\S+@\S+\.\S+$/.test(formData.email)) {
			errors.email = 'Invalid email format';
		}
		if (!formData.password.trim()) {
			errors.password = 'Password is required';
		} else if (formData.password.trim().length < 8) {
			errors.password = 'Password must be at least 8 characters';
		} else if (!/(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}/.test(formData.password)) {
			errors.password = 'Password must be at least 8 characters long, contain at least one uppercase letter, one lowercase letter, one digit, and one special character';
		}
		if (formData.password !== formData.confirmPassword) {
			errors.confirmPassword = 'Passwords must match';
		}
		setErrors(errors);
		return Object.keys(errors).length === 0;
	};

	const handleInputChange = (e) => {
		const { name, value, type, checked } = e.target;
		const inputValue = type === 'checkbox' ? checked : value;
		setFormData({ ...formData, [name]: inputValue });
	};

	const handleSignup = async (e) => {
		e.preventDefault();
		if (validateForm()) {
			try {
				console.log('Signing up...', formData);
				console.log('Sending welcome email to:', formData.email);
				setSuccessMessage('Signup successful!');
				setTimeout(() => {
					console.log('Redirecting to post list screen...');
				}, 2000);
				setFormData({
					username: '',
					email: '',
					password: '',
					confirmPassword: '',
					name: '',
					profilePicture: '',
					terms: false
				});
			} catch (error) {
				setErrorMessage('Signup failed. Please try again.');
				console.error('Signup error:', error);
			}
		}
	};

	return (
		<div className='main-container'>
			<div className="container">
				<h1>Signup</h1>
				<form onSubmit={handleSignup}>
					<div>
						<input
							type="text"
							name="username"
							value={formData.username}
							onChange={handleInputChange}
							placeholder="Username"
						/>
						{errors.username && <div className="error">{errors.username}</div>}
					</div>
					<div>
						<input
							type="email"
							name="email"
							value={formData.email}
							onChange={handleInputChange}
							placeholder="Email"
						/>
						{errors.email && <div className="error">{errors.email}</div>}
					</div>
					<div>
						<input
							type="password"
							name="password"
							value={formData.password}
							onChange={handleInputChange}
							placeholder="Password"
						/>
						{errors.password && <div className="error">{errors.password}</div>}
					</div>
					<div>
						<input
							type="password"
							name="confirmPassword"
							value={formData.confirmPassword}
							onChange={handleInputChange}
							placeholder="Confirm Password"
						/>
						{errors.confirmPassword && <div className="error">{errors.confirmPassword}</div>}
					</div>
					<div>
						<input
							type="text"
							name="name"
							value={formData.name}
							onChange={handleInputChange}
							placeholder="Name (optional)"
						/>
					</div>
					<div>
						<input
							type="text"
							name="profilePicture"
							value={formData.profilePicture}
							onChange={handleInputChange}
							placeholder="Profile Picture URL (optional)"
						/>
					</div>
					<div>
						<input
							type="checkbox"
							name="terms"
							checked={formData.terms}
							onChange={handleInputChange}
							id="terms"
						/>
						<label htmlFor="terms">I agree to the terms and conditions</label>
						{errors.terms && <div className="error">{errors.terms}</div>}
					</div>
					<button type="submit">Signup</button>
				</form>
				{successMessage && <div className="success">{successMessage}</div>}
				{errorMessage && <div className="error">{errorMessage}</div>}
			</div>
		</div>

	);
};

export default Signup;
