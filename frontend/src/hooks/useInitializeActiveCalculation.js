import { useEffect } from 'react';
import { useSelector } from 'react-redux';

export default (activeCalculation, activeCalculationId, setFormData, setActiveCalculationId) => {
	const { user } = useSelector((state) => state.auth);

	useEffect(() => {
		// Dont reload active calculation on currency change or on user preference change.
		if (user && activeCalculation && activeCalculationId !== activeCalculation?._id) {
			// If active calculation is present set it to state
			setActiveCalculationId(activeCalculation._id);
			setFormData({ ...activeCalculation.formData });
		}
	}, [activeCalculation, user]);
};
