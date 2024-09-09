// InfoAndAction.test.js

import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import '@testing-library/jest-dom/extend-expect';
import { InfoAndAction } from './InfoAndAction';
import { useNavigate } from 'react-router-dom';

// Mock child components
jest.mock('../../../common/MiniImages/MiniImages', () => ({
  MiniImages: ({ jewelriesByCategory, clickHandler }) => (
    <div>
      <button onClick={() => clickHandler('colorTitle')}>MiniImages</button>
    </div>
  )
}));

jest.mock('../../../common/StockStatus/StockStatus', () => ({
  StockStatus: ({ jewelriesByCategory }) => <div>StockStatus</div>
}));

jest.mock('../../../reusable/DualTitleSection/DualTitleSection', () => ({
  DualTitleSection: ({ firstTitle, secondTitle, variant }) => (
    <div>
      <div>{firstTitle}</div>
      <div>{secondTitle}</div>
      <div>Variant: {variant}</div>
    </div>
  )
}));

jest.mock('../../../reusable/LargeTitle/LargeTitle', () => ({
  LargeTitle: ({ title, textAlign }) => (
    <h1 style={{ textAlign }}>{title}</h1>
  )
}));

jest.mock('../../../reusable/Paragraph/Paragraph', () => ({
  Paragraph: ({ text, textAlign, color }) => (
    <p style={{ textAlign, color }}>{text}</p>
  )
}));

jest.mock('./Form/Form', () => ({
  Form: ({ jewelriesByCategory, toggleDisplayPopup }) => (
    <div>
      <button onClick={toggleDisplayPopup}>Toggle Popup</button>
    </div>
  )
}));

// Mock useNavigate
jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useNavigate: jest.fn()
}));

describe('InfoAndAction Component', () => {
  const mockJewelries = [
    {
      categories: [{ title: 'categoryTitle' }],
      title: 'Jewelry Title',
      description: 'Jewelry Description'
    }
  ];

  test('renders with correct child components and props', () => {
    render(
      <MemoryRouter>
        <InfoAndAction jewelriesByCategory={mockJewelries} toggleDisplayPopup={() => {}} />
      </MemoryRouter>
    );

    // Check if the components are rendered
    expect(screen.getByText('MiniImages')).toBeInTheDocument();
    expect(screen.getByText('StockStatus')).toBeInTheDocument();
    expect(screen.getByText('Jewelry Title')).toBeInTheDocument();
    expect(screen.getByText('Jewelry Description.')).toBeInTheDocument();
  });

  test('navigates to the correct URL when MiniImages is clicked', () => {
    const navigate = jest.fn();
    useNavigate.mockReturnValue(navigate);

    render(
      <MemoryRouter>
        <InfoAndAction jewelriesByCategory={mockJewelries} toggleDisplayPopup={() => {}} />
      </MemoryRouter>
    );

    // Simulate click
    fireEvent.click(screen.getByText('MiniImages'));

    // Check if navigate was called with the correct URL
    expect(navigate).toHaveBeenCalledWith('/collection/categorytitle/colortitle');
  });

  test('calls toggleDisplayPopup when Form button is clicked', () => {
    const toggleDisplayPopup = jest.fn();

    render(
      <MemoryRouter>
        <InfoAndAction jewelriesByCategory={mockJewelries} toggleDisplayPopup={toggleDisplayPopup} />
      </MemoryRouter>
    );

    // Simulate click
    fireEvent.click(screen.getByText('Toggle Popup'));

    // Check if toggleDisplayPopup was called
    expect(toggleDisplayPopup).toHaveBeenCalled();
  });
});
