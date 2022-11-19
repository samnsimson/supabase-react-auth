import { Alert, Card, Chip, Divider } from "@mui/material";
import { ChangeEvent, useState } from "react";
import { Link } from "react-router-dom";
import "../../App.css";
import { CustomButton, CustomInput } from "../../component/ui";
import { useAuth } from "../../hooks";

const initialFormData = {
    email: "",
    password: "",
};

export const LoginPage = () => {
    const { signIn } = useAuth();
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
            await signIn(formData);
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
            <Card className="basis-1/3 shadow-xl rounded p-6 space-y-6">
                <div className="flex flex-col items-center">
                    <h4 className="text-xl font-bold text-gray-700">Login</h4>
                </div>
                {error && <Alert severity="error">{error}</Alert>}
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
                <CustomButton fullWidth size="large" color="primary" onClick={handleSubmit} disabled={loading}>
                    {loading ? "Loading..." : "Login"}
                </CustomButton>
                <Divider>
                    <Chip label="Don't have an account?" />
                </Divider>
                <div>
                    <Link to={"/register"}>
                        <CustomButton variant="text" size="large" fullWidth>
                            Register
                        </CustomButton>
                    </Link>
                </div>
            </Card>
        </div>
    );
};
