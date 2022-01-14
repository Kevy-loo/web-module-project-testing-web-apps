import React from 'react';
import '@testing-library/jest-dom/extend-expect';
import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import ContactForm from './ContactForm';

test('renders without errors', () => {
    render(<ContactForm />);
});

test('renders the contact form header', () => {
    render(<ContactForm />);

    const header = screen.queryByText(/contact form/i);
    expect(header).toBeTruthy();
    expect(header).toBeInTheDocument();
    expect(header).toHaveTextContent(/contact form/i);
});

test('renders ONE error message if user enters less then 5 characters into firstname.', async () => {
    render(<ContactForm />);

    const firstName = screen.getByLabelText(/First Name*/i);
    userEvent.type(firstName, "edd");
    const error = await screen.findAllByTestId('error');
    expect(error).toHaveLength(1);
});

test('renders THREE error messages if user enters no values into any fields.', async () => {
    render(<ContactForm />);

    const button = screen.getByRole("button");
    userEvent.click(button);

    const error = await screen.findAllByTestId("error");
    expect(error).toHaveLength(3);

});

test('renders ONE error message if user enters a valid first name and last name but no email.', async () => {
    render(<ContactForm />);

    const firstName = screen.getByLabelText(/first name*/i);
    userEvent.type(firstName, "kevin");

    const lastName = screen.getByLabelText(/last name*/i);
    userEvent.type(lastName, "liu");

    const button = screen.getByRole("button");
    userEvent.click(button);

    const error = await screen.findAllByTestId("error");
    expect(error).toHaveLength(1);
});

test('renders "email must be a valid email address" if an invalid email is entered', async () => {
    render(<ContactForm />);
    const email = screen.getByLabelText(/email*/i);
    userEvent.type(email, "kevin@");

    const error = await screen.findByText(/email must be a valid email address/i);
    expect(error).toBeInTheDocument();
});

test('renders "lastName is a required field" if an last name is not entered and the submit button is clicked', async () => {
    render(<ContactForm />);
    const button = screen.getByRole("button");
    userEvent.click(button);

    const error = await screen.findByText(/lastName is a required field/i);
    expect(error).toBeInTheDocument();
});

test('renders all firstName, lastName and email text when submitted. Does NOT render message if message is not submitted.', async () => {
    render(<ContactForm />);

    const firstName = screen.getByLabelText(/first name*/i);
    const lastName = screen.getByLabelText(/last name*/i);
    const email = screen.getByLabelText(/email*/i);

    userEvent.type(firstName, "kevin");
    userEvent.type(lastName, "liu");
    userEvent.type(email, "kevin@gmail.com");

    const button = screen.getByRole("button");
    userEvent.click(button);


    const firstnameDisplay = screen.queryByText("kevin");
    const lastnameDisplay = screen.queryByText("liu");
    const emailDisplay = screen.queryByText("kevin@gmail.com");
    const messageDisplay = screen.queryByTestId("messageDisplay");
    
    expect(firstnameDisplay).toBeInTheDocument();
    expect(lastnameDisplay).toBeInTheDocument();
    expect(emailDisplay).toBeInTheDocument();
    expect(messageDisplay).not.toBeInTheDocument();


});

test('renders all fields text when all fields are submitted.', async () => {
    render(<ContactForm />);

    const firstName = screen.getByLabelText(/First Name*/i);
    const lastName = screen.getByLabelText(/Last Name*/i);
    const email = screen.getByLabelText(/Email*/i);
    const message = screen.getByLabelText(/Message/i);

    userEvent.type(firstName, "kevin");
    userEvent.type(lastName, "liu");
    userEvent.type(email, "kevin@gmail.com");
    userEvent.type(message, "hello");

    const button = screen.getByRole("button");
    userEvent.click(button);
    waitFor(async () => {

        const firstnameDisplay = screen.queryByText(/kevin/i);
        const lastnameDisplay = screen.queryByText(/liu/i);
        const emailDisplay = screen.queryByText(/kevin@gmail.com/i);
        const messageDisplay = screen.queryByText(/hello/i);
    
        expect(firstnameDisplay).toBeInTheDocument();
        expect(lastnameDisplay).toBeInTheDocument();
        expect(emailDisplay).toBeInTheDocument();
        expect(messageDisplay).toBeInTheDocument();
        
    });
}); 