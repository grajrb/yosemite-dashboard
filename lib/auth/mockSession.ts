export type SessionRole = "super_admin" | "admin" | "viewer";

export type MockSession = {
  user: {
    id: string;
    name: string;
    role: SessionRole;
  };
};

export async function getMockSession(): Promise<MockSession> {
  return {
    user: {
      id: "u_super_1",
      name: "Platform Super Admin",
      role: "super_admin",
    },
  };
}
