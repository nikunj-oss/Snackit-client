import { useAuth0 } from "@auth0/auth0-react";
import { useCreateUserProfileMutation } from "../redux/api";
import { useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";

const AuthCallBack = () => {
  const navigate = useNavigate();
  const { user, getAccessTokenSilently } = useAuth0();
  const [createUserProfile] = useCreateUserProfileMutation();
  const hasCreatedUser = useRef(false);

  useEffect(() => {
    const createUser = async () => {
      if (user?.sub && user?.email && !hasCreatedUser.current) {
        try {
          const token = await getAccessTokenSilently(); // Get access token
          await createUserProfile({
            data: {
              email: user.email,
              auth0Id: user.sub,
            },
            token, // Pass the token
          }).unwrap();
          hasCreatedUser.current = true;
        } catch (error) {
          console.error("Error creating user profile:", error);
        }
      }
    };

    createUser();
    navigate("/");

  }, [createUserProfile, navigate, user, getAccessTokenSilently]);

  return <>Loading......</>;
};

export default AuthCallBack;
