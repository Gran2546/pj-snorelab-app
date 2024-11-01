import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import React, { useState } from 'react';

interface CheckBoxProps {
    label: string;            // Label for the checkbox
    checked?: boolean;       // Optional initial checked state
    onChange?: (checked: boolean) => void; // Callback when the checkbox is toggled
}

export default function CheckBox({ label, checked = false, onChange }: CheckBoxProps) {
    const [isChecked, setIsChecked] = useState(checked);

    const handlePress = () => {
        const newCheckedState = !isChecked;
        setIsChecked(newCheckedState);
        if (onChange) {
            onChange(newCheckedState); // Call the callback if provided
        }
    };

    return (
        <TouchableOpacity style={styles.container} onPress={handlePress}>
            <View style={[styles.checkbox, isChecked && styles.checked]}>
                {isChecked && <View style={styles.innerCheckbox} />}
            </View>
            <Text style={styles.label}>{label}</Text>
        </TouchableOpacity>
    );
}

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 16, // Add margin for spacing
    },
    checkbox: {
        height: 24,
        width: 24,
        borderRadius: 4,
        borderWidth: 2,
        borderColor: '#007bff', // Border color
        justifyContent: 'center',
        alignItems: 'center',
        marginRight: 8, // Space between checkbox and label
    },
    checked: {
        backgroundColor: '#007bff', // Background color when checked
    },
    innerCheckbox: {
        height: 12,
        width: 12,
        borderRadius: 2,
        backgroundColor: '#007bff', // Inner box color
    },
    label: {
        fontSize: 16,
        color: '#333',
    },
});
