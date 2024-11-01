import { View, Text, TouchableOpacity, StyleSheet, TouchableOpacityProps } from 'react-native';
import React from 'react';

type ButtonVariant = 'primary' | 'secondary' | 'tertiary';

interface ButtonProps extends TouchableOpacityProps {
    variant?: ButtonVariant; // Optional variant prop
    title: string;           // Title of the button
}

const Button: React.FC<ButtonProps> = ({ variant = 'primary', title, ...props }) => {
    return (
        <TouchableOpacity style={[styles.button, styles[variant]]} {...props}>
            <Text style={[styles.buttonText, styles[`${variant}Text`]]}>{title}</Text>
        </TouchableOpacity>
    );
};

const styles = StyleSheet.create({
    button: {
        height: 48,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 16,
        paddingHorizontal: 16,
        marginBottom: 16, // Add margin for spacing
    },
    primary: {
        backgroundColor: '#007bff', // Primary color
    },
    secondary: {
        backgroundColor: '#6c757d', // Secondary color
    },
    tertiary: {
        backgroundColor: 'transparent', // Tertiary color (no background)
    },
    buttonText: {
        fontSize: 16,
        fontWeight: 'bold',
    },
    primaryText: {
        color: '#fff', // Text color for primary button
    },
    secondaryText: {
        color: '#fff', // Text color for secondary button
    },
    tertiaryText: {
        color: '#007bff', // Text color for tertiary button
    },
});

export default Button;
