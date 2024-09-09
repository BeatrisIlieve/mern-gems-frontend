import { MemoryRouter } from "react-router-dom";
import { render, fireEvent, waitFor, screen } from "@testing-library/react";

import { CardDetailsForm } from "./CardDetailsForm";

import { AuthenticationContext } from "../../../contexts/AuthenticationContext";
import { BagContext } from "../../../contexts/BagContext";

import { useService } from "../../../hooks/useService";

import { FORM_KEYS, INITIAL_FORM_VALUES } from "./constants/initialFormValues";

import { ERROR_MESSAGES } from "../../../mappers/errorMessages";

jest.mock("../../../hooks/useService");

const userId = "test-id";

describe("CardDetailsForm Component", () => {
  const mockToken = "testToken";
  const mockUserId = userId;
  const mockTotalPrice = 100;

  const mockUserCardDetailsService = {
    getOne: jest.fn(),
    update: jest.fn(),
  };

  beforeEach(() => {
    useService.mockReturnValue(mockUserCardDetailsService);

    mockUserCardDetailsService.getOne.mockClear();
    mockUserCardDetailsService.update.mockClear();
  });

  test("Submits the form with valid values; Expect update function to be called", async () => {
    const mockUserInformation = {
      token: mockToken,
      userId: mockUserId,
    };

    const mockBagInformation = {
      totalPrice: mockTotalPrice,
    };

    mockUserCardDetailsService.getOne.mockResolvedValue(mockUserInformation);

    render(
      <MemoryRouter>
        <BagContext.Provider value={mockBagInformation}>
          <AuthenticationContext.Provider value={mockUserInformation}>
            <CardDetailsForm />
          </AuthenticationContext.Provider>
        </BagContext.Provider>
      </MemoryRouter>
    );

    const inputs = {};

    Object.values(FORM_KEYS).forEach((value) => {
      inputs[value] = screen.getByTestId(`${value}-input`);
    });

    Object.entries(inputs).forEach(([inputKey, inputValue]) => {
      fireEvent.change(inputValue, {
        target: { value: INITIAL_FORM_VALUES[inputKey].validTestData },
      });
    });

    const submitButton = screen.getByTestId("button");
    fireEvent.click(submitButton);

    const submitData = {};

    Object.entries(INITIAL_FORM_VALUES).forEach(([key, value]) => {
      submitData[key] = value.validTestData;
    });

    await waitFor(() => {
      expect(mockUserCardDetailsService.update).toHaveBeenCalledWith(
        userId,
        submitData
      );
    });

    Object.keys(INITIAL_FORM_VALUES).forEach((key) => {
      const errorMessageContainer = screen.queryByTestId(`${key}-error`);
      expect(errorMessageContainer).not.toBeInTheDocument();
    });
  });

  test("Submits the form with invalid values; Expect update function not to be called; Expect errors", async () => {
    const mockUserInformation = {
      token: mockToken,
      userId: mockUserId,
    };

    const mockBagInformation = {
      totalPrice: mockTotalPrice,
    };

    mockUserCardDetailsService.getOne.mockResolvedValue(mockUserInformation);

    render(
      <MemoryRouter>
        <BagContext.Provider value={mockBagInformation}>
          <AuthenticationContext.Provider value={mockUserInformation}>
            <CardDetailsForm />
          </AuthenticationContext.Provider>
        </BagContext.Provider>
      </MemoryRouter>
    );
    const inputs = {};

    Object.values(FORM_KEYS).forEach((value) => {
      inputs[value] = screen.getByTestId(`${value}-input`);
    });

    Object.entries(inputs).forEach(([inputKey, inputValue]) => {
      fireEvent.change(inputValue, {
        target: { value: INITIAL_FORM_VALUES[inputKey].invalidTestData },
      });
    });

    const submitButton = screen.getByTestId("button");
    fireEvent.click(submitButton);

    const submitData = {};

    Object.entries(INITIAL_FORM_VALUES).forEach(([key, value]) => {
      submitData[key] = value.invalidTestData;
    });

    await waitFor(() => {
      expect(mockUserCardDetailsService.update).not.toHaveBeenCalled();
    });

    Object.keys(INITIAL_FORM_VALUES).forEach((key) => {
      const errorMessageContainer = screen.getByTestId(`${key}-error`);
      expect(errorMessageContainer).toHaveTextContent(ERROR_MESSAGES[key]);
    });
  });

  //   test("Submits the form with empty values; Expect update function not to be called; Expect errors", async () => {
  //     const mockUserInformation = {
  //       token: mockToken,
  //       userId: mockUserId,
  //     };

  //     mockUserCardDetailsService.getOne.mockResolvedValue(mockUserInformation);

  //     render(
  //       <MemoryRouter>
  //         <AuthenticationContext.Provider value={mockUserInformation}>
  //           <CardDetailsForm />
  //         </AuthenticationContext.Provider>
  //       </MemoryRouter>
  //     );

  //     const inputs = {};

  //     Object.values(FORM_KEYS).forEach((value) => {
  //       inputs[value] = screen.getByTestId(`${value}-input`);
  //     });

  //     Object.entries(inputs).forEach(([inputKey, inputValue]) => {
  //       fireEvent.change(inputValue, {
  //         target: { value: INITIAL_FORM_VALUES[inputKey].emptyTestData },
  //       });
  //     });

  //     const submitButton = screen.getByTestId("button");
  //     fireEvent.click(submitButton);

  //     const submitData = {};

  //     Object.entries(INITIAL_FORM_VALUES).forEach(([key, value]) => {
  //       submitData[key] = value.emptyTestData;
  //     });

  //     await waitFor(() => {
  //       expect(mockUserCardDetailsService.update).not.toHaveBeenCalled();
  //     });

  //     Object.keys(INITIAL_FORM_VALUES).forEach((key) => {
  //       const errorMessageContainer = screen.getByTestId(`${key}-error`);
  //       expect(errorMessageContainer).toHaveTextContent(ERROR_MESSAGES[key]);
  //     });
  //   });
});
