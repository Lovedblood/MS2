import Layout from "../layouts/Main";
import Link from "next/link";
import { useRouter } from "next/router";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useForm } from "react-hook-form";
import { server } from "../utils/server";
import { postData } from "../utils/services";

type SignUp = {
  username: string;
  email: string;
  address: string;
  phone: string;
  birthdate: string;
  name: string;
  password: string;
};

const RegisterPage = () => {
  const { register, handleSubmit, errors } = useForm();
  const router = useRouter();

  const onSubmit = async (data: SignUp) => {
    const res = await postData(`${server}/api/register`, {
      username: data.username,
      email: data.email,
      address: data.address,
      phone: data.phone,
      birthdate: data.birthdate,
      name: data.name,
      password: data.password,
    });

    console.log(res);
    if (res.status) {
      toast.success("User registered successfully");
      router.push("/login");
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
            <h2 className="form-block__title">
              Create an account and discover the benefits
            </h2>

            <form className="form" onSubmit={handleSubmit(onSubmit)}>
              <div className="form__input-row">
                <input
                  className="form__input"
                  placeholder="Name"
                  name="name"
                  type="text"
                  ref={register}
                />
              </div>

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
                  placeholder="Address"
                  name="address"
                  type="text"
                  ref={register}
                />
              </div>

              <div className="form__input-row">
                <input
                  className="form__input"
                  placeholder="Phone number"
                  name="phone"
                  type="text"
                  ref={register}
                />
              </div>

              {/* birthdate */}
              <div className="form__input-row">
                <input
                  className="form__input"
                  placeholder="Birthdate"
                  name="birthdate"
                  type="date"
                  ref={register}
                />
              </div>

              <div className="form__input-row">
                <input
                  className="form__input"
                  placeholder="Email"
                  name="email"
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
                  <a href="#">Are you already a member?</a>
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
