import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

interface LoginData {
    email: string;
    password: string;
}

export default function Login() {
    const [loginData, setLoginData] = useState<LoginData>({
        email: "",
        password: ""
    });

    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState("");

    const navigate = useNavigate();

    const handleInputChange = (field: keyof LoginData, value: string) => {
        setLoginData(prev => ({
            ...prev,
            [field]: value
        }));
        if (error) setError("");
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        if (!loginData.email || !loginData.password) {
            setError("Please fill all the fields");
            return;
        }

        if (!loginData.email.includes("@")) {
            setError("Please enter a valid email address");
            return;
        }

        setIsLoading(true);
        setError("");

        try {
            const formData = new URLSearchParams();
            formData.append('email', loginData.email.trim());
            formData.append('password', loginData.password);

            const response = await fetch('/api/users/login', {
                method: 'POST',
                headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
                body: formData
            });
            
            const responseData = await response.json();
            
            if (!response.ok) {
                const errorMessage = responseData.error || 'Login problem';
                throw new Error(errorMessage);
            }

            localStorage.setItem('currentUser', JSON.stringify(responseData));

            navigate('/profile', { state: { userData: responseData } });
            
        } catch (err) {
            setError("Login error. Check your data and try again");
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="flex-1 bg-[#eeeeee] border-t-12 border-[#D0D0D0]">
            <div className="relative rounded-xl mt-8 lg:mx-8 bg-white p-4 lg:p-8 text-gray-800">

                <div className="text-center mb-8">
                    <h1 className="text-3xl font-poppins font-semibold text-gray-800 mb-2">
                        Log in to the System
                    </h1>
                    <p className="text-gray-600">
                        Enter your data to log in to your personal account
                    </p>
                </div>

                <div className="max-w-md mx-auto">
                    <div className="bg-white rounded-xl border border-gray-100 p-6 lg:p-8 shadow-sm">
                        {error && (
                            <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg">
                                <p className="text-red-600 text-sm">{error}</p>
                            </div>
                        )}

                        <form onSubmit={handleSubmit} className="space-y-6">
                            <div>
                                <label className="block text-sm font-poppins font-medium text-gray-700 mb-2">
                                    Email
                                </label>
                                <input
                                    type="email"
                                    value={loginData.email}
                                    onChange={(e) => handleInputChange("email", e.target.value)}
                                    placeholder="your.email@example.com"
                                    className="w-full bg-[#f7f7f7] border-0 rounded-lg px-4 py-3 text-gray-900 shadow-sm focus:outline-none focus:border focus:border-[#7B4B3A] focus:ring-1 focus:ring-[#7B4B3A] transition-colors"
                                    disabled={isLoading}
                                />
                            </div>

                            <div>
                                <label className="block text-sm font-poppins font-medium text-gray-700 mb-2">
                                    Password
                                </label>
                                <input
                                    type="password"
                                    value={loginData.password}
                                    onChange={(e) => handleInputChange("password", e.target.value)}
                                    placeholder="Enter your password"
                                    className="w-full bg-[#f7f7f7] border-0 rounded-lg px-4 py-3 text-gray-900 shadow-sm focus:outline-none focus:border focus:border-[#7B4B3A] focus:ring-1 focus:ring-[#7B4B3A] transition-colors"
                                    disabled={isLoading}
                                />
                            </div>

                            <button
                                type="submit"
                                disabled={isLoading}
                                className="w-full bg-[#7B4B3A] hover:bg-[#6a4133] hover:cursor-pointer disabled:bg-gray-300 text-white font-poppins font-semibold py-3 px-4 rounded-lg transition-colors duration-200 shadow-sm"
                            >
                                {isLoading ? (
                                    <span className="flex items-center justify-center">
                                        <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></div>
                                        Entering...
                                    </span>
                                ) : (
                                    "Enter"
                                )}
                            </button>

                            <div className="text-center pt-4 border-t border-gray-100">
                                <p className="text-gray-600 text-sm">
                                    Don't have an account yet?{" "}
                                    <Link 
                                        to="/register"
                                        className="text-[#7B4B3A] hover:text-[#6a4133] font-medium"
                                    >
                                        Register
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