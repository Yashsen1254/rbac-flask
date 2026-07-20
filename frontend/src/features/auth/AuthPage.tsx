import { useForm } from "react-hook-form";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useLogin } from "./hooks/mutations/useLogin";

type LoginForm = {
  Email: string;
  Password: string;
};

const AuthPage = () => {
  const loginMutation = useLogin();
  const {
    register,
    handleSubmit,
  } = useForm<LoginForm>();
  const onSubmit = (data: LoginForm) => {
    loginMutation.mutate(data);
  };
  return (
    <div className="flex items-center justify-center h-screen">
      <Card className="w-[400px]">
        <CardHeader>
          <CardTitle>Login</CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            <Input placeholder="Email" {...register("Email")} />
            <Input
              type="password"
              placeholder="Password"
              {...register("Password")}
            />
            <Button className="w-full" disabled={loginMutation.isPending}>
              {loginMutation.isPending ? "Logging in..." : "Login"}
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
};
export default AuthPage;
