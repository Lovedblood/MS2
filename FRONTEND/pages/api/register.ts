import type { NextApiRequest, NextApiResponse } from "next";

// fake login
export default async (req: NextApiRequest, res: NextApiResponse) => {
  const request = req.body;
  console.log(request);
  const Username = request.username;
  const Email = request.email;
  const Address = request.address;
  const PhoneNumber = request.phone;
  const Birthdate = request.birthdate;
  const Name = request.name;
  const Password = request.password;
  const response = await fetch("http://localhost:5000/reg", {
    method: "POST",
    body: JSON.stringify({
      Username,
      Email,
      Address,
      PhoneNumber,
      Birthdate,
      Name,
      Password,
    }),
    headers: {
      "Content-Type": "application/json",
    },
  });

  const data = await response.json();
  console.log(data);
  if (response.ok) {
    console.log("Register successful");
    res.status(200).json({ status: true });
  } else {
    console.log(data);
    res.status(401).json({ status: false });
  }
};
