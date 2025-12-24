import MyProject from "@/sections/MyProject";

export const metadata = {
  title: "Projects | AbdelRahman",
  description: "Explore my selected projects and professional work.",
};

export default function WorkPage() {
  return (
    <div className="pt-20">
      <MyProject />
    </div>
  );
}
