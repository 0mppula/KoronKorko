const addCreateCalculationCase = (builder, createCalculation) => {
	// Create calculation
	builder
		.addCase(createCalculation.pending, (state) => {
			state.message = '';
			state.isLoading = true;
		})
		.addCase(createCalculation.fulfilled, (state, action) => {
			state.isLoading = false;
			state.isSuccess = true;
			state.calculations.push(action.payload);
			state.activeCalculation = action.payload;
			state.message = 'New calculation created';
			state.isError = false;
		})
		.addCase(createCalculation.rejected, (state, action) => {
			state.isLoading = false;
			state.isError = true;
			state.isSuccess = false;
			state.message = action.payload;
		});
};

const addGetCalculationsCase = (builder, getCalculations) => {
	// Get users calculations
	builder
		.addCase(getCalculations.pending, (state) => {
			state.message = '';
			state.isLoading = true;
		})
		.addCase(getCalculations.fulfilled, (state, action) => {
			state.isLoading = false;
			state.isSuccess = true;
			state.calculations = action.payload;
			state.isError = false;
		})
		.addCase(getCalculations.rejected, (state, action) => {
			state.isLoading = false;
			state.isError = true;
			state.isSuccess = false;
			state.message = action.payload;
		});
};

const addGetCalculationCase = (builder, getCalculation) => {
	// Get a users calculation
	builder
		.addCase(getCalculation.pending, (state) => {
			state.message = '';
			state.isLoading = true;
		})
		.addCase(getCalculation.fulfilled, (state, action) => {
			state.isLoading = false;
			state.isSuccess = true;
			state.activeCalculation = action.payload;
			state.message = `${action.payload.name} imported`;
			state.isError = false;
		})
		.addCase(getCalculation.rejected, (state, action) => {
			state.isLoading = false;
			state.isError = true;
			state.isSuccess = false;
			state.message = action.payload;
		});
};

const addUpdateCalculationCase = (builder, updateCalculation) => {
	// Update users calculation
	builder
		.addCase(updateCalculation.pending, (state) => {
			state.message = '';
			state.isLoading = true;
		})
		.addCase(updateCalculation.fulfilled, (state, action) => {
			state.isLoading = false;
			state.isSuccess = true;
			state.activeCalculation = action.payload;
			state.message = 'Calculation Saved';
			state.isError = false;
		})
		.addCase(updateCalculation.rejected, (state, action) => {
			state.isLoading = false;
			state.isError = true;
			state.isSuccess = false;
			state.message = action.payload;
		});
};

const addRenameCalculationCase = (builder, renameCalculation) => {
	// Update a users calculation name
	builder
		.addCase(renameCalculation.pending, (state) => {
			state.message = '';
			state.isLoading = true;
		})
		.addCase(renameCalculation.fulfilled, (state, action) => {
			state.isLoading = false;
			state.isSuccess = true;
			state.activeCalculation = action.payload;
			state.message = 'Calculation Renamed';
			state.isError = false;
		})
		.addCase(renameCalculation.rejected, (state, action) => {
			state.isLoading = false;
			state.isError = true;
			state.isSuccess = false;
			state.message = action.payload;
		});
};

const addDeleteCalculationCase = (builder, deleteCalculation) => {
	// Delete a users calculation
	builder
		.addCase(deleteCalculation.pending, (state) => {
			state.message = '';
			state.isLoading = true;
		})
		.addCase(deleteCalculation.fulfilled, (state, action) => {
			state.isLoading = false;
			state.isSuccess = true;
			state.calculations = state.calculations.filter(
				(calculation) => calculation._id !== action.payload.id
			);
			state.activeCalculation =
				action.payload.id === state.activeCalculation?._id ? null : state.activeCalculation;
			state.message = `${action.payload.name} deleted`;
			state.isError = false;
		})
		.addCase(deleteCalculation.rejected, (state, action) => {
			state.isLoading = false;
			state.isError = true;
			state.isSuccess = false;
			state.message = action.payload;
		});
};

export {
	addCreateCalculationCase,
	addGetCalculationsCase,
	addGetCalculationCase,
	addUpdateCalculationCase,
	addRenameCalculationCase,
	addDeleteCalculationCase,
};
