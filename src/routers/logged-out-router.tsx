import React from "react";
import { useForm } from "react-hook-form";
import { isLoggedInVar } from "../apollo";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { CreateAccount } from "../pages/create-account";
import { Login } from "../pages/login";
import { NotFound } from "../pages/404";

// router 구현을 위해 삭제함. 
// interface IForm {
//   email : string ;
//   password : string ;
// }

export const LoggedOutRouter = () => {
  
  // * 기능
  // react hook form
  // const {
  //   register,
  //   watch,
  //   handleSubmit,
  //   formState: { errors },
  // } = useForm<IForm>();

  // const onSubmit = () => {
  //   console.log(watch());
  // };

  // const onInvalid = () => {
  //   console.log("cant create account");
  // };

  // console.log("invaild error :", errors);

  // * 화면출력
  return (
    // <div>
    //   <h1>Logged Out</h1>
    //   <form onSubmit={handleSubmit(onSubmit, onInvalid)}>
    //     <div>
    //       <input
    //         {...register("email", {
    //           required: "this is required",
    //           pattern: /^[A-Za-z0-9._%+-]+@gmail.com$/,
    //         })}
    //         name="email"
    //         type="email"
    //         placeholder="email"
    //       />
    //       {errors.email?.message && (
    //         <span className="font-bold text-red-600">
    //           {errors.email?.message}
    //         </span>
    //       )}
    //       {errors.email?.type === "pattern" && (
    //         <span className="font-bold text-red-600">Only gmail allowed</span>
    //       )}
    //     </div>
    //     <div>
    //       <input
    //         {...register("password", { required: true })}
    //         name="password"
    //         type="password"
    //         required
    //         placeholder="password"
    //       />
    //     </div>
    //     <button className="bg-yellow-300 text-white">Submit</button>
    //   </form>
    // </div>

    <Router>
      <Switch>
        <Route path="/create-account">
          <CreateAccount />
        </Route>
        <Route path="/" exact>
          <Login />
        </Route>
        <Route>
          <NotFound />
        </Route>
      </Switch>
    </Router>
  );
};
