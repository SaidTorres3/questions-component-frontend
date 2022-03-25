import { UserData } from "./authContext";
import { useValidadeTokenMutation } from "./operations.gql";

const useValidadeToken = () => {
  const [mutation] = useValidadeTokenMutation();

  const validadeToken = async (token: string): Promise<UserData|undefined> => {
    const res = await mutation({
      variables: {
        input: {
          token,
        },
      },
    });

    console.log(res.data?.validadeToken?.__typename);
    if (res.data?.validadeToken?.__typename === "ValidadeTokenPayloadSuccess") {
      return res.data.validadeToken.user;
    }
    return;
  };

  return {
    validadeToken,
  };
};

export default useValidadeToken;
