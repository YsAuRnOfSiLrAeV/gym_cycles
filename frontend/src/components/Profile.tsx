import { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";

export default function Profile() {
    const location = useLocation();
    const userData = location.state?.userData;
    const navigate = useNavigate();

    const [profile, setProfile] = useState({
        name: "",
        email: "",
        age: "",
        height: "",
        weight: "",
        bench: "",
        deadlift: "",
        squat: "",
        role: "",
        about: ""
    });

    const [initialProfile, setInitialProfile] = useState({
        age: "",
        height: "",
        weight: "",
        bench: "",
        deadlift: "",
        squat: ""
    });

    const [isSaving, setIsSaving] = useState(false);
    const [saveMessage, setSaveMessage] = useState("");

    const [userId, setUserId] = useState<number | null>(null);

    useEffect(() => {
        let userDataToUse = userData;

        if (!userDataToUse) {
            const savedUser = localStorage.getItem('currentUser');
            if (savedUser) {
                userDataToUse = JSON.parse(savedUser);
            }
        }
        
        if (userDataToUse) {
            const profileData = {
                name: userDataToUse.name || "",
                email: userDataToUse.email || "",
                age: userDataToUse.age ? String(userDataToUse.age) : "",
                height: userDataToUse.height ? String(userDataToUse.height) : "",
                weight: userDataToUse.weight ? String(userDataToUse.weight) : "",
                bench: userDataToUse.benchPr ? String(userDataToUse.benchPr) : "",
                deadlift: userDataToUse.deadliftPr ? String(userDataToUse.deadliftPr) : "",
                squat: userDataToUse.squatPr ? String(userDataToUse.squatPr) : "",
                role: userDataToUse.activityLevel || "",
                about: ""
            };
            
            setProfile(profileData);

            setInitialProfile({
                age: profileData.age,
                height: profileData.height,
                weight: profileData.weight,
                bench: profileData.bench,
                deadlift: profileData.deadlift,
                squat: profileData.squat
            });

            setUserId(userDataToUse.id);
        }
    }, [userData]);

    const validateFields = () => {
        const fieldsToCheck = ['age', 'height', 'weight', 'bench', 'deadlift', 'squat'];
        
        for (const field of fieldsToCheck) {
            const value = profile[field as keyof typeof profile];
            if (!value || value.toString().trim() === "") {
                return `Field "${getFieldLabel(field)}" cannot be empty`;
            }

            const numValue = Number(value);
            if (isNaN(numValue) || numValue < 0) {
                return `Field "${getFieldLabel(field)}" should contain a positive number`;
            }
        }
        
        return null;
    };

    const getFieldLabel = (field: string) => {
        const labels: { [key: string]: string } = {
            age: "Age",
            height: "Height",
            weight: "Weight",
            bench: "Bench press PR",
            deadlift: "Deadlift PR",
            squat: "Squat PR"
        };
        return labels[field] || field;
    };

    const hasDataChanged = () => {
        const currentData = {
            age: profile.age,
            height: profile.height,
            weight: profile.weight,
            bench: profile.bench,
            deadlift: profile.deadlift,
            squat: profile.squat
        };
        
        return Object.keys(currentData).some(
            key => currentData[key as keyof typeof currentData] !== initialProfile[key as keyof typeof initialProfile]
        );
    };

    const handleSave = async () => {
        setSaveMessage("");

        const validationError = validateFields();
        if (validationError) {
            setSaveMessage(validationError);
            return;
        }

        if (!hasDataChanged()) {
            setSaveMessage("No changes detected, no need to save");
            return;
        }

        if (!userId) {
            setSaveMessage("Error: user ID is not found");
            return;
        }
        
        setIsSaving(true);
        
        try {
            const updateData = {
                age: Number(profile.age),
                weight: Number(profile.weight),
                height: Number(profile.height),
                benchPr: Number(profile.bench),
                squatPr: Number(profile.squat),
                deadliftPr: Number(profile.deadlift)
            };

            const response = await fetch(`/api/users/${userId}`, {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(updateData)
            });
            
            const responseData = await response.json();
            
            if (!response.ok) {
                const errorMessage = responseData.error || 'Profile update error';
                throw new Error(errorMessage);
            }

            const currentUser = JSON.parse(localStorage.getItem('currentUser') || '{}');
            const updatedUser = {
                ...currentUser,
                age: responseData.age,
                weight: responseData.weight,
                height: responseData.height,
                benchPr: responseData.benchPr,
                squatPr: responseData.squatPr,
                deadliftPr: responseData.deadliftPr
            };
            localStorage.setItem('currentUser', JSON.stringify(updatedUser));

            setInitialProfile({
                age: profile.age,
                height: profile.height,
                weight: profile.weight,
                bench: profile.bench,
                deadlift: profile.deadlift,
                squat: profile.squat
            });
            
            setSaveMessage("Profile updated successfully!");
            
        } catch (error) {
            console.error('Save error:', error);
            setSaveMessage(error instanceof Error ? error.message : "Profile saving error");
        } finally {
            setIsSaving(false);
        }
    };

    const handleLogout = () => {
        localStorage.removeItem('currentUser');
        navigate('/login');
    };

    return (
        <div className="flex-1 bg-[#eeeeee] border-t-12 border-[#D0D0D0]">
            <div className="relative rounded-xl mt-8 lg:mx-8 bg-white p-4 lg:p-8 text-gray-800 text-[17px] leading-relaxed">
                <div className="w-full">
                    <div className="flex flex-row items-center gap-4 mb-6 lg:hidden">
                        <img
                            src="proficon.png"
                            alt="Profile photo"
                            className="w-28 h-28 object-cover rounded-full shadow"
                        />
                        <div className="flex flex-col justify-center">
                            <h1 className="text-2xl font-poppins font-semibold">{profile.name}</h1>
                            <div className="text-lg text-gray-500 mt-1">{profile.role}</div>
                        </div>
                    </div>
                    <div className="hidden lg:flex flex-row items-center gap-6 mb-8">
                        <img
                            src="proficon.png"
                            alt="Profile photo"
                            className="w-[200px] h-[200px] object-cover rounded-full shadow"
                        />
                        <div className="flex flex-col justify-center">
                            <h1 className="text-4xl font-poppins font-semibold">{profile.name}</h1>
                            <div className="text-xl text-gray-500 mt-2">{profile.role}</div>
                        </div>
                    </div>
                </div>
                <div className="w-full bg-white rounded-xl border border-gray-100 p-4 sm:p-8">
                    <div className="flex flex-col lg:flex-row justify-between mb-2 lg:mb-6">
                        <h2 className="text-xl font-poppins font-semibold mb-4 text-gray-800">Account</h2>
                        <div className="hidden lg:flex items-center gap-4">
                            <button 
                                onClick={handleSave}
                                disabled={isSaving}
                                className="w-fit bg-[#7B4B3A] text-white font-poppins px-5 py-1 rounded hover:bg-[#6a4133] hover:cursor-pointer disabled:bg-gray-400 disabled:cursor-not-allowed"
                            >
                                {isSaving ? "Saving..." : "Save"}
                            </button>
                            <button 
                                onClick={handleLogout}
                                className="w-fit bg-red-700 text-white font-poppins px-5 py-1 rounded hover:bg-red-600 hover:cursor-pointer"
                            >
                                Logout
                            </button>
                        </div>
                    </div>

                    {saveMessage && (
                        <div className={`mb-4 p-3 rounded ${saveMessage.includes('successful') ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'}`}>
                            {saveMessage}
                        </div>
                    )}
                    
                    <form className="md:grid md:grid-cols-2 md:gap-x-8 md:gap-y-4 flex flex-col gap-4">
                        <div className="order-1">
                            <ProfileInput label="Age" value={profile.age} onChange={v => setProfile(p => ({...p, age: v}))} />
                        </div>
                        <div className="order-4 md:order-2">
                            <ProfileInput label="Bench PR" value={profile.bench} onChange={v => setProfile(p => ({...p, bench: v}))} />
                        </div>
                        <div className="order-2 md:order-3">
                            <ProfileInput label="Height" value={profile.height} onChange={v => setProfile(p => ({...p, height: v}))} />
                        </div>
                        <div className="order-5 md:order-4">
                            <ProfileInput label="Deadlift PR" value={profile.deadlift} onChange={v => setProfile(p => ({...p, deadlift: v}))} />
                        </div>
                        <div className="order-3 md:order-5">
                            <ProfileInput label="Weight" value={profile.weight} onChange={v => setProfile(p => ({...p, weight: v}))} />
                        </div>
                        <div className="order-6">
                            <ProfileInput label="Squat PR" value={profile.squat} onChange={v => setProfile(p => ({...p, squat: v}))} />
                        </div>
                        <div className="order-7 lg:hidden mt-4 space-y-3">
                            <button 
                                type="button"
                                onClick={handleSave}
                                disabled={isSaving}
                                className="w-full bg-[#7B4B3A] text-white font-poppins px-5 py-2.5 rounded disabled:bg-gray-400 disabled:cursor-not-allowed"
                            >
                                {isSaving ? "Saving..." : "Save"}
                            </button>
                            <button 
                                type="button"
                                onClick={handleLogout}
                                className="w-full bg-red-700 text-white font-poppins px-5 py-2.5 rounded hover:bg-red-600 hover:cursor-pointer"
                            >
                                Logout
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
}

function ProfileInput({ label, value, onChange }: { label: string; value: string | number; onChange: (v: string) => void }) {
    return (
        <div className="flex flex-col md:flex-row md:items-center gap-1 md:gap-4">
            <label className="w-32 text-sm text-gray-600 font-medium mb-1 md:mb-0 md:text-right">{label}</label>
            <input
                type="text"
                value={value}
                onChange={e => onChange(e.target.value)}
                className="flex-1 bg-[#f7f7f7] border-0 rounded px-4 py-2 text-gray-900 shadow-sm focus:outline-none focus:border focus:border-[#7B4B3A] focus:ring-1 focus:ring-[#7B4B3A] transition-colors"
            />
        </div>
    );
}