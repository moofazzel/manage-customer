import LoginForm from "./_components/loginForm";

const Login = () => {
  return (
    <div className="flex flex-col justify-center flex-1 min-h-full px-6 py-12 lg:px-8  bg-white">
      <div className="sm:mx-auto sm:w-full sm:max-w-sm">
        <h2 className="mt-6 text-2xl font-bold leading-9 tracking-tight text-center text-black">
          Sign in to your account
        </h2>
      </div>

      <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
        <LoginForm />
      </div>
    </div>
  );
};

export default Login;

//  {
//    errorMessage && (
//      <>
//        {/* <ExclamationCircleIcon className="w-5 h-5 text-red-500" /> */}
//        <p className="text-sm text-red-500">{errorMessage}</p>
//      </>
//    );
//  }
