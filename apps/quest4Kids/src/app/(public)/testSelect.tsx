import { SelectField } from "@repo/ui-tw";

const options = [
  { label: "Option 1", value: "1" },
  { label: "Option 2", value: "2" },
  { label: "Option 3", value: "3" },
  { label: "Option 4", value: "4" },
];

async function serverAction(formData: FormData) {
  "use server";

  const selectedOption = formData.get("select");
  console.log("Selected:", selectedOption);
}

export default function TestSelect() {
  return (
    <form action={serverAction}>
      <SelectField name="select" options={options} classNameTrigger="w-100" />

      <button
        type="submit"
        className="mt-4 px-4 py-2 bg-violet-400 text-white rounded"
      >
        Save
      </button>
    </form>
  );
}
