import { TextField, TextFieldProps } from "@mui/material"

export function RtlTextField(props: TextFieldProps) {
	return (
		<TextField
			{...props}
			dir='rtl'
			InputProps={{
				...props.InputProps,
				inputProps: {
					...(props.InputProps?.inputProps || {}),
					dir: "rtl",
				},
			}}
			InputLabelProps={{
				...props.InputLabelProps,
				shrink: true,
			}}
		/>
	)
}
