import React from "react";
import { Button } from "../components/button";
import { useMe } from "../hooks/useMe";
import { useForm } from "react-hook-form";
import { gql, useApolloClient, useMutation } from "@apollo/client";
import { EditProfileMutation, EditProfileMutationVariables } from "../__generated__/graphql";
import { Helmet } from "react-helmet-async";

const EDIT_PROFILE_MUTATION = gql`
  mutation editProfile($input: EditProfileInput!) {
    editProfile(input: $input) {
      ok
      error
    }
  }
`;

interface IFormProps {
  email?: string;
  password?: string;
}

export const EditProfile = () => {
  const { data: userData } = useMe();
    const client = useApolloClient();
  // const onCompleted = {data : EditProfile} => {

  // }
    const onCompleted = (data: EditProfileMutation) => {
      const {
        editProfile: { ok },
      } = data;
      if (ok && userData) {
        // update the cache
      const {
        me: { email: prevEmail, id },
      } = userData;
      const { email: newEmail } = getValues();
      if (prevEmail !== newEmail) {
        client.writeFragment({
          id: `User:${id}`,
          fragment: gql`
            fragment EditedUser on User {
              verified
              email
            }
          `,
          data: {
            email: newEmail,
            verified: false,
          },
        });
      }
      }
    };
    const [EditProfileMutation, { loading }] = useMutation<
      EditProfileMutation,
      EditProfileMutationVariables
    >(EDIT_PROFILE_MUTATION, {
      onCompleted,
    });

  const {register, handleSubmit, getValues, formState} = useForm<IFormProps>({
//      *   return (
//  *     <form onSubmit={handleSubmit(onSubmit)}>
//  *       <input defaultValue="test" {...register("example")} />
//  *       <input {...register("exampleRequired", { required: true })} />
//  *       {errors.exampleRequired && <span>This field is required</span>}
//  *       <button>Submit</button>
//  *     </form>
    mode : "onChange",
    defaultValues : {
      email: userData?.me.email
    },
  })
  const onSubmit = () => {
    const { email, password } = getValues();
    EditProfileMutation({
      variables: {
        input: {
          email,
          ...(password !== "" && { password }),
        },
      },
    });
  };
  return (
    <div className="mt-52 flex flex-col justify-center items-center">
      <Helmet>
        <title>Edit Profile | Nuber Eats</title>
      </Helmet>
      <h4 className="font-semibold text-2xl mb-3">Edit Profile</h4>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="grid max-w-screen-sm gap-3 mt-5 w-full mb-5"
      >
        <input
          {...register("email", {
            pattern:
              /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
          })}
          name="email"
          className="input"
          type="email"
          placeholder="Email"
        />
        <input
          {...register}
          name="password"
          className="input"
          type="password"
          placeholder="Password"
        />
        <Button
          loading={loading}
          canClick={formState.isValid}
          actionText="Save Profile"
        />
      </form>
    </div>
  );
};
