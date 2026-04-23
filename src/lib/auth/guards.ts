import { auth } from "@/lib/auth";

export type SessionUser = {
  id: string;
  name: string | null;
  email: string | null;
  role: "collector" | "admin";
};

export async function requireUser(): Promise<SessionUser> {
  const session = await auth();
  if (!session?.user) throw new Error("UNAUTHENTICATED");
  return session.user as SessionUser;
}

export async function requireAdmin(): Promise<SessionUser> {
  const user = await requireUser();
  if (user.role !== "admin") throw new Error("FORBIDDEN");
  return user;
}
