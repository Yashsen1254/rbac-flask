import { Link, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

import { useRegister } from "./hooks/mutations/useLogin";

type RegisterForm = {
  Name: string;
  Email: string;
  Password: string;
};

const RegisterPage = () => {
  const navigate = useNavigate();

  const registerMutation = useRegister();

  const { register, handleSubmit } = useForm<RegisterForm>();

  const onSubmit = (data: RegisterForm) => {
    registerMutation.mutate(data, {
      onSuccess: (response) => {
        navigate("/verify-otp", {
          state: {
            Email: response.Email,
          },
        });
      },
    });
  };

  return (
    <div className="relative flex items-center justify-center h-screen">
      <Card className="w-[420px]">
        <CardHeader>
          <CardTitle>Create Account</CardTitle>
        </CardHeader>

        <CardContent>
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            <Input placeholder="Full Name" {...register("Name")} />

            <Input placeholder="Email" {...register("Email")} />

            <Input
              type="password"
              placeholder="Password"
              {...register("Password")}
            />

            <Button
              type="submit"
              className="w-full"
              disabled={registerMutation.isPending}
            >
              {registerMutation.isPending
                ? "Creating Account..."
                : "Create Account"}
            </Button>

            <p className="text-sm text-center text-muted-foreground">
              Already have an account?{" "}
              <Link to="/login" className="font-medium underline">
                Login
              </Link>
            </p>
          </form>
        </CardContent>
      </Card>
    </div>
  );
};

export default RegisterPage;
