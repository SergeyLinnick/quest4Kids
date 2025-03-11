import { ChildForm } from "@/components";
import { Heading } from "@radix-ui/themes";

export default function NewChildPage() {
  return (
    <>
      <Heading as="h2" mb="4" size="4">
        Add New Child
      </Heading>
      <ChildForm />
    </>
  );
}
