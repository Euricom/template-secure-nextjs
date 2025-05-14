import { Button } from "@/components/ui/button";
import { getSession } from "@/server/auth";

const UserProfile = ({ session }: { session: any }) => {
  return (
    <div>
      <pre className="text-sm overflow-clip">
        {JSON.stringify(session, null, 2)}
      </pre>

    </div>
  );
};

export default async function Home() {
  const session = await getSession();
  console.log("session>>>", session);
  return (
    <div className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">
      <main className="flex flex-col gap-[32px] row-start-2 items-center sm:items-start">
        {session?.user ? (
          <UserProfile session={session} />
        ) : (
          <a href="/login">
            <Button type="submit">Not authenticated, login</Button>
          </a>
        )}
      </main>
    </div>
  );
}

export const dynamic = 'force-dynamic'

