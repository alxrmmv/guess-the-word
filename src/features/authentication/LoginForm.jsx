import { useEffect, useState } from "react";
import Form from "../../ui/Form";

import Button from "../../ui/Button";

import { useLoginMutation } from "./authSlice";
import { useNavigate } from "react-router-dom";
import LinkButton from "../../ui/LinkButton";



function LoginForm() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [login, { error, isSuccess, isError, isLoading }] = useLoginMutation();

  const navigate = useNavigate();

  function handleSubmit(e) {
    e.preventDefault();
    if (!email || !password) return;
    try {
      login({ email, password });
    } catch (err) {
      console.log(err.message);
    }
  }

  useEffect(() => {
    if (isSuccess) navigate("/");
  }, [isSuccess, navigate]);

  return (
    <Form onSubmit={handleSubmit}>
      <Form.FormRowVertical>
        <Form.Input
          placeholder="Email"
          type="email"
          id="email"
          // This makes this form better for password managers
          autoComplete="username"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          disabled={isLoading}
        />
      </Form.FormRowVertical>
      <Form.FormRowVertical error={isError ? error.message : ""}>
        <Form.Input
          placeholder="Password"
          type="password"
          id="password"
          autoComplete="current-password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          disabled={isLoading}
        />
      </Form.FormRowVertical>
      {/* <Button size="large" disabled={isLoggingIn}>
          {!isLoggingIn ? "Login" : <Spinner />}
        </Button> */}
      <Form.FormRowVertical>
        <Button size="medium" disabled={isLoading}>
          Login
        </Button>
      </Form.FormRowVertical>
      <Form.FormRowVertical justify="center">
        <p>
          Don&apos;t have an account?{" "}
          <span>
            <LinkButton to="/signup">Sign up</LinkButton>
          </span>
        </p>
      </Form.FormRowVertical>
    </Form>
  );
}

export default LoginForm;
