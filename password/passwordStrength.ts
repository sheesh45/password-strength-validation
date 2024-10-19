
export function usePasswordStrength(password: string) {
    passwordRules.forEach(rule => rule.case = rule.test.test(password));

    const minLength = passwordRules[0].case;
    const strengthScore = passwordRules
        .slice(1)
        .filter(rule => rule.case)
        .length;
    return setPasswordStrength(minLength, strengthScore, password);
}

const passwordRules = [
    { label: "Minimum number of characters is 12", case: false, test: /.{12,}/ },
    { label: "Should contain lowercase", case: false, test: /[a-z]/ },
    { label: "Should contain uppercase", case: false, test: /[A-Z]/ },
    { label: "Should contain numbers", case: false, test: /\d/ },
    { label: "Should contain special characters", case: false, test: /[!@#$%^&*(),.?":{}|<>]/ },
];

const passwordStrengthEnum = {
    WEAK: { label: "Weak", score: 33.33, color: 'bg-red-500' },
    MEDIUM: { label: "Medium", score: 66.67, color: 'bg-yellow-300' },
    STRONG: { label: "Strong", score: 100, color: 'bg-green-500' }
};


const setPasswordStrength = (minLength: boolean, strengthScore: number, password: string | any[]) => {
    if (minLength && strengthScore >= 3) {
        return updatePasswordStrength(passwordStrengthEnum.STRONG);
    } else if (password.length > 6 && strengthScore >= 2) {
        return updatePasswordStrength(passwordStrengthEnum.MEDIUM);
    } else {
        return updatePasswordStrength(passwordStrengthEnum.WEAK);
    }
};

const updatePasswordStrength = (strength: { label: any; score: any; color: any; }) => {
    return {
        label: strength.label,
        score: strength.score,
        color: strength.color,
    };
};
