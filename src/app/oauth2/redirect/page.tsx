"use client";

import { signIn } from "next-auth/react";
import Cookies from "js-cookie";

export default function Redirect() {
  const accessToken = Cookies.get("accessToken");
  signIn("oauth", { accessToken });

  return <div>loading...</div>;
}
