import { describe, it, expect, vi, beforeEach } from "vitest";
import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import LoginPage from "../components/LoginPage";
import { MemoryRouter } from "react-router-dom";

// ---- mocks ----
const navigateMock = vi.fn();
vi.mock("react-router-dom", async () => {
  const actual: any = await vi.importActual("react-router-dom");
  return {
    ...actual,
    useNavigate: () => navigateMock,
  };
});

// Mock Firebase Realtime DB get/ref
const getMock = vi.fn();
const refMock = vi.fn();

vi.mock("firebase/database", () => ({
  ref: (...args: any[]) => refMock(...args),
  get: (...args: any[]) => getMock(...args),
}));

// Mock app firebase module
vi.mock("../firebase", () => ({
  fithubDB: {},
}));

// Mock UserContext hook
const setUserMock = vi.fn();
vi.mock("../context/UserContext", () => ({
  useUser: () => ({
    user: null,
    setUser: setUserMock,
  }),
}));

describe("LoginPage", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("TC-Login-A: logs in with valid credentials and navigates to dashboard", async () => {
    // snapshot mock
    getMock.mockResolvedValue({
      exists: () => true,
      val: () => ({
        user123: {
          Name: "Kaleel",
          email: "kaleel@test.com",
          membership: "Silver",
          password: "pass123",
          phone: "4160000000",
        },
      }),
    });

    render(
      <MemoryRouter>
        <LoginPage />
      </MemoryRouter>
    );

    await userEvent.type(screen.getByLabelText(/email/i), "kaleel@test.com");
    await userEvent.type(screen.getByLabelText(/password/i), "pass123");
    await userEvent.click(screen.getByRole("button", { name: /log in/i }));

    await waitFor(() => {
      expect(setUserMock).toHaveBeenCalledWith({
        username: "user123",
        name: "Kaleel",
        email: "kaleel@test.com",
        membership: "Silver",
        phone: "4160000000",
      });
      expect(navigateMock).toHaveBeenCalledWith("/member-dashboard");
    });
  });

  it("TC-Login-B: shows error for invalid credentials", async () => {
    getMock.mockResolvedValue({
      exists: () => true,
      val: () => ({
        user1: {
          Name: "A",
          email: "a@test.com",
          membership: "Gold",
          password: "correct",
          phone: "111",
        },
      }),
    });

    render(
      <MemoryRouter>
        <LoginPage />
      </MemoryRouter>
    );

    await userEvent.type(screen.getByLabelText(/email/i), "a@test.com");
    await userEvent.type(screen.getByLabelText(/password/i), "wrong");
    await userEvent.click(screen.getByRole("button", { name: /log in/i }));

    expect(await screen.findByText(/invalid email or password/i)).toBeInTheDocument();
    expect(navigateMock).not.toHaveBeenCalled();
  });

  it("TC-Login-C: shows 'No users found' if snapshot missing", async () => {
    getMock.mockResolvedValue({
      exists: () => false,
    });

    render(
      <MemoryRouter>
        <LoginPage />
      </MemoryRouter>
    );

    await userEvent.type(screen.getByLabelText(/email/i), "x@test.com");
    await userEvent.type(screen.getByLabelText(/password/i), "x");
    await userEvent.click(screen.getByRole("button", { name: /log in/i }));

    expect(await screen.findByText(/no users found/i)).toBeInTheDocument();
  });
});
