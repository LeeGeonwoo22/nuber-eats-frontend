import { ApolloError, gql, useMutation } from "@apollo/client";
import React from "react";
import { useForm } from "react-hook-form";
import { FormError } from "../components/form-error";
import { LoginMutation, LoginMutationVariables } from "../__generated__/graphql";
import nuberLogo from "../images/logo.svg";
import { Link } from "react-router-dom";
import { Button } from "../components/button";
// import { Helmet } from "react-helmet";

import { authTokenVar, isLoggedInVar } from "../apollo";
import { LOCALSTORAGE_TOKEN } from "../constants";
import { Helmet } from "react-helmet-async";

const LOGIN_MUTATION = gql`
  mutation login($loginInput: LoginInput!) {
    login(input: $loginInput) {
      ok
      token
      error
    }
  }
`;

interface ILoginForm {
  email: string;
  password: string;
  resultError? :string;
}

export const Login = () =>{
    const {
      register,
      getValues,
      handleSubmit,
      watch,
      formState: { errors, isValid },
    } = useForm<ILoginForm>({ mode : "onChange"});
    const onCompleted = (data: LoginMutation) =>{
      // console.log(data.login.token)
      // console.log('loginMutation data : ', data)
      const {
        login: { ok, token },
      } = data;

      // null 값을 띄게 되므로 token을 조건문에 넣어준다. 
      // const token: string | null | undefined
      if (ok && token) {
        // console.log('token :', token);
        localStorage.setItem(LOCALSTORAGE_TOKEN, token);
        authTokenVar(token);
        isLoggedInVar(true);
      }
    };

    // false 는 onCompleted 에서 오는 에러이다. 
    // 요청이 유효하지않거나 인증이 필요하거나 url이 잘못될 경우에 나온다. 
    const onError = (error: ApolloError) =>{  
      console.log('error :', error)
  
    }
      const [loginMutation,{data : loginMutationResult, loading}] = useMutation<
        LoginMutation,
        LoginMutationVariables
      >(LOGIN_MUTATION, {
        onCompleted ,
        onError
      });
      const onSubmit = () => {
      if(!loading) {
        const { email, password } = getValues();
            const getTokenFromSomeWhere = () => {
              return localStorage.getItem(LOCALSTORAGE_TOKEN);
            };
             const token = getTokenFromSomeWhere();
            const headers = {
              Authorization: `Bearer ${token}`,
            };
            // console.log("Token:", token);
            // console.log("Headers:", headers);
        loginMutation({
          variables: {
            loginInput: {
              // watch 는 입력값의 변화를 감지해줌.
              // email:watch("email"),
              // password:watch("password"),
              email,
              password,
            },
          },
        });
      }        
    };

  return (
    <div className="h-screen flex items-center flex-col mt-10 lg:mt-28">
      <Helmet>
        <title>Login | Nuber Eats</title>
      </Helmet>
      <div className="w-full max-w-screen-sm flex flex-col px-5 items-center">
        <img src={nuberLogo} className="w-52 mb-10" alt="Nuber Eats" />
        <h4 className="w-full font-medium text-left text-3xl mb-5">
          Welcome back
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
          {/* {errors.password?.message && (
            <FormError errorMessage={errors.password?.message} />
          )}
          {errors.password?.type === "minLength" && (
            <FormError errorMessage="Password must be more than 10 chars." />
          )} */}
          <Button canClick={isValid} loading={loading} actionText={"Log in"} />
          {loginMutationResult?.login.error && (
            <FormError errorMessage={loginMutationResult.login.error} />
          )}
        </form>
        {/* <div>
          New to Nuber?{" "}
          <Link to="/create-account" className="text-lime-600 hover:underline">
            Create an Account
          </Link>
        </div> */}
        <div>
          New to Nuber?{" "}
          <Link to="/create-account" className="text-lime-600 hover:underline">
            Create an Account
          </Link>
        </div>
      </div>
    </div>
  );
}