import { Badge, Button } from "@repo/ui-tw";

export default function Home() {
  return (
    <div className="body">
      <div className="test">Marketing</div>
      <a href="/">Go Home</a>
      <div>
        <Button variant="destructive">Click me</Button>
      </div>
      <div className="mt-10">Test div</div>
      <>
        <Badge variant="default">Badge</Badge>
        <Badge variant="secondary">Badge</Badge>
        <Badge variant="destructive">Badge</Badge>
        <Badge variant="outline" asChild>
          <a href="/">Badge</a>
        </Badge>
        <span className="inline-flex items-center rounded-md bg-gray-50 px-2 py-1 text-xs font-medium text-gray-600 ring-1 ring-gray-500/10 ring-inset">
          Badge
        </span>
        <span className="inline-flex items-center rounded-md bg-red-50 px-2 py-1 text-xs font-medium text-red-700 ring-1 ring-red-600/10 ring-inset">
          Badge
        </span>
        <span className="inline-flex items-center rounded-md bg-yellow-50 px-2 py-1 text-xs font-medium text-yellow-800 ring-1 ring-yellow-600/20 ring-inset">
          Badge
        </span>
        <span className="inline-flex items-center rounded-md bg-green-50 px-2 py-1 text-xs font-medium text-green-700 ring-1 ring-green-600/20 ring-inset">
          Badge
        </span>
        <span className="inline-flex items-center rounded-md bg-blue-50 px-2 py-1 text-xs font-medium text-blue-700 ring-1 ring-blue-700/10 ring-inset">
          Badge
        </span>
        <span className="inline-flex items-center rounded-md bg-indigo-50 px-2 py-1 text-xs font-medium text-indigo-700 ring-1 ring-indigo-700/10 ring-inset">
          Badge
        </span>
        <span className="inline-flex items-center rounded-md bg-purple-50 px-2 py-1 text-xs font-medium text-purple-700 ring-1 ring-purple-700/10 ring-inset">
          Badge
        </span>
        <span className="inline-flex items-center rounded-md bg-pink-50 px-2 py-1 text-xs font-medium text-pink-700 ring-1 ring-pink-700/10 ring-inset">
          Badge
        </span>
      </>
    </div>
  );
}
