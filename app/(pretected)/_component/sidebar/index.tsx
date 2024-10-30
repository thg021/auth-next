import { UserButton } from "@/components/auth/user-button";

const Sidebar = () => {
  return (
    <div className="sticky top-0 z-10 flex h-screen w-16 flex-col justify-between gap-4 border-r border-grey-200 bg-white pb-4 pt-4">
      <div></div>
      <div>
        <UserButton />
      </div>
    </div>
  );
};

export default Sidebar;
