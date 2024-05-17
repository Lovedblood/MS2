import Layout from "../../layouts/Main";
import Link from "next/link";
import { useRouter } from "next/router";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useForm } from "react-hook-form";
import { server } from "../../utils/server";
import { postData } from "../../utils/services";

type SignUp = {
  username: string;
  password: string;
};

const RegisterPage = () => {
  const { register, handleSubmit, errors } = useForm();
  const router = useRouter();

  const onSubmit = async (data: SignUp) => {
    const res = await postData(`${server}/api/admin-register`, {
      username: data.username,
      password: data.password,
    });

    console.log(res);
    if (res.status) {
      toast.success("Admin registered successfully");
      router.push("/admin/login");
    } else {
      toast.error("Registration failed");
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
            <h2 className="form-block__title">Admin Sign up</h2>

            <form className="form" onSubmit={handleSubmit(onSubmit)}>
              <div className="form__input-row">
                <input
                  className="form__input"
                  placeholder="Username"
                  name="username"
                  type="text"
                  ref={register}
                />
              </div>

              <div className="form__input-row">
                <input
                  className="form__input"
                  type="Password"
                  name="password"
                  placeholder="Password"
                  ref={register}
                />
              </div>

              <button
                type="submit"
                className="btn btn--rounded btn--yellow btn-submit"
              >
                Sign up
              </button>

              <p className="form__signup-link">
                <Link href="/login">
                  <a href="#">Do you have account already?</a>
                </Link>
              </p>
            </form>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default RegisterPage;
