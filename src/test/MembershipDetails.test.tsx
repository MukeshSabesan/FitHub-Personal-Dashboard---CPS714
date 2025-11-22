import { describe, it, expect, vi, beforeEach } from "vitest";
import { render, screen } from "@testing-library/react";

// IMPORTANT: reset module mocks between tests
beforeEach(() => {
  vi.resetModules();
});

async function renderWithMembership(membership: string) {
  vi.doMock("../context/UserContext", () => ({
    useUser: () => ({ user: { membership } }),
  }));

  const MembershipDetails = (await import("../components/MembershipDetails")).default;
  return render(<MembershipDetails />);
}

describe("MembershipDetails", () => {
  it("shows $29.99 for Silver", async () => {
    await renderWithMembership("Silver");
    expect(screen.getByText("$29.99")).toBeInTheDocument();
  });

  it("shows $39.99 for Gold", async () => {
    await renderWithMembership("Gold");
    expect(screen.getByText("$39.99")).toBeInTheDocument();
  });

  it("shows $44.99 for Platinum", async () => {
    await renderWithMembership("Platinum");
    expect(screen.getByText("$44.99")).toBeInTheDocument();
  });

  it("defaults to $0.00 for unknown membership", async () => {
    await renderWithMembership("Admin");
    expect(screen.getByText("$0.00")).toBeInTheDocument();
  });

  it("renders nothing if user is null", async () => {
    vi.doMock("../context/UserContext", () => ({
      useUser: () => ({ user: null }),
    }));

    const MembershipDetails = (await import("../components/MembershipDetails")).default;
    const { container } = render(<MembershipDetails />);
    expect(container).toBeEmptyDOMElement();
  });
});
