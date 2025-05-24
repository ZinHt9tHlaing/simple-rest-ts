import * as z from "zod";
import { loginSchema } from "../schemas//login";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm, type SubmitHandler } from "react-hook-form";

type IFormInput = z.infer<typeof loginSchema>;

const Login = () => {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<IFormInput>({
    resolver: zodResolver(loginSchema),
  });

  const submitHandler: SubmitHandler<IFormInput> = (data) => {
    console.log("data", data);
  };

  return (
    <div className="max-w-2xs md:max-w-sm mx-auto mt-20">
      <h2 className="text-2xl text-center font-semibold mb-2">Login</h2>
      <form
        className="flex flex-col space-y-2"
        onSubmit={handleSubmit(submitHandler)}
      >
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
          disabled={isSubmitting}
          className="text-white disabled:cursor-not-allowed bg-black cursor-pointer py-1 px-2 rounded border-2 border-black active:scale-90 duration-200"
        >
          Login
        </button>
      </form>
    </div>
  );
};

export default Login;
