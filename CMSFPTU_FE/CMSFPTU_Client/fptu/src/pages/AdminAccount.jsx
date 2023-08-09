import AccountTable from "../components/Admin/Account/AccountTable";

const AdminAccount = (props) => {
  return (
    <div>
      <AccountTable deleted={props?.deleted} />
    </div>
  );
};

export default AdminAccount;
