import Heading from "../ui/Heading";
import Row from "../ui/Row";
import UpdateUserDataForm from "../features/authentication/UpdateUserDataForm";
import UpdatePasswordForm from "../features/authentication/UpdatePasswordForm";

function Account() {
  return (
    <>
      <Heading as="h1">Update your account</Heading>

      <Row type="vertical">
        <Heading as="h3">Update user data</Heading>
        <p className="block">Update user data form</p>
        <UpdateUserDataForm />
      </Row>

      <Row type="vertical">
        <Heading as="h3">Update password</Heading>
        <p>Update user password form</p>
        <UpdatePasswordForm />
      </Row>
    </>
  );
}

export default Account;
