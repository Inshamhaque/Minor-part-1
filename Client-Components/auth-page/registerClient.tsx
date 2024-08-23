'use client'
import { registerinputs, registerSchema } from "@/zodfile/schema";
import { useState } from "react";

export const Register = () => {
  const [credentials, setCredentials] = useState<registerinputs>({
    mail: '',
    password: ''
  });

  const [errors, setErrors] = useState<{ mail?: string, password?: string }>({});

  const handleClick = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const result = registerSchema.safeParse(credentials);
    
    if (!result.success) {
      const formattedErrors = result.error.format();
      setErrors({
        mail: formattedErrors.mail?._errors[0] || '',
        password: formattedErrors.password?._errors[0] || '',
      });
    } else {
      // If form submission is successful, clear the errors
      setErrors({});
      console.log("Form Submitted Successfully", credentials);
    }
  };

  return (
    <div>
      <section className="bg-slate-200 font-sans">
        <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
          <div className="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:border-gray-700">
            <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
              <h1 className="flex border-b border-slate-700 p-2 justify-center text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl">
                Create an account
              </h1>
              <form className="space-y-4 md:space-y-6" onSubmit={handleClick}>
                <div>
                  <label
                    htmlFor="email"
                    className="block mb-2 text-sm font-medium text-gray-900"
                  >
                    Institutional Mail
                  </label>
                  <input
                    type="email"
                    name="email"
                    id="email"
                    className="bg-gray-100 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5"
                    placeholder="name@zhcet.ac.in"
                    value={credentials.mail}
                    required
                    onChange={(e) => {
                      setCredentials({
                        ...credentials,
                        mail: e.target.value
                      });
                      setErrors({})
                    }}
                  />
                  {errors.mail && <div className="text-sm text-red-600">{errors.mail}</div>}
                </div>
                <div>
                  <label
                    htmlFor="password"
                    className="block mb-2 text-sm font-medium text-gray-900"
                  >
                    Password
                  </label>
                  <input
                    type="password"
                    name="password"
                    id="password"
                    placeholder="••••••••"
                    className="bg-gray-100 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5"
                    value={credentials.password}
                    required
                    onChange={(e) => {
                      setCredentials({
                        ...credentials,
                        password: e.target.value
                      });
                      setErrors({})
                    }}
                  />
                  {errors.password && <div className="text-sm text-red-600">{errors.password}</div>}
                </div>
                <div>
                  <label
                    htmlFor="confirm-password"
                    className="block mb-2 text-sm font-medium text-gray-900"
                  >
                    Confirm password
                  </label>
                  <input
                    type="password"
                    name="confirm-password"
                    id="confirm-password"
                    placeholder="••••••••"
                    className="bg-gray-100 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5"
                    required
                  />
                </div>
                <button
                  type="submit"
                  className="w-full text-white bg-primary-600 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center bg-[#2563eb] dark:hover:bg-primary-700 dark:focus:ring-primary-800"
                >
                  Create an account
                </button>
                <p className="text-sm font-light text-gray-700">
                  Already have an account?{" "}
                  <a
                    href="/auth/login"
                    className="font-medium text-primary-600 hover:underline dark:text-primary-500"
                  >
                    Login here
                  </a>
                </p>
              </form>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};
