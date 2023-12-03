import { useContext, useEffect, useState } from "react";
import { loginUser } from "../services/usersivice";
import { toast } from "react-toastify";
import { set } from "lodash";
import { useForm } from "react-hook-form";

import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { useNavigate } from "react-router";
import { UserContext } from "../context/UseContex";

const Login = () => {
  const { loginContext } = useContext(UserContext);

  const [email, setemail] = useState("");
  const [password, setpassword] = useState("");
  let navi = useNavigate();
  let userSchema = yup.object({
    email: yup.string().email(),
    password: yup
      .string()
      .min(8, "Tối thiểu 8 ký tự")
      .max(12, "Tối đa 12 ký tự")
      .required("Vui lòng nhập mật khẩu"),
  });
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    mode: "onChange",
    resolver: yupResolver(userSchema),
  });

  // useEffect(() => {
  //   let token = localStorage.getItem("token");
  //   if (token) {
  //     navi("/");
  //   }
  // }, []);
  const handleLogin = async (data) => {
    console.log(data);
    if (!data.email || !data.password) {
      toast.error("Vui lòng nhập đầy đủ email và mật khẩu!");
      return;
    } else {
      let res = await loginUser(data.email, data.password);
      console.log(res);
      if (res && res.token) {
        loginContext(data.email, res.token);
        toast.success("Đăng nhập thành công!");
        setTimeout(() => {
          navi("/");
        }, 2000);
      } else {
        if (res && res.status === 400) {
          toast.error("Đăng nhập thất bại. Vui lòng kiểm tra lại thông tin!");
        }
      }
    }
  };

  return (
    <>
      <div className="logi-container col-12 col-sm-4 ">
        <form onSubmit={handleSubmit(handleLogin)}>
          <div className="login">Login</div>
          <label>User Name (eve.holt@reqres.in)</label>
          <input
            type="text"
            className="form-control"
            placeholder="Username and email"
            name="email"
            onChange={(event) => setemail(event.target.value)}
            {...register("email")}
          />
          <span>{errors?.email?.message}</span>
          <label>Passord</label>
          <input
            type="password"
            className="form-control"
            placeholder="password"
            name="password"
            onChange={(event) => setpassword(event.target.value)}
            {...register("password")}
          />
          <span>{errors?.password?.message}</span>

          <div className="button">
            <button type="submit" className="btn btn-primary">
              Login
            </button>
          </div>
        </form>
      </div>
    </>
  );
};

export default Login;
