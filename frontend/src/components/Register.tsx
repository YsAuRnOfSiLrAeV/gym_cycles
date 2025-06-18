import { useState } from "react";
import { Link } from "react-router-dom";

interface RegisterData {
    name: string;
    email: string;
    password: string;
    age: number | "";
    weight: number | "";
    height: number | "";
    benchPr: number | "";
    squatPr: number | "";
    deadliftPr: number | "";
}

export default function Register() {
    const [registerData, setRegisterData] = useState<RegisterData>({
        name: "",
        email: "",
        password: "",
        age: "",
        weight: "",
        height: "",
        benchPr: "",
        squatPr: "",
        deadliftPr: ""
    });

    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState("");
    const [success, setSuccess] = useState("");

    const handleInputChange = (field: keyof RegisterData, value: string) => {
        let processedValue: any = value;

        if (["age", "weight", "height", "benchPr", "squatPr", "deadliftPr"].includes(field)) {
            processedValue = value === "" ? "" : Number(value);
        }

        setRegisterData(prev => ({
            ...prev,
            [field]: processedValue
        }));

        if (error) setError("");
        if (success) setSuccess("");
    };

    const validateForm = (): string | null => {
        if (!registerData.name.trim()) return "Enter your name";
        if (!registerData.email.trim()) return "Enter your email";
        if (!registerData.password) return "Enter your password";
        if (!registerData.age) return "Enter your age";
        if (!registerData.weight) return "Enter your weight";
        if (!registerData.height) return "Enter your height";
        if (!registerData.benchPr) return "Enter your bench press PR";
        if (!registerData.squatPr) return "Enter your squat PR";
        if (!registerData.deadliftPr) return "Enter your dead lift PR";

        if (!registerData.email.includes("@")) return "Please enter a valid email address";

        if (registerData.password.length < 6) return "Password must contain at least 6 characters";

        if (Number(registerData.age) < 14 || Number(registerData.age) > 100) return "Age should be from 14 to 100 years";
        if (Number(registerData.weight) < 30 || Number(registerData.weight) > 300) return "Weight should be from 30 to 300 kg";
        if (Number(registerData.height) < 100 || Number(registerData.height) > 250) return "Height should be from 100 to 250 cm";
        if (Number(registerData.benchPr) < 0) return "Bench press PR cannot be less than zero";
        if (Number(registerData.squatPr) < 0) return "Squat PR cannot be less than zero";
        if (Number(registerData.deadliftPr) < 0) return "Deadlift PR cannot be less than zero";

        return null;
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        
        const validationError = validateForm();
        if (validationError) {
            setError(validationError);
            return;
        }

        setIsLoading(true);
        setError("");

        try {
            const apiData = {
                name: registerData.name.trim(),
                email: registerData.email.trim(),
                password: registerData.password,
                age: Number(registerData.age),
                weight: Number(registerData.weight),
                height: Number(registerData.height),
                benchPr: Number(registerData.benchPr),
                squatPr: Number(registerData.squatPr),
                deadliftPr: Number(registerData.deadliftPr),
                activityLevel: "INTERMEDIATE"
            };

            const response = await fetch('/api/users', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(apiData)
            });
            
            const responseData = await response.json();
            
            if (!response.ok) {
                const errorMessage = responseData.error || 'Registration problem';
                throw new Error(errorMessage);
            }
            
            setSuccess("Registration is successful! You can log in now");

            setRegisterData({
                name: "",
                email: "",
                password: "",
                age: "",
                weight: "",
                height: "",
                benchPr: "",
                squatPr: "",
                deadliftPr: ""
            });
            
        } catch (err: any) {
            console.error('Registration error:', err);
            setError(err.message || "Registration error. Try again");
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="flex-1 bg-[#eeeeee] border-t-12 border-[#D0D0D0]">
            <div className="relative rounded-xl mt-8 lg:mx-8 bg-white p-4 lg:p-8 text-gray-800">

                <div className="text-center mb-8">
                    <h1 className="text-3xl font-poppins font-semibold text-gray-800 mb-2">
                        Registration
                    </h1>
                    <p className="text-gray-600">
                        Create an account to generate personal training programs
                    </p>
                </div>

                <div className="max-w-2xl mx-auto">
                    <div className="bg-white rounded-xl border border-gray-100 p-6 lg:p-8 shadow-sm">

                        {error && (
                            <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg">
                                <p className="text-red-600 text-sm">{error}</p>
                            </div>
                        )}
                        
                        {success && (
                            <div className="mb-6 p-4 bg-green-50 border border-green-200 rounded-lg">
                                <p className="text-green-600 text-sm">{success}</p>
                            </div>
                        )}

                        <form onSubmit={handleSubmit} className="space-y-6">

                            <div className="border-b border-gray-100 pb-6">
                                <h3 className="text-lg font-poppins font-semibold text-gray-800 mb-4">
                                    Personal Information
                                </h3>
                                
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    <div className="md:col-span-2">
                                        <label className="block text-sm font-poppins font-medium text-gray-700 mb-2">
                                            Name
                                        </label>
                                        <input
                                            type="text"
                                            value={registerData.name}
                                            onChange={(e) => handleInputChange("name", e.target.value)}
                                            placeholder="Your name"
                                            className="w-full bg-[#f7f7f7] border-0 rounded-lg px-4 py-3 text-gray-900 shadow-sm focus:outline-none focus:border focus:border-[#7B4B3A] focus:ring-1 focus:ring-[#7B4B3A] transition-colors"
                                            disabled={isLoading}
                                        />
                                    </div>
                                    
                                    <div className="md:col-span-2">
                                        <label className="block text-sm font-poppins font-medium text-gray-700 mb-2">
                                            Email
                                        </label>
                                        <input
                                            type="email"
                                            value={registerData.email}
                                            onChange={(e) => handleInputChange("email", e.target.value)}
                                            placeholder="your.email@example.com"
                                            className="w-full bg-[#f7f7f7] border-0 rounded-lg px-4 py-3 text-gray-900 shadow-sm focus:outline-none focus:border focus:border-[#7B4B3A] focus:ring-1 focus:ring-[#7B4B3A] transition-colors"
                                            disabled={isLoading}
                                        />
                                    </div>
                                    
                                    <div className="md:col-span-2">
                                        <label className="block text-sm font-poppins font-medium text-gray-700 mb-2">
                                            Password
                                        </label>
                                        <input
                                            type="password"
                                            value={registerData.password}
                                            onChange={(e) => handleInputChange("password", e.target.value)}
                                            placeholder="Mininum 6 symbols"
                                            className="w-full bg-[#f7f7f7] border-0 rounded-lg px-4 py-3 text-gray-900 shadow-sm focus:outline-none focus:border focus:border-[#7B4B3A] focus:ring-1 focus:ring-[#7B4B3A] transition-colors"
                                            disabled={isLoading}
                                        />
                                    </div>
                                </div>
                            </div>

                            <div className="border-b border-gray-100 pb-6">
                                <h3 className="text-lg font-poppins font-semibold text-gray-800 mb-4">
                                    Physical Information
                                </h3>
                                
                                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                                    <div>
                                        <label className="block text-sm font-poppins font-medium text-gray-700 mb-2">
                                            Age (years)
                                        </label>
                                        <input
                                            type="number"
                                            value={registerData.age}
                                            onChange={(e) => handleInputChange("age", e.target.value)}
                                            placeholder="25"
                                            min="14"
                                            max="100"
                                            className="w-full bg-[#f7f7f7] border-0 rounded-lg px-4 py-3 text-gray-900 shadow-sm focus:outline-none focus:border focus:border-[#7B4B3A] focus:ring-1 focus:ring-[#7B4B3A] transition-colors"
                                            disabled={isLoading}
                                        />
                                    </div>
                                    
                                    <div>
                                        <label className="block text-sm font-poppins font-medium text-gray-700 mb-2">
                                            Weight (kg)
                                        </label>
                                        <input
                                            type="number"
                                            value={registerData.weight}
                                            onChange={(e) => handleInputChange("weight", e.target.value)}
                                            placeholder="75.5"
                                            min="30"
                                            max="300"
                                            step="0.1"
                                            className="w-full bg-[#f7f7f7] border-0 rounded-lg px-4 py-3 text-gray-900 shadow-sm focus:outline-none focus:border focus:border-[#7B4B3A] focus:ring-1 focus:ring-[#7B4B3A] transition-colors"
                                            disabled={isLoading}
                                        />
                                    </div>
                                    
                                    <div>
                                        <label className="block text-sm font-poppins font-medium text-gray-700 mb-2">
                                            Height (cm)
                                        </label>
                                        <input
                                            type="number"
                                            value={registerData.height}
                                            onChange={(e) => handleInputChange("height", e.target.value)}
                                            placeholder="180"
                                            min="100"
                                            max="250"
                                            className="w-full bg-[#f7f7f7] border-0 rounded-lg px-4 py-3 text-gray-900 shadow-sm focus:outline-none focus:border focus:border-[#7B4B3A] focus:ring-1 focus:ring-[#7B4B3A] transition-colors"
                                            disabled={isLoading}
                                        />
                                    </div>
                                </div>
                            </div>

                            <div className="pb-6">
                                <h3 className="text-lg font-poppins font-semibold text-gray-800 mb-4">
                                    Powerlifting PRs (kg)
                                </h3>
                                
                                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                                    <div>
                                        <label className="block text-sm font-poppins font-medium text-gray-700 mb-2">
                                            Bench press
                                        </label>
                                        <input
                                            type="number"
                                            value={registerData.benchPr}
                                            onChange={(e) => handleInputChange("benchPr", e.target.value)}
                                            placeholder="100"
                                            min="0"
                                            step="0.5"
                                            className="w-full bg-[#f7f7f7] border-0 rounded-lg px-4 py-3 text-gray-900 shadow-sm focus:outline-none focus:border focus:border-[#7B4B3A] focus:ring-1 focus:ring-[#7B4B3A] transition-colors"
                                            disabled={isLoading}
                                        />
                                    </div>
                                    
                                    <div>
                                        <label className="block text-sm font-poppins font-medium text-gray-700 mb-2">
                                            Squat
                                        </label>
                                        <input
                                            type="number"
                                            value={registerData.squatPr}
                                            onChange={(e) => handleInputChange("squatPr", e.target.value)}
                                            placeholder="140"
                                            min="0"
                                            step="0.5"
                                            className="w-full bg-[#f7f7f7] border-0 rounded-lg px-4 py-3 text-gray-900 shadow-sm focus:outline-none focus:border focus:border-[#7B4B3A] focus:ring-1 focus:ring-[#7B4B3A] transition-colors"
                                            disabled={isLoading}
                                        />
                                    </div>
                                    
                                    <div>
                                        <label className="block text-sm font-poppins font-medium text-gray-700 mb-2">
                                            Dead lift
                                        </label>
                                        <input
                                            type="number"
                                            value={registerData.deadliftPr}
                                            onChange={(e) => handleInputChange("deadliftPr", e.target.value)}
                                            placeholder="180"
                                            min="0"
                                            step="0.5"
                                            className="w-full bg-[#f7f7f7] border-0 rounded-lg px-4 py-3 text-gray-900 shadow-sm focus:outline-none focus:border focus:border-[#7B4B3A] focus:ring-1 focus:ring-[#7B4B3A] transition-colors"
                                            disabled={isLoading}
                                        />
                                    </div>
                                </div>
                            </div>

                            <button
                                type="submit"
                                disabled={isLoading}
                                className="w-full bg-[#7B4B3A] hover:bg-[#6a4133] hover:cursor-pointer disabled:bg-gray-300 text-white font-poppins font-semibold py-3 px-4 rounded-lg transition-colors duration-200 shadow-sm"
                            >
                                {isLoading ? (
                                    <span className="flex items-center justify-center">
                                        <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></div>
                                        Registration...
                                    </span>
                                ) : (
                                    "Register"
                                )}
                            </button>

                            <div className="text-center pt-4 border-t border-gray-100">
                                <p className="text-gray-600 text-sm">
                                    Already have an account?{" "}
                                    <Link 
                                        to="/login"
                                        className="text-[#7B4B3A] hover:text-[#6a4133] font-medium"
                                    >
                                        Login
                                    </Link>
                                </p>
                            </div>

                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
} 