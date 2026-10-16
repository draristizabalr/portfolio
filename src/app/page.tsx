import { Desk } from "@/components/desk/desk";
import { Folder } from "@/components/desk/folder";
import { PaperSheet } from "@/components/desk/paper-sheet";
import { Telephone } from "@/components/desk/telephone";
import { Wall } from "@/components/desk/wall";
import { Settle } from "@/components/settle";
import { folders } from "@/content/sections";

export default function Home() {
  return (
    <main className="min-h-dvh">
      <Wall />
      <Desk>
        {/* The folders are deliberately NOT wrapped in <Settle>. They are the
            named participants of the folder-to-window view transition, and an
            entrance animation that starts them at opacity 0 would be captured
            as an invisible snapshot, breaking the morph. The morph is their
            entrance animation. */}
        {folders.map((folder) => (
          <Folder key={folder.slug} folder={folder} />
        ))}
        <Settle delay={50}>
          <Telephone />
        </Settle>
        <Settle delay={120} className="sm:col-span-2 lg:col-span-3">
          <PaperSheet />
        </Settle>
      </Desk>
    </main>
  );
}
