import { useForm, type SubmitHandler } from "react-hook-form";
import * as z from "zod";
import { registerSchema } from "../schemas/register";
import { zodResolver } from "@hookform/resolvers/zod";
import { useNavigate } from "react-router";
import { useRegisterMutation } from "../store/slices/endpoints/authApi";
import { toast } from "react-toastify";

type IFormInput = z.infer<typeof registerSchema>;

const Register = () => {
  const navigate = useNavigate();
  const [registerMutation, { isLoading }] = useRegisterMutation();

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
  } = useForm<IFormInput>({
    resolver: zodResolver(registerSchema),
  });

  const submitHandler: SubmitHandler<IFormInput> = async (data) => {
    try {
      await registerMutation(data).unwrap();
      reset();
      toast.success("Registration successful!");
      navigate("/login");
    } catch (error: any) {
      toast.error("Registration failed!", error);
    }
  };

  return (
    <div className="max-w-2xs md:max-w-sm mx-auto mt-20">
      <h2 className="text-2xl text-center font-semibold mb-2">Register</h2>
      <form
        className="flex flex-col space-y-4"
        onSubmit={handleSubmit(submitHandler)}
      >
        <div>
          <label
            htmlFor="username"
            className="block mb-1 text-sm font-medium text-slate-700"
          >
            Username
          </label>
          <input
            type="text"
            {...register("username")}
            id="username"
            placeholder="username"
            className="form"
          />
          {errors.username && (
            <span className="text-red-500 text-sm font-medium">
              {errors.username.message}
            </span>
          )}
        </div>
        <div>
          <label
            htmlFor="email"
            className="block mb-1 text-sm font-medium text-slate-700"
          >
            Email
          </label>
          <input
            type="email"
            {...register("email")}
            id="email"
            placeholder="example@gmail.com"
            className="form"
          />
          {errors.email && (
            <span className="text-red-500 text-sm font-medium">
              {errors.email.message}
            </span>
          )}
        </div>
        <div>
          <label
            htmlFor="password"
            className="block mb-1 text-sm font-medium text-slate-700"
          >
            Password
          </label>
          <input
            type="password"
            {...register("password")}
            id="password"
            placeholder="********"
            className="form"
          />
          {errors.password && (
            <span className="text-red-500 text-sm font-medium">
              {errors.password.message}
            </span>
          )}
        </div>
        <button
          type="submit"
          disabled={isSubmitting || isLoading}
          className="flex justify-center items-center gap-2 text-white disabled:cursor-not-allowed disabled:bg-gray-700 bg-black cursor-pointer py-1 px-2 rounded border-2 border-black active:scale-90 duration-200"
        >
          {isLoading && (
            <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
          )}
          Register
        </button>
      </form>
    </div>
  );
};

export default Register;
