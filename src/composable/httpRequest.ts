const URl_BASE: string = "https://eshop-deve.herokuapp.com/api/v2/orders";
const TOKEN: string =
  "eyJhbGciOiJIUzUxMiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJwUGFINU55VXRxTUkzM DZtajdZVHdHV3JIZE81cWxmaCIsImlhdCI6MTYyMDY2Mjk4NjIwM30.lhfzSXW9_ TC67SdDKyDbMOYiYsKuSk6bG6XDE1wz2OL4Tq0Og9NbLMhb0LUtmrgzfWiTrq AF fnPldd8QzWvgVQ";

export const useFetchGet = async () => {
  let dataFetch: any = null;

  try {
    dataFetch = await fetch(URl_BASE, {
      headers: { Authorization: `Bearer ${TOKEN}` },
    });
  } catch (err: unknown) {
    console.log(err);
  }

  return dataFetch;
};
