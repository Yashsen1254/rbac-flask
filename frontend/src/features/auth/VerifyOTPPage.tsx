import { useEffect, useRef, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { toast } from "sonner";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";

import { useVerifyOTP } from "./hooks/mutations/useLogin";
import { useResendOTP } from "./hooks/mutations/useLogin";

const VerifyOTPPage = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const email = location.state?.Email;

  const verifyMutation = useVerifyOTP();
  const resendMutation = useResendOTP();

  const [timeLeft, setTimeLeft] = useState(60);

  const inputRefs = useRef<(HTMLInputElement | null)[]>([]);
  const otp = useRef<string[]>(["", "", "", "", "", ""]);

  useEffect(() => {
    if (!email) {
      navigate("/register");
    }
  }, [email, navigate]);

  useEffect(() => {
    if (timeLeft === 0) return;

    const timer = setInterval(() => {
      setTimeLeft((prev) => prev - 1);
    }, 1000);

    return () => clearInterval(timer);
  }, [timeLeft]);

  const handleChange = (index: number, value: string) => {
    value = value.replace(/\D/g, "");

    if (!value) {
      otp.current[index] = "";
      return;
    }

    otp.current[index] = value[0];

    if (inputRefs.current[index]) {
      inputRefs.current[index]!.value = value[0];
    }

    if (index < 5) {
      inputRefs.current[index + 1]?.focus();
    }
  };

  const handleKeyDown = (
    index: number,
    e: React.KeyboardEvent<HTMLInputElement>,
  ) => {
    if (e.key === "Backspace") {
      if (otp.current[index]) {
        otp.current[index] = "";
        return;
      }

      if (index > 0) {
        inputRefs.current[index - 1]?.focus();
      }
    }
  };

  const handlePaste = (e: React.ClipboardEvent<HTMLInputElement>) => {
    e.preventDefault();

    const pasted = e.clipboardData
      .getData("text")
      .replace(/\D/g, "")
      .slice(0, 6);

    pasted.split("").forEach((digit, index) => {
      otp.current[index] = digit;

      if (inputRefs.current[index]) {
        inputRefs.current[index]!.value = digit;
      }
    });

    inputRefs.current[Math.min(pasted.length, 5)]?.focus();
  };

  const handleVerify = () => {
    const otpValue = otp.current.join("");

    if (otpValue.length !== 6) {
      toast.error("Please enter the complete OTP.");
      return;
    }

    verifyMutation.mutate(
      {
        Email: email,
        OTP: otpValue,
      },
      {
        onSuccess: () => {
          toast.success("Email verified successfully.");
          navigate("/login");
        },
        onError: (error: any) => {
          toast.error(
            error?.response?.data?.message ?? "OTP verification failed.",
          );
        },
      },
    );
  };

  const handleResend = () => {
    resendMutation.mutate(
      {
        Email: email,
      },
      {
        onSuccess: (response) => {
          toast.success(response.message);

          setTimeLeft(60);

          otp.current = ["", "", "", "", "", ""];

          inputRefs.current.forEach((input) => {
            if (input) input.value = "";
          });

          inputRefs.current[0]?.focus();
        },
        onError: (error: any) => {
          toast.error(
            error?.response?.data?.message ?? "Failed to resend OTP.",
          );
        },
      },
    );
  };

  return (
    <div className="flex items-center justify-center h-screen">
      <Card className="w-[450px]">
        <CardHeader>
          <CardTitle>Verify Email</CardTitle>

          <CardDescription>
            Enter the OTP sent to
            <br />
            <span className="font-semibold">{email}</span>
          </CardDescription>
        </CardHeader>

        <CardContent className="space-y-6">
          <div className="flex justify-between">
            {Array.from({ length: 6 }).map((_, index) => (
              <Input
                key={index}
                ref={(element) => {
                  inputRefs.current[index] = element;
                }}
                maxLength={1}
                className="w-12 h-12 text-center text-lg"
                onChange={(e) => handleChange(index, e.target.value)}
                onKeyDown={(e) => handleKeyDown(index, e)}
                onPaste={handlePaste}
              />
            ))}
          </div>

          <Button
            className="w-full"
            onClick={handleVerify}
            disabled={verifyMutation.isPending}
          >
            {verifyMutation.isPending ? "Verifying..." : "Verify OTP"}
          </Button>

          <div className="text-center space-y-2">
            <p className="text-sm text-muted-foreground">OTP expires in</p>

            <p className="font-semibold text-lg">{timeLeft}s</p>

            <Button
              variant="link"
              onClick={handleResend}
              disabled={timeLeft > 0 || resendMutation.isPending}
            >
              {resendMutation.isPending ? "Sending..." : "Resend OTP"}
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default VerifyOTPPage;
