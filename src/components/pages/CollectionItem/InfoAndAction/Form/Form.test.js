import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect";

import { Form } from "./Form";

import { useBagContext } from "../../../../../contexts/BagContext";
import { useAuthenticationContext } from "../../../../../contexts/AuthenticationContext";

import { useLanguageContext } from "../../../../../contexts/LanguageContext";

jest.mock("../../../../../contexts/LanguageContext", () => ({
  useLanguageContext: jest.fn(),
}));

jest.mock("../../../../../contexts/BagContext", () => ({
  useBagContext: jest.fn(),
}));

jest.mock("../../../../../contexts/AuthenticationContext", () => ({
  useAuthenticationContext: jest.fn(),
}));

jest.mock("../../../../reusable/Sizes/Sizes", () => ({
  Sizes: ({ inventories, errorMessage, changeHandler, selectedSize }) => (
    <div>
      <select
        data-testid="size-select"
        onChange={changeHandler}
        value={selectedSize}
      >
        {inventories.map((inventory) => (
          <option key={inventory.size} value={inventory.size}>
            {inventory.size}
          </option>
        ))}
      </select>
      {errorMessage && <span data-testid="error-message">{errorMessage}</span>}
    </div>
  ),
}));

jest.mock("../../../../reusable/Button/Button", () => ({
  Button: ({ title, callBackFunction, variant }) => (
    <button data-testid="add-to-bag-button" onClick={callBackFunction}>
      {title}
    </button>
  ),
}));

jest.mock("../../../../common/Heart/Heart", () => ({
  Heart: () => <div data-testid="heart-icon">Heart</div>,
}));

describe("Form Component", () => {
  const mockLanguage = "English";
  const mockAdd = jest.fn();
  const mockToggleDisplayPopup = jest.fn();
  const mockUserId = "user-123";

  beforeEach(() => {
    useLanguageContext.mockReturnValue({ language: mockLanguage });
    jest.clearAllMocks();
    useBagContext.mockReturnValue({ add: mockAdd });
    useAuthenticationContext.mockReturnValue({ userId: mockUserId });
  });

  const mockJewelriesByCategory = [
    {
      _id: "jewelry-123",
      category: "necklaces",
      color: "gold",
      inventories: [{ size: "S" }, { size: "M" }, { size: "L" }],
    },
  ];

  test("renders the form with Sizes, Button, and Heart", () => {
    render(
      <Form
        jewelriesByCategory={mockJewelriesByCategory}
        toggleDisplayPopup={mockToggleDisplayPopup}
      />
    );

    expect(screen.getByTestId("size-select")).toBeInTheDocument();
    expect(screen.getByTestId("add-to-bag-button")).toBeInTheDocument();
    expect(screen.getByTestId("heart-icon")).toBeInTheDocument();
  });

  test("submits form and calls toggleDisplayPopup when size is selected", async () => {
    mockAdd.mockResolvedValueOnce({});

    render(
      <Form
        jewelriesByCategory={mockJewelriesByCategory}
        toggleDisplayPopup={mockToggleDisplayPopup}
      />
    );

    fireEvent.change(screen.getByTestId("size-select"), {
      target: { value: "M" },
    });

    fireEvent.click(screen.getByTestId("add-to-bag-button"));

    await waitFor(() => {
      expect(mockAdd).toHaveBeenCalledWith(
        { size: "M" },
        "jewelry-123",
        mockUserId
      );
      expect(mockToggleDisplayPopup).toHaveBeenCalled();
    });
  });

  test("resets selectedSize and errorMessage on color change", () => {
    const { rerender } = render(
      <Form
        jewelriesByCategory={mockJewelriesByCategory}
        toggleDisplayPopup={mockToggleDisplayPopup}
      />
    );

    fireEvent.change(screen.getByTestId("size-select"), {
      target: { value: "M" },
    });
    fireEvent.click(screen.getByTestId("add-to-bag-button"));

    expect(screen.queryByTestId("error-message")).toBeNull();

    const updatedJewelriesByCategory = [
      {
        ...mockJewelriesByCategory[0],
        color: "silver",
      },
    ];

    rerender(
      <Form
        jewelriesByCategory={updatedJewelriesByCategory}
        toggleDisplayPopup={mockToggleDisplayPopup}
      />
    );

    expect(screen.getByTestId("size-select").value).toBe("M");
    expect(screen.queryByTestId("error-message")).toBeNull();
  });

  test("displays error message when no size is selected on form submission", async () => {
    render(
      <Form
        jewelriesByCategory={mockJewelriesByCategory}
        toggleDisplayPopup={mockToggleDisplayPopup}
      />
    );

    fireEvent.click(screen.getByTestId("add-to-bag-button"));

    await waitFor(() => {
      expect(screen.getByTestId("error-message")).toHaveTextContent(
        "Please select the desired size"
      );
      expect(mockAdd).not.toHaveBeenCalled();
    });
  });
});
