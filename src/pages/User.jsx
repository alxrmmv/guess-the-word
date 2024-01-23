import UserProfile from "../features/Profile/UserProfile";
import PageContainer from "../ui/PageContainer";

function User() {
  return (
    <PageContainer title="Profile settings">
      <UserProfile />
    </PageContainer>
  );
}

export default User;
