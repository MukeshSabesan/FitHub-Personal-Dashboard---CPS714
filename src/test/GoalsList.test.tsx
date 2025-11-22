import { describe, it, expect, vi, beforeEach } from "vitest";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import GoalsList from "../components/GoalsList";

// Firestore mocks
const addDocMock = vi.fn();
const collectionMock = vi.fn();

vi.mock("firebase/firestore", () => ({
  addDoc: (...args: any[]) => addDocMock(...args),
  collection: (...args: any[]) => collectionMock(...args),
}));

vi.mock("../firebase", () => ({
  achievementsDB: {}, // used as db
}));

vi.mock("../context/UserContext", () => ({
  useUser: () => ({
    user: { username: "user123", email: "u@test.com" },
  }),
}));

describe("GoalsList", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("TC-Goals-A: adds a goal when valid text is entered", async () => {
    render(<GoalsList />);

    const input = screen.getByPlaceholderText(/enter a fitness goal/i);
    await userEvent.type(input, "Swim twice a week");
    await userEvent.click(screen.getByRole("button", { name: /add goal/i }));

    expect(screen.getByText("Swim twice a week")).toBeInTheDocument();
  });

  it("TC-Goals-B (implementation): does NOT add blank goal", async () => {
    render(<GoalsList />);

    const existingCount = screen.getAllByRole("checkbox").length;
    await userEvent.click(screen.getByRole("button", { name: /add goal/i }));

    const afterCount = screen.getAllByRole("checkbox").length;
    expect(afterCount).toBe(existingCount);
  });

  it("TC-Goals-C: checking a goal writes achievement to Firestore", async () => {
    render(<GoalsList />);

    const firstCheckbox = screen.getAllByRole("checkbox")[0];
    await userEvent.click(firstCheckbox);

    expect(addDocMock).toHaveBeenCalledTimes(1);
    const payload = addDocMock.mock.calls[0][1];
    expect(payload).toMatchObject({
      username: "user123",
      email: "u@test.com",
      completed: true,
    });
    expect(payload.goal).toBeTruthy();
  });
});
