import { StyleSheet, Text, TextInput, TextInputProps, View } from 'react-native';
import React from 'react';

interface InputProps extends TextInputProps {
    label?: string;  // Optional label prop
}

export default function Input({ label, ...props }: InputProps) {
    return (
        <View style={styles.container}>
            {label && <Text style={styles.label}>{label}</Text>}
            <TextInput
                {...props}
                style={[styles.input, props.style]}
            />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        width: '100%',
        marginBottom: 16,  // Add some margin for spacing
    },
    label: {
        marginBottom: 8,  // Space between label and input
        fontSize: 16,
        color: '#333',
    },
    input: {
        height: 48,
        width: '100%',
        borderRadius: 16,
        borderWidth: 1,
        borderColor: '#555',
        paddingHorizontal: 12,
    },
});
