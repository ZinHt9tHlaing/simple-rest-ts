import { useSelector } from "react-redux";
import type { RootState } from "../store/store";
import React, { useEffect } from "react";
import { useNavigate } from "react-router";

interface childrenProps {
  children: React.ReactNode;
}

const Protect = ({ children }: childrenProps) => {
  const userInfo = useSelector((state: RootState) => state.auth.userInfo);
  const navigate = useNavigate();

  useEffect(() => {
    if (!userInfo) {
      // window.location.href = "/login";
      navigate("/");
    }
  }, [userInfo]);

  return <>{children}</>;
};

export default Protect;
