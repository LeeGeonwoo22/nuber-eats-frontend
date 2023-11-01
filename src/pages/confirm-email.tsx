import React, { useEffect } from "react";
import { gql, useMutation } from "@apollo/client";
import { VerifyEmailMutation, VerifyEmailMutationVariables } from "../__generated__/graphql";
import { useLocation } from "react-router-dom";

const VERIFY_EMAIL_MUTATION = gql`
    mutation verifyEmail($input : VerifyEmailInput!) {
        verifyEmail(input: $input) {
            ok
            error
        }
    }
`;

export const ConfirmEmail = () =>{
    const [verifyEmail, {loading : verifyingEmail}] = useMutation<
    VerifyEmailMutation,
    VerifyEmailMutationVariables
    >(VERIFY_EMAIL_MUTATION);
    const location = useLocation;
    useEffect(() => {
        console.log("useLocation :", useLocation);
        console.log(window.location.href.split("code="));
        const [_, code] = window.location.href.split("code=");
   }, []);

     return (
       <div className="mt-52 flex flex-col items-center justify-center">
         <h2 className="text-lg mb-1 font-medium">Confirming email...</h2>
         <h4 className="text-gray-700 text-sm">
           Please wait, don't close this page...
         </h4>
       </div>
     );
}