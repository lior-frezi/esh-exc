import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import "@testing-library/jest-dom";
import { PeopleGrid } from "./PeopleGrid";

describe("PeopleGrid", () => {
  it("should show text input after clicking +", async () => {
    render(<PeopleGrid data={[]} onBackClick={() => {}} />);

    await userEvent.click(screen.getByText("+"));

    expect(screen.getAllByRole("textbox")[0]).toBeInTheDocument();
  });

  it("should disable + button after hitting +", async () => {
    render(<PeopleGrid data={[]} onBackClick={() => {}} />);

    await userEvent.click(screen.getByText("+"));

    expect(screen.getByText("+")).toBeDisabled();
  });

  it("should enable + button after hitting ok", async () => {
    render(<PeopleGrid data={[]} onBackClick={() => {}} />);

    await userEvent.click(screen.getByText("+"));
    await userEvent.click(screen.getByText("ok"));

    expect(screen.getByText("+")).toBeEnabled();
  });

  it("should add Moses to the table", async () => {
    render(<PeopleGrid data={[]} onBackClick={() => {}} />);

    await userEvent.click(screen.getByText("+"));
    await userEvent.type(screen.getAllByRole("textbox")[0], "Moses");
    await userEvent.click(screen.getByText("ok"));

    expect(screen.queryByRole("input")).not.toBeInTheDocument();
    expect(screen.getByText("Moses")).toBeInTheDocument();
  });
});
