import { AppColors } from "./color";

export const theme = {
    light: {
        colors: {
            primary: AppColors.blue500,
            secondary: AppColors.yellow600,
            background: "#fff",
            text: AppColors.black900,
        },
        buttonStyles: {
            backgroundColor: AppColors.blue500,
            color: "#fff",
            padding: "15px 30px",
            borderRadius: "100px",
        },
        appBarStyles: {
            backgroundColor: "#fff",
            color: AppColors.black900,
        },
    },
    dark: {
        colors: {
            primary: AppColors.blue500,
            secondary: AppColors.yellow600,
            background: AppColors.black900,
            text: "#fff",
        },
        buttonStyles: {
            backgroundColor: AppColors.blue500,
            color: "#fff",
            padding: "15px 30px",
            borderRadius: "20px",
        },
        appBarStyles: {
            backgroundColor: AppColors.black800,
            color: "#fff",
        },
    },
};
