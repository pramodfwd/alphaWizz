import { View, TextInputProps } from "react-native";

interface ContainerProps extends TextInputProps {
  style?: object;
}

export const CustomBox: React.FC<ContainerProps> = ({ style, ...props }) => {
  return (
    <View
      style={[
        {
          width: "100%",
          backgroundColor: "white",
          justifyContent: "center",
          alignItems: "center",
        },
        style,
      ]}
      placeholder={props.placeholder || "Enter text"} // Example placeholder
      {...props}
    />
  );
};
