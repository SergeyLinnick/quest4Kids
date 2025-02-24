interface SideBarProps {
  children: React.ReactNode;
}
  
export const SideBar = ({ children }: SideBarProps) => {
  return (
    <div>
      <h1>SideBar Component</h1>
      {children}
    </div>
  );
};