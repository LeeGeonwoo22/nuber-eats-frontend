import { ApolloError, gql, useMutation } from "@apollo/client";
import React from "react";

import { useForm } from "react-hook-form";
import nuberLogo from "../images/logo.svg"
import { FormError } from "../components/form-error";
import { Link, useHistory } from "react-router-dom";
import { Button } from "../components/button";
import { CreateAccountMutation, CreateAccountMutationVariables, UserRole } from "../__generated__/graphql";
import { Helmet } from "react-helmet-async";

const CREATE_ACCOUNT_MUTATION = gql`
  mutation createAccount($createAccountInput: CreateAccountInput!) {
    createAccount(input: $createAccountInput) {
      ok
      error
    }
  }
`;

interface ICreateAccountForm {
  email: string;
  password: string;
  role: UserRole;
}

export const CreateAccount = () => {
  const {
    register,
    getValues,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm<ICreateAccountForm>({
    mode: "onChange",
    defaultValues: {
      role: UserRole.Client,
    },
  });
   const [CreateAccountMutation] = useMutation<
   CreateAccountMutation,
   CreateAccountMutationVariables
   >(CREATE_ACCOUNT_MUTATION);
   const history = useHistory();
    const onError = (error: ApolloError) => {
      console.log("error :", error);
    };
   const onCompleted = (data: CreateAccountMutation) => {
     const {
       createAccount: { ok },
     } = data;
     if (ok) {
      alert("Account Created! Log in now")
      //  history.push("/login");
      history.push("/")
     }
   };
   
   const [
     createAccountMutation,
     { loading, data: createAccountMutationResult },
   ] = useMutation<CreateAccountMutation, CreateAccountMutationVariables>(
     CREATE_ACCOUNT_MUTATION,
     {
       onCompleted,
       onError
     }
   );
   const onSubmit = () => {
     if (!loading) {
       const { email, password, role } = getValues();
       createAccountMutation({
         variables: {
           createAccountInput: { email, password, role },
         },
       });
     }
   };
  
   return (
     <div className="h-screen flex items-center flex-col mt-10 lg:mt-28">
       <Helmet>
         <title>Create Account | Nuber Eats</title>
       </Helmet>

       <div className="w-full max-w-screen-sm flex flex-col px-5 items-center">
         <img src={nuberLogo} className="w-52 mb-10" alt="Nuber Eats" />
         <h4 className="w-full font-medium text-left text-3xl mb-5">
           Let's get started
         </h4>
         <form
           onSubmit={handleSubmit(onSubmit)}
           className="grid gap-3 mt-5 w-full mb-5"
         >
           <input
             {...register("email", {
               required: "Email is required",
               pattern:
                 /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
             })}
             name="email"
             required
             type="email"
             placeholder="Email"
             className="input"
           />
           {errors.email?.message && (
             <FormError errorMessage={errors.email?.message} />
           )}
           {errors.email?.type === "pattern" && (
             <FormError errorMessage={"Please enter a valid email"} />
           )}
           <input
             {...register("password", { required: "Password is required" })}
             required
             name="password"
             type="password"
             placeholder="Password"
             className="input"
           />
           {errors.password?.message && (
             <FormError errorMessage={errors.password?.message} />
           )}
           {errors.password?.type === "minLength" && (
             <FormError errorMessage="Password must be more than 10 chars." />
           )}
           <select
             // name="role"
             {...register("role", { required: true })}
             className="input"
           >
             {Object.keys(UserRole).map((role, index) => (
               <option key={index}>{role}</option>
             ))}
           </select>
           <Button
             canClick={isValid}
             loading={false}
             actionText={"Create Account"}
           />
         </form>
         <div>
           Already have an account?{" "}
           {/* <Link to="/login" className="text-lime-600 hover:underline"> */}
           <Link to="/" className="text-lime-600 hover:underline">
             Log in now
           </Link>
         </div>
       </div>
     </div>
   );
};
