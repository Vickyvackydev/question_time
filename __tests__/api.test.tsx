import { useToken } from "@/context/AuthToken";
import axios from "axios";

const { token } = useToken();
it("should return the expected data", async () => {
  const getQuestionEndpoint = "https://qt.organogram.app/questions";
  const token = process.env.NEXT_PUBLIC_TOKEN; // a token fetched is used for the testing

  try {
    const response = await axios.get(getQuestionEndpoint, {
      headers: {
        token: token,
      },
    });

    expect(response.status).toBe(200);
    expect(Object.keys(response.data).length).toBeGreaterThan(0);
  } catch (error) {
    throw error;
  }
}, 15000);
