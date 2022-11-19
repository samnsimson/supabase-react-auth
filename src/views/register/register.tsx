import { Alert, Chip, Divider } from "@mui/material";
import { ChangeEvent, useState } from "react";
import { Link } from "react-router-dom";
import "../../App.css";
import { CustomButton, CustomInput } from "../../component/ui";
import { useAuth } from "../../hooks";

const initialFormData = {
    firstname: "",
    lastname: "",
    email: "",
    password: "",
    phone: "",
};

export const RegisterPage = () => {
    const { signUp } = useAuth();
    const [error, setError] = useState<string | null>(null);
    const [loading, setLoading] = useState<boolean>(false);
    const [formData, setFormData] = useState(initialFormData);

    const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
        const { name, value } = event.target;
        setFormData((state) => ({ ...state, [name]: value }));
    };

    const handleSubmit = async () => {
        try {
            setLoading(true);
            await signUp(formData);
            setError(null);
        } catch (error: any) {
            setError(error.message);
        } finally {
            setLoading(false);
            setFormData(initialFormData);
        }
    };

    return (
        <div className="bg-slate-100 h-[100vh] w-full flex flex-row items-center justify-center">
            <div className="basis-1/3 shadow-xl bg-white rounded p-6 space-y-6">
                <div className="flex flex-col items-center">
                    <h4 className="text-xl font-bold text-gray-700">Sign up</h4>
                </div>
                {error && <Alert severity="error">{error}</Alert>}
                <CustomInput
                    value={formData.firstname}
                    name="firstname"
                    placeholder="First Name"
                    className="w-full"
                    onChange={handleChange}
                />
                <CustomInput
                    value={formData.lastname}
                    name="lastname"
                    placeholder="Last Name"
                    className="w-full"
                    onChange={handleChange}
                />
                <CustomInput
                    value={formData.phone}
                    name="phone"
                    placeholder="Phone"
                    className="w-full"
                    onChange={handleChange}
                />
                <CustomInput
                    value={formData.email}
                    className="w-full"
                    name="email"
                    placeholder="Email"
                    onChange={handleChange}
                />
                <CustomInput
                    value={formData.password}
                    type="password"
                    className="w-full"
                    name="password"
                    placeholder="Password"
                    onChange={handleChange}
                />
                <CustomButton fullWidth onClick={handleSubmit} disabled={loading}>
                    {loading ? "Loading..." : "Sign up"}
                </CustomButton>
                <Divider>
                    <Chip label="Have an account?" />
                </Divider>
                <div>
                    <Link to={"/"}>
                        <CustomButton variant="text" size="large" fullWidth>
                            Login
                        </CustomButton>
                    </Link>
                </div>
            </div>
        </div>
    );
};
