// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";

type Data = {
  name: string;
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  const postRes = await fetch(
    "https://ponychallenge.trustpilot.com/pony-challenge/maze",
    {
      // credentials: "include",
      method: "POST",
      // body: JSON.stringify({
      //   "maze-width": dimentions.width,
      //   "maze-height": dimentions.height,
      //   "maze-player-name": character,
      //   difficulty: difficulty,
      // }),
    }
  );
  const data = await postRes.json();
  console.log(data);
  res.status(200).json(data);
}
