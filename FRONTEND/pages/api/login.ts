import type { NextApiRequest, NextApiResponse } from "next";

// fake login
export default async (req: NextApiRequest, res: NextApiResponse) => {
  const request = req.body;
  console.log(request);
  const Username = request.username;
  const Password = request.password;
  const response = await fetch("http://localhost:5000/log", {
    method: "POST",
    body: JSON.stringify({ Username, Password }),
    headers: {
      "Content-Type": "application/json",
    },
  });

  const data = await response.json();
  console.log(data);
  if (response.ok) {
    console.log("Login successful");
    res.status(200).json({ token: data.token });
  } else {
    console.log(data);
    res.status(401).json({ status: false });
  }
};
