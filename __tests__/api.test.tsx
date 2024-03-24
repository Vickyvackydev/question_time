import axios from "axios";

it("should return the expected data", async () => {
  const getQuestionEndpoint = "https://qt.organogram.app/questions";
  const test_token = "006de34e-5e56-49aa-b680-6dfcba4e12ff"; // a token fetched is used for the testing

  try {
    const response = await axios.get(getQuestionEndpoint, {
      headers: {
        token: test_token,
      },
    });

    expect(response.status).toBe(200);
    expect(Object.keys(response.data).length).toBeGreaterThan(0);
  } catch (error) {
    throw error;
  }
}, 15000);
