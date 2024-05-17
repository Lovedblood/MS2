import type { NextApiRequest, NextApiResponse } from "next";

// fake login
export default async (req: NextApiRequest, res: NextApiResponse) => {
  const request = req.body;
  console.log(request);
  const username = request.username;
  const password = request.password;
  const response = await fetch("http://localhost:5000/logadmin", {
    method: "POST",
    body: JSON.stringify({ username, password }),
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
