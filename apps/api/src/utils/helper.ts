/* Password must match atleast 1 Capital letter, 1 Number and 1 Special Character */
export const PasswordExtraConditionRegex = /^(?=.*[A-Z])(?=.*\d)(?=.*[^A-Za-z0-9]).{10}$/;

export const PasswordExtraConditionMessage = 'Password must contain at least one uppercase letter, one number, and one special character';