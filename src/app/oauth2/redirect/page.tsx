"use client";

import { signIn } from "next-auth/react";
import Cookies from "js-cookie";
import { useEffect } from "react";

export default function Redirect() {
  useEffect(() => {
    const accessToken = Cookies.get("accessToken");
    if (accessToken) {
      signIn("oauth", { accessToken });
    }
  }, []);

  return <div>로그인 처리 중...</div>;
}
