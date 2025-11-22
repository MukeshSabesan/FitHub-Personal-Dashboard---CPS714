import { describe, it, expect, vi, beforeEach } from "vitest";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import AccountDetails from "../components/AccountDetails";
import { MemoryRouter } from "react-router-dom";

// Firebase RTDB mocks
const updateMock = vi.fn();
const setMock = vi.fn();
const removeMock = vi.fn();
const getMock = vi.fn();
const refMock = vi.fn();

vi.mock("firebase/database", () => ({
  ref: (...args: any[]) => refMock(...args),
  update: (...args: any[]) => updateMock(...args),
  set: (...args: any[]) => setMock(...args),
  remove: (...args: any[]) => removeMock(...args),
  get: (...args: any[]) => getMock(...args),
}));

vi.mock("../firebase", () => ({ fithubDB: {} }));

const setUserMock = vi.fn();
vi.mock("../context/UserContext", () => ({
  useUser: () => ({
    user: {
      username: "oldUser",
      name: "Old Name",
      email: "old@test.com",
      phone: "123",
      membership: "Silver",
    },
    setUser: setUserMock,
  }),
}));

describe("AccountDetails", () => {
  beforeEach(() => {
    vi.clearAllMocks();
    vi.spyOn(window, "alert").mockImplementation(() => {});
  });

  it("TC-Account-A: saving with same username calls update only", async () => {
    render(
      <MemoryRouter>
        <AccountDetails />
      </MemoryRouter>
    );

    await userEvent.clear(screen.getByDisplayValue("Old Name"));
    await userEvent.type(screen.getByLabelText(/name/i), "New Name");

    await userEvent.click(screen.getByRole("button", { name: /save profile changes/i }));

    expect(updateMock).toHaveBeenCalledTimes(1);
    expect(setMock).not.toHaveBeenCalled();
    expect(removeMock).not.toHaveBeenCalled();
  });

  it("TC-Account-B: changing username triggers copy + delete", async () => {
    // snapshot of old user for migration
    getMock.mockResolvedValue({
      exists: () => true,
      val: () => ({
        Name: "Old Name",
        email: "old@test.com",
        phone: "123",
        membership: "Silver",
      }),
    });

    render(
      <MemoryRouter>
        <AccountDetails />
      </MemoryRouter>
    );

    await userEvent.clear(screen.getByLabelText(/username/i));
    await userEvent.type(screen.getByLabelText(/username/i), "newUser");

    await userEvent.click(screen.getByRole("button", { name: /save profile changes/i }));

    expect(setMock).toHaveBeenCalledTimes(1);     // new record created
    expect(removeMock).toHaveBeenCalledTimes(1);  // old record deleted
    expect(window.alert).toHaveBeenCalledWith(
      expect.stringMatching(/username updated/i)
    );
  });
});
