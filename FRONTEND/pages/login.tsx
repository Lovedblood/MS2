import Layout from "../layouts/Main";
import Link from "next/link";
import { useRouter } from "next/router";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useForm } from "react-hook-form";
import { server } from "../utils/server";
import { postData } from "../utils/services";

type LoginMail = {
  username: string;
  password: string;
};

const LoginPage = () => {
  const { register, handleSubmit, errors } = useForm();
  const router = useRouter();


  const onSubmit = async (data: LoginMail) => {
    try {
      const res = await postData(`${server}/api/login`, {
        username: data.username,
        password: data.password,
      });

      console.log(res)
      if (res.token) {
        toast.success("You logged in successfully");
        router.push("/products");
      } else {
        toast.error("Login failed");
      }
    } catch (error) {
      // Handle errors
      console.error('Login error:', error);
      toast.error("Login failed");
    }
  };

  return (
    <Layout>
      <section className="form-page">
        <div className="container">
          <div className="back-button-section">
            <Link href="/products">
              <a>
                <i className="icon-left"></i> Back to store
              </a>
            </Link>
          </div>

          <div className="form-block">
            <h2 className="form-block__title">Log in</h2>

            <form className="form" onSubmit={handleSubmit(onSubmit)}>
              <div className="form__input-row">
                <input
                  className="form__input"
                  placeholder="username"
                  type="text"
                  name="username"
                  ref={register({
                    required: true,
                  })}
                />

                {errors.username && errors.username.type === "required" && (
                  <p className="message message--error">
                    This field is required
                  </p>
                )}
              </div>

              <div className="form__input-row">
                <input
                  className="form__input"
                  type="password"
                  placeholder="Password"
                  name="password"
                  ref={register({ required: true })}
                />
                {errors.password && errors.password.type === "required" && (
                  <p className="message message--error">
                    This field is required
                  </p>
                )}
              </div>

              <div className="form__info">
                <a
                  href="/forgot-password"
                  className="form__info__forgot-password"
                >
                  Forgot password?
                </a>
              </div>

              <button
                type="submit"
                className="btn btn--rounded btn--yellow btn-submit"
              >
                Sign in
              </button>

              <p className="form__signup-link">
                Not a member yet? <a href="/register">Sign up</a>
              </p>
            </form>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default LoginPage;
