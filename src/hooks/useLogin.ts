import { useState } from "react";
import { useAuth } from "./useAuthContext"
import { errorAlert } from "../components/ErrorAlert";

export const useLogin = () => {
    const { logIn } = useAuth();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [showPassword, setShowPassword] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [loading, setLoading] = useState(false);

    const handleLogin = async () => {
        try {
            setError(null);
            setLoading(true);
            await logIn(email, password);
        } catch (error: any) {
            setError(error.message)
            errorAlert({ title: "Login failed", message:"Please check your login credentials"});
        } finally {
            setLoading(false);
        }
    };

    return{ email, setEmail, password, setPassword, showPassword, setShowPassword, error, loading, handleLogin}
}